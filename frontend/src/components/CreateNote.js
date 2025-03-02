import React, { useState } from 'react';
import axios from 'axios';
import './CreateNote.css';

function CreateNote({ onAddNote }) {
  const [content, setContent] = useState("");
  const [residentName, setResidentName] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/care-notes`, { content, residentName, authorName });
      if (response.data.status) {
        onAddNote(response.data.data);
        setContent("");
        setResidentName("");
        setAuthorName("");
      } else {
        console.error('Error adding note:', response.data.errors);
      }
    } catch (error) {
      console.error('Error adding note:', error);
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