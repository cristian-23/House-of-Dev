import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMessages = createAction("SET_MESSAGES");
export const addMessages = createAction("ADD_MESSAGES");

const initialState = [];

const reducer = createReducer(initialState, {
  [setMessages]: (state, action) => {
    return action.payload;
  },
  [addMessages]: (state, action) =>
    state[0] ? [...state, action.payload] : [action.payload],
});

export default reducer;
