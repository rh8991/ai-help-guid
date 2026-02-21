import React, { useState, useMemo, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ToolsGrid from './components/ToolsGrid'
import FloatingHelpButton from './components/FloatingHelpButton'
import Footer from './components/Footer'
import ManagerPanel from './components/ManagerPanel'
import { toolsData, getSubjects, searchTools } from './data/tools'

export default function App() {
  const apiBase = import.meta.env.VITE_MANAGER_API_BASE
  const [toolsState, setToolsState] = useState(() => {
    if (typeof window === 'undefined') {
      return toolsData
    }

    const saved = window.localStorage.getItem('technoda_tools_data')
    return saved ? JSON.parse(saved) : toolsData
  })
  const [activeTab, setActiveTab] = useState('chatbots')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const subjects = useMemo(() => getSubjects(toolsState), [toolsState])

  const getApiUrl = (path) => {
    if (!apiBase) {
      return null
    }

    return `${apiBase.replace(/\/$/, '')}/${path}`
  }

  useEffect(() => {
    const url = getApiUrl('getTools')
    if (!url) {
      return
    }

    const loadTools = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          return
        }

        const data = await response.json()
        if (data?.tools) {
          setToolsState(data.tools)
        }
      } catch (error) {
        // Keep local tools as fallback
      }
    }

    loadTools()
  }, [apiBase])

  useEffect(() => {
    if (!subjects.find(subject => subject.id === activeTab) && subjects.length > 0) {
      setActiveTab(subjects[0].id)
    }
  }, [subjects, activeTab])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchTools(query, toolsState)
      setSearchResults(results.length > 0 ? results : [])
    } else {
      setSearchResults(null)
    }
  }

  const handleGoogleSearch = (query) => {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`
    window.open(googleUrl, '_blank')
  }

  const currentSubject = subjects.find(s => s.id === activeTab)
  const displayTools = searchResults !== null
    ? searchResults.length > 0 
      ? searchResults 
      : []
    : currentSubject?.tools || []

  const handleSaveTools = async (nextData, pinInput) => {
    const url = getApiUrl('saveTools')
    if (!url) {
      setToolsState(nextData)
      window.localStorage.setItem('technoda_tools_data', JSON.stringify(nextData))
      return
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin: pinInput, tools: nextData })
    })

    if (!response.ok) {
      throw new Error('Save failed')
    }

    setToolsState(nextData)
    window.localStorage.setItem('technoda_tools_data', JSON.stringify(nextData))
  }

  const handleResetTools = async (pinInput) => {
    const url = getApiUrl('resetTools')
    if (!url) {
      setToolsState(toolsData)
      window.localStorage.removeItem('technoda_tools_data')
      return
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin: pinInput })
    })

    if (!response.ok) {
      throw new Error('Reset failed')
    }

    setToolsState(toolsData)
    window.localStorage.removeItem('technoda_tools_data')
  }

  const validatePin = async (pinInput) => {
    const apiUrl = getApiUrl('validatePin')
    if (!apiUrl) {
      throw new Error('Missing PIN API URL')
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pin: pinInput })
    })

    if (!response.ok) {
      throw new Error('PIN validation failed')
    }

    const data = await response.json()
    return Boolean(data?.valid)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🤖 באתי לעזרה - בינה מלאכותית</h1>
          <p className="app-subtitle">כל הכלים שתצטרך לשיעור</p>
        </div>
      </header>

      <main className="app-main">
        <SearchBar 
          onSearch={handleSearch}
          onGoogleSearch={handleGoogleSearch}
          value={searchQuery}
          isEmpty={searchResults?.length === 0}
        />

        {searchResults === null && (
          <Tabs 
            subjects={subjects} 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        )}

        <ToolsGrid 
          tools={displayTools}
          isSearching={searchResults !== null}
          searchQuery={searchQuery}
          onGoogleSearch={handleGoogleSearch}
        />
      </main>

      <FloatingHelpButton />
      <Footer>
        <ManagerPanel
          data={toolsState}
          onSave={handleSaveTools}
          onReset={handleResetTools}
          validatePin={validatePin}
        />
      </Footer>
    </div>
  )
}
