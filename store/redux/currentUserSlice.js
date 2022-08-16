import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {},
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },

    //receive the event ID
    addEventToUser(state, action) {
      state.currentUser.events = { [action.payload]: true, ...state.events };
      //Have to add the participant to the event
    },
    //receive the event ID
    removeEventFromUser(state, action) {
      state.currentUser.events = Object.entries(
        state.currentUser.events
      ).filter(([key, value]) => key != action.payload);
      //If it's deleted for the creator have to delete it to all the users that are in
    },
  },
});

export const { setCurrentUser, addEventToUser, removeEventFromUser } =
  currentUserSlice.actions;
export default currentUserSlice;
