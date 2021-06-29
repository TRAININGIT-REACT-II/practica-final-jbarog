import actionTypes from 'actions/types';

import {updateArrayIndex} from "utils/array.helpers";

const initialState = {
  list: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_NOTES:
      return {
        list: [
          ...action.notesList
        ]
      };
    case actionTypes.CREATE_NOTE:
      return {
        list: [
          ...state.list, {
            ...action.newNote,
          }
        ]
      };
    case actionTypes.UPDATE_NOTE:
      const noteIndex = state.list.findIndex(n=>n.id===action.note.id)
      const updateFn = prevNote => ({
        ...action.note,
        author:action.note.author.id
      })
      return {
        list: updateArrayIndex(state.list,noteIndex,updateFn)
      }
    case actionTypes.REMOVE_NOTE:
      return {
        list: state.list.filter(n=>n.id!=action.id)
      }
    default:
      return state;
  }
}

export default reducer;
