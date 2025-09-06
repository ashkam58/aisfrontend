'use client'
import { useState, useEffect } from 'react';

export default function TopicWriter({ topicName, grade }) {
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const storageKey = `learning-notes-${grade}-${topicName.replace(/\s+/g, '-').toLowerCase()}`;

  // Load saved notes on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
      setWordCount(savedNotes.trim().split(/\s+/).filter(word => word.length > 0).length);
    }
  }, [storageKey]);

  // Auto-save notes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes.trim()) {
        localStorage.setItem(storageKey, notes);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes, storageKey]);

  // Update word count
  useEffect(() => {
    const words = notes.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [notes]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const clearNotes = () => {
    if (window.confirm('Are you sure you want to clear all your notes? This cannot be undone.')) {
      setNotes('');
      localStorage.removeItem(storageKey);
      setWordCount(0);
    }
  };

  const exportNotes = () => {
    const element = document.createElement('a');
    const file = new Blob([`Topic: ${topicName} (Grade ${grade})\n\n${notes}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topicName.replace(/\s+/g, '_')}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-cartoon p-6 border border-blue-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-cartoon text-blue-800 flex items-center gap-2">
          📝 Learning Notes
          {isSaved && (
            <span className="text-green-600 text-sm font-normal animate-pulse">
              ✓ Saved
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={exportNotes}
            disabled={!notes.trim()}
            className="bg-green-500 text-white px-3 py-1 rounded-cartoon text-sm font-cartoon hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            💾 Export
          </button>
          <button
            onClick={clearNotes}
            disabled={!notes.trim()}
            className="bg-red-500 text-white px-3 py-1 rounded-cartoon text-sm font-cartoon hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="mb-3 flex justify-between items-center text-sm text-blue-600">
        <span>Write your thoughts, key points, or practice problems here...</span>
        <span className="font-medium">{wordCount} words</span>
      </div>

      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder={`Start writing about ${topicName}...`}
        className="w-full h-64 p-4 border border-blue-300 rounded-cartoon bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none font-medium text-gray-800 placeholder-gray-500"
        style={{ fontFamily: 'inherit' }}
      />

      <div className="mt-3 text-xs text-blue-500 flex justify-between">
        <span>💡 Auto-saves every second</span>
        <span>📁 Saved locally in your browser</span>
      </div>
    </div>
  );
}
