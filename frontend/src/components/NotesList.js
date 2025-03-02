import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../features/notesSlice';
import { fetchNotes } from '../api/notesApi'; // Import fetchNotes from the new API file
import './NotesList.css';

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const initFetch = async () => {
      const fetchedNotes = await fetchNotes();
      dispatch(setNotes(fetchedNotes));
    };

    initFetch();
    const interval = setInterval(initFetch, 5000); // Poll every 60 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

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