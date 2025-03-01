import React, { useState, useEffect } from 'react';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch('/care-notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/care-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote })
    })
    .then(res => res.json())
    .then(data => {
      setNotes([...notes, data]);
      setNewNote('');
    });
  };

  return (
    <div className="App">
      <h1>Care Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="New care note"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App; 