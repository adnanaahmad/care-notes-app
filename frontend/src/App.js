import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/care-notes`);
        if (response.data.status) {
          setNotes(response.data.data);
        } else {
          console.error('Error fetching notes', response.data.errors);
        }
      } catch (err) {
        console.error('Error fetching notes', err);
      }
    }
    fetchNotes();
  }, []);

  const handleAddNote = (note) => {
    setNotes([...notes, note]);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Care Notes</h1>
          <button className="add-note-button" onClick={() => setIsModalOpen(true)}>
            + Add Note
          </button>
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
              <CreateNote onAddNote={handleAddNote} />
            </div>
          </div>
        )}
        <NotesList notes={notes} />
      </div>
    </div>
  );
}

export default App; 