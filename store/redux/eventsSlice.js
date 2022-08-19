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
    addEvent(state, action) {
      state.events = { [action.payload.id]: action.payload, ...state.events };
    },
    removeEvent(state, action) {
      state.events = state.events.filter((item) => item.id !== id);
      //If it's deleted for the creator have to delete it to all the users that are in
    },
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload || null;
    },
  },
});

export const { replaceCart, addEvent, removeEvent, setEvents } =
  eventsSlice.actions;
export default eventsSlice;
