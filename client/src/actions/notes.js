import actionTypes from './types';

export const createNote = (newNote) => ({
  type: actionTypes.CREATE_NOTE,
  newNote
});

export const updateNote = (note) => ({
  type: actionTypes.UPDATE_NOTE,
  note
});

export const removeNote = (index) => ({
  type: actionTypes.REMOVE_NOTE,
  index
});
