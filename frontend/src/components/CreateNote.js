import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, closeModal } from '../features/notesSlice';
import { postCareNote } from '../api/notesApi';
import db from '../db/indexedDb';
import './CreateNote.css';

function CreateNote() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [residentName, setResidentName] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postCareNote(content, residentName, authorName);
    if (result.success) {
      await db.notes.put(result.data); // Add note to Dexie DB
      dispatch(addNote(result.data)); // Update Redux state
      setContent("");
      setResidentName("");
      setAuthorName("");
      dispatch(closeModal());
    }
  };

  return (
    <div className="create-note-container">
      <h2 className="create-note-heading">Add Care Note</h2>
      <form className="create-note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="residentName">Resident Name</label>
          <input
            id="residentName"
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="authorName">Author Name</label>
          <input
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Note Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Care Note</button>
      </form>
    </div>
  );
}

export default CreateNote; 