import React from 'react'
import ToolCard from './ToolCard'
import './ToolsGrid.css'

export default function ToolsGrid({ tools, isSearching, searchQuery, onGoogleSearch }) {
  if (tools.length === 0) {
    return (
      <div className="tools-grid-empty">
        <div className="empty-state">
          <p className="empty-icon">🔍</p>
          <p className="empty-text">
            {isSearching 
              ? `לא מצאנו כלים עבור "${searchQuery}"`
              : 'בחר קטגוריה כדי להתחיל'}
          </p>
          {isSearching && (
            <button 
              className="empty-google-btn"
              onClick={() => onGoogleSearch(searchQuery)}
            >
              חפש "{searchQuery}" ב-Google
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="tools-grid">
      {tools.map((tool, index) => (
        <ToolCard
          key={`${tool.name}-${index}`}
          tool={tool}
        />
      ))}
    </div>
  )
}
