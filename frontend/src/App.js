import React, { useEffect } from 'react';
import CreateNote from './components/CreateNote';
import NotesList from './components/NotesList';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, setOnlineStatusTrue, setOnlineStatusFalse } from './features/notesSlice';
import { syncNotesToBackend } from './api/notesApi';
function App() {
  // allows dispatching actions to the Redux store
  const dispatch = useDispatch();
  // useSelector hook to access parts of the Redux state
  const isModalOpen = useSelector(state => state.notes.isModalOpen);
  const isOnline = useSelector(state => state.notes.isOnline);

  // useEffect hook to handle online/offline status
  useEffect(() => {
    // Function to set online status and sync notes
    const setOnline = () => {
      dispatch(setOnlineStatusTrue());
      syncNotesToBackend();
    };
    // Function to set offline status
    const setOffline = () => dispatch(setOnlineStatusFalse());

    // Event listeners for online and offline events
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, [dispatch]); // Dependency array to avoid unnecessary re-renders

  return (
    <div className="App">
      <div className="main-container">
        {/* Header section */}
        <div className="header">
          <h1>Care Notes</h1>
          {/* Online/Offline status indicator */}
          <div className={`status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
        {/* Modal overlay for creating notes, conditionally rendered */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => dispatch(closeModal())}>×</button>
              <CreateNote />
            </div>
          </div>
        )}
        {/* Button to open the create note modal */}
        <button className="add-note-button" onClick={() => dispatch(openModal())}>
          + Add Note
        </button>
        {/* Notes list component */}
        <NotesList />
      </div>
    </div>
  );
}

export default App;