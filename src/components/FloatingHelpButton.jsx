import React, { useState } from 'react'
import './FloatingHelpButton.css'

export default function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHelp = () => {
    setIsOpen(!isOpen)
  }

  const closeHelp = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        className={`floating-help-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleHelp}
        aria-label="עזרה"
        aria-expanded={isOpen}
        title="לחץ להוראות"
      >
        {isOpen ? '✕' : '?'}
      </button>

      {isOpen && (
        <div className="help-modal" onClick={closeHelp}>
          <div 
            className="help-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="help-title"
            aria-modal="true"
          >
            <button
              className="help-close"
              onClick={closeHelp}
              aria-label="סגור"
            >
              ✕
            </button>

            <h2 id="help-title" className="help-title">🎯 איך להשתמש</h2>

            <div className="help-section">
              <h3>📑 דפי הנושאים</h3>
              <p>בחר נושא מהכרטיסיות בחלק העליון כדי לראות כלים בנושא זה</p>
            </div>

            <div className="help-section">
              <h3>🔍 חיפוש כלים</h3>
              <p>השתמש בשורת החיפוש כדי למצוא כלי מסוים בשמו או בתיאורו</p>
            </div>

            <div className="help-section">
              <h3>🌐 אם לא מצאת</h3>
              <p>אם הכלי לא נמצא בדשבורד, בחר לחפש בגוגל ממישרין</p>
            </div>

            <div className="help-section">
              <h3>🔗 פתיחת כלים</h3>
              <p>כל כלי יפתח בכרטיסייה חדשה - אין צורך לחזור לדשבורד</p>
            </div>

            <div className="help-section">
              <h3>👤 התחברות גוגל</h3>
              <p>רוב הכלים דורשים התחברות לחשבון גוגל - בדוק את ההוראות שליד כל כלי</p>
            </div>

            <div className="help-footer">
              <p className="help-tip">💡 <strong>טיפ:</strong> הוסף את הדשבורד לסימניות שלך (Ctrl+D) כדי גישה מהירה!</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
