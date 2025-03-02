import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../features/notesSlice';
import { fetchNotes } from '../api/notesApi'; // Import fetchNotes from the new API file
import './NotesList.css';

// NotesList component to display notes
const NotesList = () => {
  // dispatch hook to dispatch actions to redux store
  const dispatch = useDispatch();
  // useSelector hook to get notes from redux store
  const notes = useSelector((state) => state.notes.notes);

  // useEffect hook to fetch notes when component mounts and set up polling
  useEffect(() => {
    // Async function to fetch notes
    const initFetch = async () => {
      const fetchedNotes = await fetchNotes();
      dispatch(setNotes(fetchedNotes));
    };

    initFetch();
    // Set interval to fetch notes every 60 seconds
    const interval = setInterval(initFetch, 60000); // Poll every 60 seconds
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]); // Dependency array includes dispatch to avoid stale closure

  // Function to format date and time
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
};

export default NotesList; 