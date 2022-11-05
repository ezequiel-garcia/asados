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
      console.log('succesfully user updated  ');
    } catch (e) {
      console.error('Error updating user', e);
    }
  };
};

// const addProfileImage = async (ref) => {
//   // Get the download URL
//   getDownloadURL(ref)
//     .then((url) => {
//       console.log(url + '-----> url');
//       return url;
//       // Insert url into an <img> tag to "download"
//     })
//     .catch((error) => {
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case 'storage/object-not-found':
//           console.log(error);
//           // File doesn't exist
//           break;
//         case 'storage/unauthorized':
//           console.log(error);

//           // User doesn't have permission to access the object
//           break;
//         case 'storage/canceled':
//           console.log(error);

//           // User canceled the upload
//           break;

//         // ...

//         case 'storage/unknown':
//           console.log(error);

//           // Unknown error occurred, inspect the server response
//           break;
//       }
//     });
// };

//upload profile picture
export const uploadProfileImage = async (imageURI, userId) => {
  const storageRef = ref(storage, `profileImages/${userId}`);

  const response = await fetch(imageURI);
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
    console.error('Error editing document: ', e);
  }
};
