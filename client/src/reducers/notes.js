import actionTypes from 'actions/types';

import {updateArrayIndex} from "utils/array.helpers";

const initialState = {
  list: [
    {id:1},
    {id:2}
  ]
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
      const updateFn = () => ({
        ...action.note,
      })
      return updateArrayIndex(state.list,noteIndex,updateFn)
    case actionTypes.REMOVE_NOTE:
      return state.list.filter(n=>n.id!=action.id)
    default:
      return state;
  }
}

export default reducer;
