import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';

// import uiSlice from './ui-slice';
// import cartSlice from './cart-slice';

const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});

export default store;
