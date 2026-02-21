import React from "react";
import "./Tabs.css";

export default function Tabs({ subjects, activeTab, onTabChange }) {
  return (
    <div className="tabs-container">
      <div className="tabs-scroll">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className={`tab-button ${activeTab === subject.id ? "active" : ""}`}
            onClick={() => onTabChange(subject.id)}
            aria-selected={activeTab === subject.id}
            aria-label={subject.title}
          >
            <span className="tab-icon">{subject.icon}</span>
            <span className="tab-title">{subject.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
