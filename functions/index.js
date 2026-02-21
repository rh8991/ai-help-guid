const functions = require('firebase-functions');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

const PIN = defineSecret('MANAGER_PIN');

const getPinCode = () => {
  return PIN.value();
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return req.ip || 'unknown';
};

const parseBody = (req) => {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}');
    } catch (error) {
      return {};
    }
  }

  return req.body || {};
};

const checkRateLimit = async (req) => {
  const ip = getClientIp(req);
  const ref = db.collection('pinAttempts').doc(ip);
  const snapshot = await ref.get();
  const now = Date.now();
  const limitWindowMs = 15 * 60 * 1000;
  const maxAttempts = 5;

  if (snapshot.exists) {
    const data = snapshot.data();
    if (data.lockedUntil && data.lockedUntil > now) {
      return { allowed: false, lockedUntil: data.lockedUntil };
    }
  }

  return { allowed: true, ref, snapshot, now, limitWindowMs, maxAttempts };
};

const registerFailure = async ({ ref, snapshot, now, limitWindowMs, maxAttempts }) => {
  const data = snapshot && snapshot.exists ? snapshot.data() : { count: 0, firstAttemptAt: now };
  const withinWindow = data.firstAttemptAt && now - data.firstAttemptAt < limitWindowMs;
  const count = withinWindow ? (data.count || 0) + 1 : 1;
  const firstAttemptAt = withinWindow ? data.firstAttemptAt : now;
  const lockedUntil = count >= maxAttempts ? now + limitWindowMs : null;

  await ref.set({
    count,
    firstAttemptAt,
    lockedUntil
  }, { merge: true });

  return lockedUntil;
};

const clearFailures = async (ref) => {
  await ref.set({
    count: 0,
    firstAttemptAt: null,
    lockedUntil: null
  }, { merge: true });
};

exports.validatePin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const pinCode = getPinCode();
    if (!pinCode) {
      res.status(500).json({ error: 'PIN not configured' });
      return;
    }

    const limit = await checkRateLimit(req);
    if (!limit.allowed) {
      res.status(429).json({ error: 'Too many attempts', lockedUntil: limit.lockedUntil });
      return;
    }

    const body = parseBody(req);
    const isValid = body.pin === pinCode;

    if (!isValid) {
      const lockedUntil = await registerFailure(limit);
      res.status(200).json({ valid: false, lockedUntil });
      return;
    }

    if (limit.ref) {
      await clearFailures(limit.ref);
    }

    res.status(200).json({ valid: true });
  });
});

exports.getTools = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const snapshot = await db.collection('manager').doc('tools').get();
      const tools = snapshot.exists ? snapshot.data().tools : null;
      res.status(200).json({ tools });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load tools' });
    }
  });
});

exports.saveTools = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const pinCode = getPinCode();
    if (!pinCode) {
      res.status(500).json({ error: 'PIN not configured' });
      return;
    }

    const body = parseBody(req);
    if (body.pin !== pinCode) {
      res.status(403).json({ error: 'Invalid PIN' });
      return;
    }

    if (!body.tools || typeof body.tools !== 'object') {
      res.status(400).json({ error: 'Invalid tools payload' });
      return;
    }

    try {
      await db.collection('manager').doc('tools').set({
        tools: body.tools,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save tools' });
    }
  });
});

exports.resetTools = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const pinCode = getPinCode();
    if (!pinCode) {
      res.status(500).json({ error: 'PIN not configured' });
      return;
    }

    const body = parseBody(req);
    if (body.pin !== pinCode) {
      res.status(403).json({ error: 'Invalid PIN' });
      return;
    }

    try {
      await db.collection('manager').doc('tools').delete();
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reset tools' });
    }
  });
});
