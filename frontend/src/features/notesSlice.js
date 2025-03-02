import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes', // name of the slice
  initialState: {
    notes: [], // array to hold notes
    isModalOpen: false, // boolean to control modal visibility
    isOnline: navigator.onLine, // boolean to track online status, defaults to browser online status
  },
  reducers: {
    setNotes: (state, action) => {
      // Reducer to set the notes array
      state.notes = action.payload; // payload should be an array of notes
    },
    addNote: (state, action) => {
      // Reducer to add a new note to the beginning of the notes array
      state.notes.unshift(action.payload); // payload should be the new note object
      if (state.notes.length > 5) {
        // Keep only the 5 most recent notes
        state.notes.pop(); // remove the oldest note if there are more than 5
      }
    },
    openModal: (state) => {
      // Reducer to open the modal
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      // Reducer to close the modal
      state.isModalOpen = false;
    },
    setOnlineStatusTrue: (state) => {
      // Reducer to set isOnline to true
      state.isOnline = true;
    },
    setOnlineStatusFalse: (state) => {
      // Reducer to set isOnline to false
      state.isOnline = false;
    },
  }
});

export const {
  setNotes,
  addNote,
  openModal,
  closeModal,
  setOnlineStatusTrue,
  setOnlineStatusFalse,
} = notesSlice.actions; // Export actions for use in components

export default notesSlice.reducer; // Export reducer to be included in the store
