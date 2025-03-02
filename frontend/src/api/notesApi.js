import axios from 'axios';
import db from '../db/indexedDb';

const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to fetch care notes from the backend
export const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/care-notes`);
      if (response.data.status) {
        const fetchedNotes = response.data.data;
        await db.notes.bulkPut(fetchedNotes); // Sync new notes to IndexedDB
        return await db.notes.orderBy('dateTime').reverse().limit(5).toArray(); // Fetch the latest 5 notes
      } else {
        console.error('Error fetching notes', response.data.errors);
        // Fallback to IndexedDB
        return await db.notes.orderBy('dateTime').reverse().limit(5).toArray();
      }
    } catch (err) {
      console.error('Error fetching notes', err);
      // Fallback to IndexedDB
      return await db.notes.orderBy('dateTime').reverse().limit(5).toArray();
    }
};

// Function to post a new care note
export const postCareNote = async (content, residentName, authorName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/care-notes`, { content, residentName, authorName });
      if (response.data.status) {
        return { success: true, data: response.data.data };
      } else {
        console.error('Error adding note:', response.data.errors);
        return { success: false, error: response.data.errors };
      }
    } catch (error) {
      console.error('Error adding note:', error);
      return { success: false, error };
    }
}; 