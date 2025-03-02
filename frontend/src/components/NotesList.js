import React from 'react';
import './NotesList.css';

function NotesList({ notes }) {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); // This will format the date in a readable way
  };

  return (
    <div className="notes-stack">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <strong>{note.residentName}</strong>
          </div>
          <div className="note-meta">
            {formatDateTime(note.dateTime)} - {note.authorName}
          </div>
          <div className="note-content">
            {note.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList; 