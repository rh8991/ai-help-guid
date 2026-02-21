import React from 'react'
import './ToolCard.css'

export default function ToolCard({ tool }) {
  const handleClick = (e) => {
    e.preventDefault()
    window.open(tool.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      className="tool-card"
      onClick={handleClick}
      role="link"
      aria-label={`${tool.name} - ${tool.hebrew}`}
    >
      <div className="tool-card-icon">{tool.icon || '🔧'}</div>
      <h3 className="tool-card-name">{tool.name}</h3>
      <p className="tool-card-description">{tool.hebrew}</p>
      <div className="tool-card-footer">
        <span className="tool-link-indicator">פתח ↗️</span>
      </div>
    </button>
  )
}
