import React from 'react';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from './features/notesSlice';

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.notes.isModalOpen);

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Care Notes</h1>
          <button className="add-note-button" onClick={() => dispatch(openModal())}>
            + Add Note
          </button>
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => dispatch(closeModal())}>×</button>
              <CreateNote />
            </div>
          </div>
        )}
        <NotesList />
      </div>
    </div>
  );
}

export default App; 