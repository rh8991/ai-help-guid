// tools.js - All tools organized by subject/category with Hebrew descriptions

export const toolsData = {
  chatbots: {
    icon: '💬',
    title: 'צ\'אטבוטים',
    description: 'שיחה עם בינה מלאכותית',
    tools: [
      {
        name: 'ChatGPT',
        hebrew: 'צ\'אטבוט חכם שיכול לענות על שאלות, לכתוב טקסטים ולעזור בפתרון בעיות',
        url: 'https://chat.openai.com/',
        icon: '🤖'
      },
      {
        name: 'Claude',
        hebrew: 'בוט דיוני שמתמחה בחשיבה עמוקה ותשובות מפורטות ובטוחות',
        url: 'https://claude.ai/',
        icon: '🧠'
      },
      {
        name: 'Google Gemini',
        hebrew: 'בוט של Google המיומן בתמונות, קוד וניתוח מורכב',
        url: 'https://gemini.google.com/app',
        icon: '🌟'
      },
      {
        name: 'Grok',
        hebrew: 'בוט עם יכולות חיפוש בזמן אמת וממש מבין הומור',
        url: 'https://grok.com/',
        icon: '⚡'
      }
    ]
  },

  translation: {
    icon: '🌍',
    title: 'תרגום',
    description: 'תרגם דברים לשפות שונות',
    tools: [
      {
        name: 'Google Translate',
        hebrew: 'כלי תרגום מהיר החוזק עם 130+ שפות ויכול לתרגם גם תמונות',
        url: 'https://translate.google.com/?hl=iw&sl=iw&tl=en&op=translate',
        icon: '🔤'
      }
    ]
  },

  games: {
    icon: '🎮',
    title: 'משחקים של AI',
    description: 'למד AI בעזרת משחקים재미있게',
    tools: [
      {
        name: 'Quick Draw',
        hebrew: 'אתה מציירת ו-AI של Google מנסה לנחש מה ציירת - מעולה לללא להבין איך AI רואה תמונות',
        url: 'https://quickdraw.withgoogle.com/',
        icon: '🎨'
      },
      {
        name: 'Real or Fakes',
        hebrew: 'בחר אם תמונה היא אמיתית או נוצרה בתמונות ממוחשבות - מירוץ נגד מחשבים',
        url: 'https://www.realorfakes.com/',
        icon: '📸'
      },
      {
        name: 'Human or Not',
        hebrew: 'חברו קצר עם מישהו - בסוף תבחרו אם זה בן אדם או בוט משחק מהנה!',
        url: 'https://humanornot.so/',
        icon: '👤'
      },
      {
        name: 'RPS AI',
        hebrew: 'משחק אבן נייר ומספריים קלסי נגד AI - למד צפייה בדפוסים',
        url: 'https://southscribblecompany.itch.io/rps-ai',
        icon: '✋'
      },
      {
        name: 'Flappy Bird',
        hebrew: 'משחק קלסי שמשמש להתרגל ללמידת מכונה וחינוך רחוק',
        url: 'https://flappybird.io/',
        icon: '🐦'
      },
      {
        name: 'AI vs Google',
        hebrew: 'תחרות בין בני אדם (אתה) ל-AI בשאלות - מי יזכה?',
        url: 'https://snirsnir.github.io/aiVSgoogle/',
        icon: '🏆'
      }
    ]
  },

  image: {
    icon: '🎨',
    title: 'תמונות וסרטונים',
    description: 'צור תמונות יפות בעזרת AI',
    tools: [
      {
        name: 'Leonardo AI',
        hebrew: 'כלי יצירת תמונות חזקה המאפשרת ליצור תמונות יפות מתיאור בטקסט',
        url: 'https://app.leonardo.ai',
        icon: '🖼️'
      },
      {
        name: 'FocalML',
        hebrew: 'כלי יעיל וחכם ליצירת תמונות איכותיות עם קרדיטים חינמיים',
        url: 'https://focalml.com/',
        icon: '📷'
      },
      {
        name: 'Kling AI',
        hebrew: 'כלי יצירת סרטונים מת קדם שמייצר סרטונים קצרים מתמונות או טקסט',
        url: 'https://app.klingai.com/global/',
        icon: '🎬'
      }
    ]
  },

  models3d: {
    icon: '🎭',
    title: 'דגמים 3D',
    description: 'צור ובחקור דגמים תלת-מימדיים',
    tools: [
      {
        name: 'Sketchfab',
        hebrew: 'ספריה עצומה של דגמים 3D בחינם שיכול להוריד, צפות וא"פ להשתמש בפרויקטים',
        url: 'https://sketchfab.com/features/free-3d-models',
        icon: '🏺'
      },
      {
        name: 'Tripo3D',
        hebrew: 'כלי שהופך תמונה רגילה לדגם 3D צפוי - טכנולוגיה מדהימה!',
        url: 'https://studio.tripo3d.ai/',
        icon: '📦'
      }
    ]
  },

  music: {
    icon: '🎵',
    title: 'מוזיקה',
    description: 'צור שירים וקול',
    tools: [
      {
        name: 'Suno AI',
        hebrew: 'כלי יצירת שירים עם AI - תאר את השיר וזה יצור להיות מלחין!',
        url: 'https://suno.com/home',
        icon: '🎤'
      }
    ]
  },

  gameCreation: {
    icon: '🕹️',
    title: 'יצור משחקים',
    description: 'בנה משחקים שלך',
    tools: [
      {
        name: 'Jabali Studio',
        hebrew: 'כלי יצירת משחקים שמשתמש ב-AI לעזור בתכניתו וברעיון של משחק',
        url: 'https://www.jabali.ai/jabalistudio/',
        icon: '🎮'
      },
      {
        name: 'Rosebud AI',
        hebrew: 'פלטפורם קלה ליצירת משחקים דו-מימדיים בדפדפן ללא צורך בקוד',
        url: 'https://rosebud.ai/',
        icon: '🌹'
      }
    ]
  },

  learning: {
    icon: '📖',
    title: 'למידה',
    description: 'כלים ללמידה עמוקה',
    tools: [
      {
        name: 'NotebookLM',
        hebrew: 'כלי מחקר חדשני המסכם מסמכים וזויק טיוב אודיו מהם',
        url: 'https://notebooklm.google/',
        icon: '📝'
      },
      {
        name: 'Teachable Machine',
        hebrew: 'כלי לתכנות AI בלי קוד - לימד מודל שלך בעזרת תמונות או טקסט',
        url: 'https://teachablemachine.withgoogle.com/',
        icon: '🤖'
      }
    ]
  },

  webdev: {
    icon: '💻',
    title: 'פיתוח אתרים',
    description: 'כתוב קוד מיד',
    tools: [
      {
        name: 'JSFiddle',
        hebrew: 'סביבה דיאינטראקטיבית לנסות HTML CSS JavaScript and בזמן אמת ישירות בדפדפן',
        url: 'https://jsfiddle.net/',
        icon: '🧑‍💻'
      }
    ]
  },

  presentation: {
    icon: '📊',
    title: 'מצגות',
    description: 'בנה מצגות יפות',
    tools: [
      {
        name: 'Gamma',
        hebrew: 'כלי יצירת מצגות בעיצוב יפה שמשתמש בAI לעיצוב אוטומטי',
        url: 'https://gamma.app/he',
        icon: '✨'
      }
    ]
  },

  content: {
    icon: '📱',
    title: 'קונטנט וונידיאו',
    description: 'ערוך סרטונים וקונטנט',
    tools: [
      {
        name: 'Kapwing',
        hebrew: 'כלי אונליין לעריכת וידיאו וקונטנט חברתי עם עיצובים מוכנים',
        url: 'https://www.kapwing.com/',
        icon: '🎥'
      }
    ]
  },

  robotics: {
    icon: '🤖',
    title: 'רובוטיקה',
    description: 'תכנת רובוטים ומחשבים קטנים',
    tools: [
      {
        name: 'Make Code Micro:bit',
        hebrew: 'תכנות ויזואלי למחשב קטן micro:bit - היכל לעשות דברים מדהימים!',
        url: 'https://makecode.microbit.org/',
        icon: '🔌'
      },
      {
        name: 'LEGO Spike',
        hebrew: 'סביבת תכניתו לרובוטים LEGO עם בלוקים חזקים ופנים ותחושות',
        url: 'https://spike.legoeducation.com/',
        icon: '🧱'
      }
    ]
  },

  hosting: {
    icon: '🌐',
    title: 'אחסון אתרים',
    description: 'פרסם את האתר שלך',
    tools: [
      {
        name: 'PageDrop',
        hebrew: 'כלי פשוט להעלאת ופרסום אתרים ודפים קטנות בחינם על הודעה',
        url: 'https://pagedrop.io/',
        icon: '📤'
      },
      {
        name: 'EdgeOne Pages',
        hebrew: 'פלטפורם תמיכה בחינם להעלאת אתרים סטטיים עם קובץ מתבג גבוה',
        url: 'https://pages.edgeone.ai/drop',
        icon: '🚀'
      }
    ]
  }
};

// Helper function to search all tools
export const searchTools = (query, data = toolsData) => {
  const searchLower = query.toLowerCase();
  const results = [];

  Object.values(data).forEach(subject => {
    subject.tools?.forEach(tool => {
      if (
        tool.name.toLowerCase().includes(searchLower) ||
        tool.hebrew.toLowerCase().includes(searchLower)
      ) {
        results.push({
          ...tool,
          subject: subject.title
        });
      }
    });
  });

  return results;
};

// Get all subjects
export const getSubjects = (data = toolsData) => {
  return Object.keys(data).map(key => ({
    id: key,
    ...data[key]
  }));
};
