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
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeEvent(state, action) {
      const id = action.payload;
      const existintItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existintItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existintItem.quantity--;
        existintItem.totalPrice -= existintItem.price;
      }
    },
  },
});

export const eventsActions = eventsSlice.actions;
export default eventsSlice;
