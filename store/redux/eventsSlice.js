import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: {},
    currentEvent: {
      eventInfo: {},
      tasks: {},
      bills: {},
      messages: [],
    },
  },
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },

    addEvent(state, action) {
      const event = action.payload;
      state.events = { ...state.events, [event.eid]: event };
    },

    removeEvent(state, action) {
      delete state.events?.[action.payload];
    },

    // current event actions
    setCurrentEventInfo(state, action) {
      state.currentEvent = action.payload || null;
    },

    setCurrentEventInfo(state, action) {
      state.currentEvent.eventInfo = action.payload || {};
    },
    setCurrentEventTasks(state, action) {
      state.currentEvent.tasks = action.payload || [];
    },
    setCurrentEventBills(state, action) {
      state.currentEvent.bills = action.payload || [];
    },
    setCurrentEventMessages(state, action) {
      state.currentEvent.messages = action.payload || [];
    },

    clearCurrentEvent(state) {
      state.currentEvent = {};
    },

    clearEventState(state, actions) {
      //clear the state at logout
      state.events = {};
      state.currentEvent = {};
    },
  },
});

export const {
  replaceCart,
  addEvent,
  removeEvent,
  setEvents,
  clearEventState,
  clearCurrentEvent,
  setCurrentEventInfo,
  setCurrentEventBills,
  setCurrentEventMessages,
  setCurrentEventTasks,
} = eventsSlice.actions;
export default eventsSlice;
