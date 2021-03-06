import actionTypes from './types';

export const setNotes = (notesList) => ({
  type: actionTypes.SET_NOTES,
  notesList
});

export const createNote = (newNote) => ({
  type: actionTypes.CREATE_NOTE,
  newNote
});

export const updateNote = (note) => ({
  type: actionTypes.UPDATE_NOTE,
  note
});

export const removeNote = (id) => ({
  type: actionTypes.REMOVE_NOTE,
  id
});
