import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, closeModal } from '../features/notesSlice';
import { postCareNote } from '../api/notesApi';
import db from '../db/indexedDb';
import './CreateNote.css';

function CreateNote() {
  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();
  // Get the isOnline status from the Redux store
  const isOnline = useSelector(state => state.notes.isOnline);
  // State variables to manage the input fields
  const [content, setContent] = useState("");
  const [residentName, setResidentName] = useState("");
  const [authorName, setAuthorName] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const dateTime = new Date().toISOString(); // Get current date and time in ISO format
    // Call the API to post the care note
    const result = await postCareNote(content, residentName, authorName, dateTime);
    if (result.success) {
      // If API call is successful
      await db.notes.put(result.data); // Add note to Dexie DB
      dispatch(addNote(result.data)); // Update Redux state with the new note
      setContent(""); // Clear the content input field
      setResidentName(""); // Clear the resident name input field
      setAuthorName(""); // Clear the author name input field
      dispatch(closeModal()); // Close the modal after successful submission
    } else {
      // If API call fails
      if (!isOnline) {
        // If offline, save the note to local Dexie DB
        await db.notes.put({ content, residentName, authorName, synced: false, dateTime });
        dispatch(addNote({ content, residentName, authorName, synced: false, dateTime })); // Update Redux state
        dispatch(closeModal()); // Close the modal
        console.error('Failed to sync with server, note saved locally'); // Log error to console
      } else {
        // If online but API call failed, log error
        console.error('Failed to create note');
      }
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
            required // This field is required
          />
        </div>
        <div className="form-group">
          <label htmlFor="authorName">Author Name</label>
          <input
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required // This field is required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Note Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required // This field is required
          />
        </div>
        <button type="submit" className="submit-button">Add Care Note</button>
      </form>
    </div>
  );
}

export default CreateNote; 