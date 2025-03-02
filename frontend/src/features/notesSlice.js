import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    isModalOpen: false,

    isOnline: navigator.onLine, // Add isOnline to the initial state
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.unshift(action.payload);
      if (state.notes.length > 5) {
        state.notes.pop();
      }
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setOnlineStatusTrue: (state) => { // Reducer to set isOnline to true
      state.isOnline = true;
    },
    setOnlineStatusFalse: (state) => { // Reducer to set isOnline to false
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
} = notesSlice.actions;

export default notesSlice.reducer;
