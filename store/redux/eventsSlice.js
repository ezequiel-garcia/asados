import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: {},
    currentEvent: {
      eventInfo: {},
      tasks: [],
      bills: [],
      messages: [],
    },
  },
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },

    // addEvent(state, action) {
    //   state.events = { [action.payload.id]: action.payload, ...state.events };
    // },

    addEvent(state, action) {
      const event = action.payload;
      state.events = { ...state.events, [event.eid]: event };
    },

    removeEvent(state, action) {
      state.events = state.events.filter((item) => item.id !== id);
      //If it's deleted for the creator have to delete it to all the users that are in
    },
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload || null;
    },
    clearEventState(state, actions) {
      //clear the state at logout
      state.events = {};
      state.currentEvent = {};
    },
  },
});

export const { replaceCart, addEvent, removeEvent, setEvents, clearState } =
  eventsSlice.actions;
export default eventsSlice;
