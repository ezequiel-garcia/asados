import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addEvent(state, action) {
      state.events = [action.payload, ...state.events];
    },
    removeEvent(state, action) {
      state.events = state.events.filter((item) => item.id !== id);
    },
  },
});

export const { replaceCart, addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice;
