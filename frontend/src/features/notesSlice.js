import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    isModalOpen: false,
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
  },
});

export const { setNotes, addNote, openModal, closeModal } = notesSlice.actions;
export default notesSlice.reducer;
