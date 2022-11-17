import {
  setCurrentUser,
  addEventToUser,
  removeEventFromUser,
} from './currentUserSlice';
import app from '../../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  collection,
} from 'firebase/firestore';

import { resizeAndCompress } from '../../util/imageManipulator';

const db = getFirestore(app);
const storage = getStorage();

export const fetchCurrentUser = (uid) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
        const userInfo = doc.data();
        dispatch(setCurrentUser(userInfo));
      });

      console.log('fetching current user' + uid);
    };

    try {
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserToDB = async (user, name) => {
  try {
    // const docRef = await setDoc(doc(db, 'users', user.uid), {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      profilePic:
        'https://firebasestorage.googleapis.com/v0/b/asados-2a41e.appspot.com/o/profileImages%2Fdefault.png?alt=media&token=cacfd608-5179-4826-acc1-1b747681eb92',
      events: {},
    });

    console.log('succesfully added');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Check when login with google if the user already exist, if not add user to DB
export const checkIfExist = (token, name) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, 'users', token);
      const docSnap = await getDoc(docRef);

      const user = { uid: token };

      //  if does not exist add to userDB
      if (!docSnap.exists()) {
        console.log('NO exist');
        await addUserToDB(user, name);
        dispatch(fetchCurrentUser(token));
      } else {
        dispatch(fetchCurrentUser(token));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUserInfo = (user) => {
  return async () => {
    try {
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        ...user,
      });
      updateUserInEvents(user);
      console.log('succesfully user updated  ');
    } catch (e) {
      console.error('Error updating user', e);
    }
  };
};

//Update user events with new info after update profil
const updateUserInEvents = async (user) => {
  console.log(JSON.stringify(user) + 'user received');
  // Go throw all the events and update the user data
  Object.keys(user?.events).map(async (eventId) => {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      //update the user profile
      [`participants.${user.uid}`]: {
        name: user.name,
        profilePic: user.profilePic,
        uid: user.uid,
      },
    });
    console.log('succesfully updated the user data in the events');
  });
};

//upload profile picture
export const uploadProfileImage = async (imageURI, userId) => {
  const storageRef = ref(storage, `profileImages/${userId}`);

  //Compress image before upload to db
  const imageCompressed = await resizeAndCompress(imageURI);
  const response = await fetch(imageCompressed.uri);
  const blob = await response.blob();

  uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      try {
        const url = await getDownloadURL(storageRef);
        updateProfileImage(url, userId);
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  blob.close();
};

const updateProfileImage = async (url, userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      profilePic: url,
    });
  } catch (e) {
    console.error('Error editing document: ', e);
  }
};

export const fetchAllUsers = async () => {
  let allUsers = {};
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    allUsers = { ...allUsers, [doc.id]: doc.data() };
    // doc.data() is never undefined for query doc snapshots
  });

  return allUsers;
};

export const sendEventInvitation = async (uid, invitations) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      eventsInvitations: invitations,
    });
  } catch (e) {
    console.error('Error sending invitation: ', e);
  }
};

export const acceptEventInvitation = async (user, invitations, eid) => {
  let event = {};
  const eventRef = doc(db, 'events', eid);
  try {
    const eventSnap = await getDoc(eventRef);
    event = eventSnap.data();
  } catch (e) {
    console.log('Error fetching the event');
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    // add the event id to the user db
    await updateDoc(userRef, {
      events: { ...user?.events, [event.eid]: true },
    });

    // add the user to the event
    await updateDoc(eventRef, {
      participants: {
        ...event.participants,
        [user.uid]: {
          uid: user.uid,
          name: user.name,
          profilePic: user.profilePic,
        },
      },
    });
    // delete the invitation
    rejectEventInvitation(user, invitations, eid);
  } catch (e) {
    console.error('Error accepting invitation: ', e);
  }
};

export const rejectEventInvitation = async (user, invitations, eid) => {
  let invDeleted = { ...invitations };

  delete invDeleted[`${eid}`];
  const userRef = doc(db, 'users', user.uid);
  try {
    await updateDoc(userRef, {
      eventsInvitations: invDeleted,
    });
  } catch (e) {
    console.error('Error accepting invitation: ', e);
  }
};
