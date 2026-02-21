import React, { useEffect, useMemo, useState } from 'react'
import './ManagerPanel.css'

const buildId = () => `subject-${Date.now()}`

const cloneData = (data) => JSON.parse(JSON.stringify(data))

export default function ManagerPanel({ data, onSave, onReset, validatePin }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [activePin, setActivePin] = useState('')
  const [pinError, setPinError] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [draftData, setDraftData] = useState(() => cloneData(data))
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)

  const subjects = useMemo(() => Object.keys(draftData), [draftData])

  useEffect(() => {
    if (isOpen) {
      setDraftData(cloneData(data))
      setSelectedSubjectId(Object.keys(data)[0] || null)
      setPinInput('')
      setActivePin('')
      setPinError('')
      setIsUnlocked(false)
    }
  }, [isOpen, data])

  const handleUnlock = async () => {
    if (!pinInput.trim()) {
      setPinError('יש להזין קוד.')
      return
    }

    setIsValidating(true)
    setPinError('')

    try {
      const isValid = await validatePin(pinInput.trim())
      if (isValid) {
        setIsUnlocked(true)
        setPinError('')
        setActivePin(pinInput.trim())
        setPinInput('')
      } else {
        setPinError('קוד שגוי. נסה שוב.')
      }
    } catch (error) {
      setPinError('שגיאת חיבור לשרת. נסה שוב מאוחר יותר.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleAddSubject = () => {
    const id = buildId()
    setDraftData(prev => ({
      ...prev,
      [id]: {
        icon: '🧩',
        title: 'נושא חדש',
        description: 'תיאור קצר',
        tools: []
      }
    }))
    setSelectedSubjectId(id)
  }

  const handleDeleteSubject = (id) => {
    if (!window.confirm('למחוק את הנושא הזה?')) {
      return
    }

    setDraftData(prev => {
      const next = { ...prev }
      delete next[id]

      if (selectedSubjectId === id) {
        const remaining = Object.keys(next)
        setSelectedSubjectId(remaining[0] || null)
      }

      return next
    })
  }

  const handleSubjectFieldChange = (field, value) => {
    if (!selectedSubjectId) return
    setDraftData(prev => ({
      ...prev,
      [selectedSubjectId]: {
        ...prev[selectedSubjectId],
        [field]: value
      }
    }))
  }

  const handleAddTool = () => {
    if (!selectedSubjectId) return
    setDraftData(prev => ({
      ...prev,
      [selectedSubjectId]: {
        ...prev[selectedSubjectId],
        tools: [
          ...prev[selectedSubjectId].tools,
          { name: '', hebrew: '', url: '', icon: '✨' }
        ]
      }
    }))
  }

  const handleToolChange = (index, field, value) => {
    if (!selectedSubjectId) return
    setDraftData(prev => {
      const nextTools = [...prev[selectedSubjectId].tools]
      nextTools[index] = { ...nextTools[index], [field]: value }
      return {
        ...prev,
        [selectedSubjectId]: {
          ...prev[selectedSubjectId],
          tools: nextTools
        }
      }
    })
  }

  const handleDeleteTool = (index) => {
    if (!selectedSubjectId) return
    setDraftData(prev => {
      const nextTools = prev[selectedSubjectId].tools.filter((_, i) => i !== index)
      return {
        ...prev,
        [selectedSubjectId]: {
          ...prev[selectedSubjectId],
          tools: nextTools
        }
      }
    })
  }

  const handleSave = async () => {
    if (!activePin) {
      setPinError('יש להזין קוד מחדש כדי לשמור.')
      setIsUnlocked(false)
      return
    }

    setIsSaving(true)
    try {
      await onSave(cloneData(draftData), activePin)
      setIsOpen(false)
    } catch (error) {
      setPinError('שמירה נכשלה. נסה שוב.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('לאפס לשינויים המקוריים?')) {
      return
    }

    if (!activePin) {
      setPinError('יש להזין קוד מחדש כדי לאפס.')
      setIsUnlocked(false)
      return
    }

    setIsSaving(true)
    try {
      await onReset(activePin)
      setIsOpen(false)
    } catch (error) {
      setPinError('האיפוס נכשל. נסה שוב.')
    } finally {
      setIsSaving(false)
    }
  }

  const selectedSubject = selectedSubjectId ? draftData[selectedSubjectId] : null

  return (
    <div className="manager-panel">
      <button className="manager-toggle" onClick={() => setIsOpen(true)}>
        פאנל מנהל
      </button>

      {isOpen && (
        <div className="manager-modal">
          <div className="manager-backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="manager-card" role="dialog" aria-modal="true">
            <div className="manager-header">
              <h2>ניהול נושאים וכלים</h2>
              <button className="manager-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {!isUnlocked ? (
              <div className="manager-lock">
                <p>הזן קוד מורה כדי לפתוח את הפאנל</p>
                <div className="manager-lock-row">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(event) => setPinInput(event.target.value)}
                    placeholder="קוד מורה"
                    disabled={isValidating}
                  />
                  <button onClick={handleUnlock} disabled={isValidating}>
                    {isValidating ? 'בודק...' : 'כניסה'}
                  </button>
                </div>
                {pinError && <span className="manager-error">{pinError}</span>}
              </div>
            ) : (
              <div className="manager-body">
                <div className="manager-columns">
                  <div className="manager-section">
                    <div className="manager-section-header">
                      <h3>נושאים</h3>
                      <button onClick={handleAddSubject}>הוסף נושא</button>
                    </div>
                    <div className="manager-list">
                      {subjects.map(subjectId => (
                        <div
                          key={subjectId}
                          className={`manager-item ${subjectId === selectedSubjectId ? 'active' : ''}`}
                          onClick={() => setSelectedSubjectId(subjectId)}
                        >
                          <span>{draftData[subjectId]?.icon}</span>
                          <span>{draftData[subjectId]?.title}</span>
                          <button
                            className="manager-delete"
                            onClick={(event) => {
                              event.stopPropagation()
                              handleDeleteSubject(subjectId)
                            }}
                          >
                            מחק
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="manager-section">
                    <h3>פרטי נושא</h3>
                    {selectedSubject ? (
                      <div className="manager-form">
                        <label>
                          אייקון
                          <input
                            value={selectedSubject.icon}
                            onChange={(event) => handleSubjectFieldChange('icon', event.target.value)}
                          />
                        </label>
                        <label>
                          כותרת
                          <input
                            value={selectedSubject.title}
                            onChange={(event) => handleSubjectFieldChange('title', event.target.value)}
                          />
                        </label>
                        <label>
                          תיאור
                          <input
                            value={selectedSubject.description}
                            onChange={(event) => handleSubjectFieldChange('description', event.target.value)}
                          />
                        </label>
                      </div>
                    ) : (
                      <p className="manager-empty">בחר נושא כדי לערוך אותו</p>
                    )}
                  </div>
                </div>

                <div className="manager-section">
                  <div className="manager-section-header">
                    <h3>כלים</h3>
                    <button onClick={handleAddTool}>הוסף כלי</button>
                  </div>
                  {selectedSubject ? (
                    <div className="manager-tools">
                      {selectedSubject.tools.map((tool, index) => (
                        <div key={`${tool.name}-${index}`} className="manager-tool-card">
                          <div className="manager-tool-grid">
                            <label>
                              שם
                              <input
                                value={tool.name}
                                onChange={(event) => handleToolChange(index, 'name', event.target.value)}
                              />
                            </label>
                            <label>
                              תיאור בעברית
                              <input
                                value={tool.hebrew}
                                onChange={(event) => handleToolChange(index, 'hebrew', event.target.value)}
                              />
                            </label>
                            <label>
                              כתובת URL
                              <input
                                value={tool.url}
                                onChange={(event) => handleToolChange(index, 'url', event.target.value)}
                              />
                            </label>
                            <label>
                              אייקון
                              <input
                                value={tool.icon}
                                onChange={(event) => handleToolChange(index, 'icon', event.target.value)}
                              />
                            </label>
                          </div>
                          <button className="manager-delete" onClick={() => handleDeleteTool(index)}>
                            מחק כלי
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="manager-empty">בחר נושא כדי להוסיף כלים</p>
                  )}
                </div>

                <div className="manager-actions">
                  <button className="manager-save" onClick={handleSave} disabled={isSaving}>
                    שמור שינויים
                  </button>
                  <button className="manager-reset" onClick={handleReset} disabled={isSaving}>
                    איפוס לברירת מחדל
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
