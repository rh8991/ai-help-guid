import React, { useState, useCallback } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSearch, onGoogleSearch, value, isEmpty }) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = useCallback((e) => {
    onSearch(e.target.value)
  }, [onSearch])

  const handleGoogleClick = useCallback(() => {
    if (value.trim()) {
      onGoogleSearch(value)
    }
  }, [value, onGoogleSearch])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && isEmpty && value.trim()) {
      handleGoogleClick()
    }
  }, [isEmpty, value, handleGoogleClick])

  return (
    <div className={`search-container ${isFocused ? 'focused' : ''}`}>
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="חפש כלי..."
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          aria-label="חפש כלים"
        />
        {value && (
          <button
            className="search-clear"
            onClick={() => onSearch('')}
            aria-label="נקה חיפוש"
            title="נקה חיפוש"
          >
            ✕
          </button>
        )}
      </div>

      {isEmpty && value && (
        <div className="search-no-results">
          <p>לא מצאנו את "{value}"</p>
          <button
            className="google-search-btn"
            onClick={handleGoogleClick}
          >
            🔗 חפש ב-Google
          </button>
        </div>
      )}
    </div>
  )
}
