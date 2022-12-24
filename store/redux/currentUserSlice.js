import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload || null;
    },

    //receive the event ID
    addEventToUser(state, action) {
      state.currentUser.events = {
        [action.payload]: true,
        ...state.currentUser.events,
      };
      //Have to add the participant to the event
    },
    //receive the event ID
    removeEventFromUser(state, action) {
      // console.log(action.payload + '---payload para eliminar');
      // console.log(state.currentUser.events);
      // state.currentUser.events = Object.entries(
      //   state.currentUser.events
      // ).filter(([key, value]) => key != action.payload);
      // delete state.currentUser.events.eventId;
    },

    clearUser(state, actions) {
      //clear the state at logout
      state.currentUser = {};
    },
  },
});

export const {
  setCurrentUser,
  addEventToUser,
  removeEventFromUser,
  clearUser,
} = currentUserSlice.actions;
export default currentUserSlice;
