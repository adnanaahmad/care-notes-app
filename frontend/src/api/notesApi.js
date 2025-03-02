import axios from 'axios';
import db from '../db/indexedDb';

const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to fetch care notes from the backend and synchronize with IndexedDB
export const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/care-notes`);
      if (response.data.status) {
        const fetchedNotes = response.data.data;

        // Get unsynced notes from IndexedDB
        const allNotes = await db.notes.toArray();
        const unsyncedNotes = allNotes.filter((note) => note.synced === false);
        console.log('unsyncedNotes', unsyncedNotes);

        // Merge unsynced notes with fetched notes, prioritizing unsynced notes
        const mergedNotes = [...unsyncedNotes, ...fetchedNotes];

        // Update IndexedDB with merged notes, this will update existing notes and add new ones
        await db.notes.bulkPut(mergedNotes);

        // Return the latest 5 notes from IndexedDB, ordered by dateTime descending
        return await db.notes.orderBy('dateTime').reverse().limit(5).toArray();
      } else {
        console.error('Error fetching notes from backend:', response.data.errors);
        // Fallback to IndexedDB if backend fetch fails
        return await db.notes.orderBy('dateTime').reverse().limit(5).toArray();
      }
    } catch (err) {
      console.error('Error fetching notes from backend:', err);
      // Fallback to IndexedDB if backend fetch fails
      return await db.notes.orderBy('dateTime').reverse().limit(5).toArray();
    }
};

// Function to post a new care note to the backend
export const postCareNote = async (content, residentName, authorName, dateTime) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/care-notes`, { content, residentName, authorName, dateTime });
      if (response.data.status) {
        // Return success and the new note data from the backend
        return { success: true, data: response.data.data };
      } else {
        console.error('Error adding note to backend:', response.data.errors);
        // Return failure and error information from the backend
        return { success: false, error: response.data.errors };
      }
    } catch (error) {
      console.error('Error adding note to backend:', error);
      // Return failure and error information
      return { success: false, error };
    }
};

// Function to synchronize notes from IndexedDB to the backend when the user comes back online
export const syncNotesToBackend = async () => {
  // Fetch all notes from IndexedDB
  const allNotes = await db.notes.toArray();
  // Filter notes to find those that have not yet been synced (synced === false)
  const unsyncedNotes = allNotes.filter((note) => note.synced === false);
  console.log("user back online, syncing notes");
  // Iterate over each unsynced note
  for (const note of unsyncedNotes) {
    // Attempt to post the unsynced note to the backend using postCareNote function
    const result = await postCareNote(note.content, note.residentName, note.authorName, note.dateTime);
    // If the post was successful
    if (result.success) {
      // Remove the old unsynced note from IndexedDB
      db.notes.where('id').equals(note.id).delete();
      // Add the newly synced note (with updated data from backend) to IndexedDB
      await db.notes.put(result.data);
    } else{
      // Log an error if syncing a note fails
      console.error("Error syncing note:", result.error);
    }
  }
  // Log completion of note synchronization
  console.log("all notes synced");
};
