import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import currentUserSlice from './currentUserSlice';

// import uiSlice from './ui-slice';
// import cartSlice from './cart-slice';

const store = configureStore({
  reducer: { events: eventsSlice.reducer, user: currentUserSlice.reducer },
});

export default store;
