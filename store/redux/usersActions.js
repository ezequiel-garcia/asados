import {
  setCurrentUser,
  addEventToUser,
  removeEventFromUser,
} from './currentUserSlice';
import app from '../../config/firebase';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';

import { getFirestore, setDoc, doc, onSnapshot } from 'firebase/firestore';

const db = getFirestore(app);

//const db = getDatabase();

export const fetchCurrentUser = (uid) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
        dispatch(setCurrentUser(doc.data()));
      });

      console.log('fetching current user' + uid);

      // const dbRef = ref(db, 'users/' + uid);
      // onValue(dbRef, (snapshot) => {
      //   const data = snapshot.val();
      //   console.log('current User: ' + data);
      //   if (data) {
      //     dispatch(setCurrentUser(data));
      //   }
      // });
    };

    try {
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserToDB = async (user) => {
  try {
    // const docRef = await setDoc(doc(db, 'users', user.uid), {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name:
        user.displayName || user.email.substring(0, user.email.indexOf('@')),
      profilePic: null,
      events: {},
    });

    console.log('succesfully added');
  } catch (e) {
    console.error('Error adding document: ', e);
  }

  // const reference = ref(db, 'users/' + user.uid);
  // set(reference, {
  //   uid: user.uid,
  //   name: user.displayName || user.email.substring(0, user.email.indexOf('@')),
  //   profilePic: null,
  //   events: {},
  // });
};
