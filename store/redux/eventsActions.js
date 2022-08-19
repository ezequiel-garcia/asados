// import { replaceCart, addEvent, removeEvent, setEvents } from './eventsSlice';
// import app from '../../config/firebase';
// import { getDatabase, ref, set, onValue, get } from 'firebase/database';

// const db = getDatabase();

// export const fetchEvents = (uid) => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       console.log('fetching user events');
//       const dbRef = ref(db, 'users/' + uid);
//       onValue(dbRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log('current User: ' + data);
//         if (data) {
//           dispatch(setCurrentUser(data));
//         }
//       });
//     };

//     try {
//       await fetchData();
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const addUserToDB = (user) => {
//   const reference = ref(db, 'users/' + user.uid);
//   set(reference, {
//     uid: user.uid,
//     name: user.displayName || user.email.substring(0, user.email.indexOf('@')),
//     profilePic: null,
//     events: {},
//   });
// };
