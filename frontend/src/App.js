import React, { useEffect } from 'react';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, setOnlineStatusTrue, setOnlineStatusFalse } from './features/notesSlice';

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.notes.isModalOpen);
  const isOnline = useSelector(state => state.notes.isOnline);

  useEffect(() => {
    const setOnline = () => dispatch(setOnlineStatusTrue());
    const setOffline = () => dispatch(setOnlineStatusFalse());

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Care Notes</h1>
          <div className={`status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => dispatch(closeModal())}>×</button>
              <CreateNote />
            </div>
          </div>
        )}
        <button className="add-note-button" onClick={() => dispatch(openModal())}>
          + Add Note
        </button>
        <NotesList />
      </div>
    </div>
  );
}

export default App; 