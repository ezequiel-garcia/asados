import {
  replaceCart,
  addEvent,
  removeEvent,
  setEvents,
  clearCurrentEvent,
  setCurrentEventInfo,
  setCurrentEventMessages,
  setCurrentEventBills,
  setCurrentEventTasks,
  setCurrentEventParticipants,
} from './eventsSlice';
import { addEventToUser, removeEventFromUser } from './currentUserSlice';
import app from '../../config/firebase';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  deleteField,
  query,
  orderBy,
} from 'firebase/firestore';

import { dateFromDB } from '../../util/date';

const db = getFirestore(app);
const storage = getStorage();

export const fetchEvents = (currentUser) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log('fetching user events');

      if (!currentUser?.events) {
        dispatch(setEvents({}));
        return;
      }

      Object.keys(currentUser?.events).map(async (eventId) => {
        // const docRef = doc(db, 'events', eventId);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   const currentEvent = docSnap.data();
        const unsub = onSnapshot(doc(db, 'events', eventId), (doc) => {
          if (doc.data()) {
            const currentEvent = doc.data();
            dispatch(
              addEvent({
                ...currentEvent,
                date: new Date(
                  currentEvent.date.seconds * 1000 +
                    currentEvent.date.nanoseconds / 1000000
                ),
              })
            );
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        });
      });

      //   return events;
    };

    try {
      await fetchData();
      //   const evnt = await fetchData();
      //   console.log('EVENTOOOS DESDE FETCH' + evnt);
      //   dispatch(setEvents(events || []));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addEventToDB = (event, user) => {
  const eventId = event.eid;
  const uid = user.uid;

  return async (dispatch) => {
    const add = async () => {
      try {
        // const docRef = await setDoc(doc(db, 'users', user.uid), {
        await setDoc(doc(db, 'events', eventId), {
          eid: event.eid,
          name: event.name,
          description: event.description,
          location: event.location,
          date: event.date,
          time: event.time,
          shareTasks: event.shareTasks,
          shareBills: event.shareBills,
          imageURL: event.imageURL,
          chat: {},
          admin: event.admin,
          participants: event.participants,
        });

        console.log('succesfully added');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };
    try {
      await add();
      dispatch(addEventToUserDB(user, eventId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addEventToUserDB = (user, eventId) => {
  const uid = user.uid;
  const userEvents = user.events;
  return async (dispatch) => {
    try {
      const userRef = doc(db, 'users', uid);

      await updateDoc(userRef, {
        events: { ...userEvents, [eventId]: true },
      });
      console.log('succesfully added event to user in db');
      dispatch(addEventToUser(eventId));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
};

export const leaveEvent = (uid, eid) => {
  return async (dispatch) => {
    //delete event from user
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        //delete the specific eventId
        [`events.${eid}`]: deleteField(),
      });

      console.log('succesfully deleted the event from user in db');
    } catch (e) {
      console.error('Error deleting event from user: ', e);
    }

    // delete user from event
    try {
      const userRef = doc(db, 'events', eid);
      await updateDoc(userRef, {
        [`participants.${uid}`]: deleteField(),
      });
      dispatch(clearCurrentEvent());
    } catch (e) {
      console.error('Error deleting user from event db: ', e);
    }
  };
};

export const deleteEvent = (currentEvent) => {
  console.log(JSON.stringify(currentEvent) + '--> currentdelete ');
  return async (dispatch) => {
    async function deleteEventsFromUser() {
      // first delete the event from users
      Object.keys(currentEvent?.participants).map(async (userId) => {
        // dispatch(leaveEvent(uid, currentEvent.eid));

        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          //delete the specific eventId
          [`events.${currentEvent.eid}`]: deleteField(),
        });
        console.log('succesfully deleted the event from user in db');
      });
    }

    async function deleteEventFromDB() {
      // delete event from db
      await deleteDoc(doc(db, 'events', currentEvent.eid));
      console.log('succesfully deleted the event from  db');
      // dispatch(removeEventFromUser(currentEvent.eid));
      dispatch(clearCurrentEvent());
    }

    try {
      await deleteEventsFromUser();
      await deleteEventFromDB();
      dispatch(removeEvent(currentEvent.eid));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setLastMessage = (eventId, message) => {
  return async () => {
    try {
      const eventRef = doc(db, 'events', eventId);

      await updateDoc(eventRef, {
        chat: { lastMessage: message },
      });
    } catch (e) {
      console.error('Error adding last chat: ', e);
    }
  };
};

export const fetchEventInfo = (eventId) => {
  return async (dispatch) => {
    const unsub = onSnapshot(doc(db, 'events', eventId), (doc) => {
      console.log('Current data: ', doc.data());
      // dispatch to the tasks

      if (doc.data()) {
        const currentEventInfo = doc.data();
        dispatch(
          setCurrentEventInfo({
            ...currentEventInfo,
            date: dateFromDB(currentEventInfo.date),
          })
        );
      } else {
        setCurrentEventInfo({});
      }
    });
  };
};

export const fetchTasks = (eventId) => {
  return async (dispatch) => {
    const unsub = onSnapshot(doc(db, 'tasks', eventId), (doc) => {
      //console.log('Current data: ', doc.data());
      // dispatch to the tasks
      if (doc.data()) {
        const { tasks } = doc.data();
        dispatch(setCurrentEventTasks(tasks));
      } else dispatch(setCurrentEventTasks([]));
    });
  };
};

export const deleteTasksFromDB = (eid) => {
  return async () => {
    try {
      await deleteDoc(doc(db, 'tasks', eid));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchMessages = (eventId) => {
  return async (dispatch) => {
    const unsub = onSnapshot(doc(db, 'messages', eventId), (doc) => {
      // console.log('Current data: ', doc.data());
      if (doc.data()) {
        dispatch(setCurrentEventMessages(doc.data()));
      } else dispatch(setCurrentEventMessages({}));
    });
  };
};

export const fetchBills = (eventId) => {
  return async (dispatch) => {
    const unsub = onSnapshot(doc(db, 'bills', eventId), (doc) => {
      if (doc.data()) {
        const { bills } = doc.data();
        dispatch(setCurrentEventBills(bills));
      } else dispatch(setCurrentEventBills([]));
    });
  };
};

// export const fetchParticipants = (eventId) => {
//   return async (dispatch) => {
//     const unsub = onSnapshot(doc(db, 'events', eventId), (doc) => {
//       //console.log('Current data: ', doc.data());
//       // Get every participant data and put into participants
//       if (doc.data()) {
//         const { participants } = doc.data();
//         dispatch(setCurrentEventParticipants(participants));
//       } else dispatch(setCurrentEventParticipants({}));
//     });
//   };
// };

// export const fetchParticipants = (eventId) => {
//   return async (dispatch) => {
//     const unsub = onSnapshot(doc(db, 'events', eventId), (doc) => {
//       //console.log('Current data: ', doc.data());
//       // Get every participant data and put into participants
//       if (doc.data()) {
//         const { participants } = doc.data();
//         Object.keys(participants).map(async (userId) => {
//           dispatch(getUsersData(userId));
//         });
//       } else dispatch(setCurrentEventParticipants({}));
//     });
//   };
// };

// const getUsersData = (userId) => {
//   return async (dispatch) => {
//     try {
//       const unsub = onSnapshot(doc(db, 'users', userId), (doc) => {
//         const user = doc.data();
//         const userInfo = {
//           name: user.name,
//           uid: user.uid,
//           profilePic: user.profilePic,
//         };
//         console.log(JSON.stringify(userInfo));
//         dispatch(setCurrentEventParticipants(userInfo));
//         // return userInfo;
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

export const setTasks = (eventId, tasks) => {
  return async () => {
    try {
      await setDoc(doc(db, 'tasks', eventId), {
        tasks,
      });
    } catch (e) {
      console.error('Error adding tasks: ', e);
    }
  };
};

export const setBills = (eventId, bills) => {
  return async () => {
    try {
      await setDoc(doc(db, 'bills', eventId), {
        bills,
      });
    } catch (e) {
      console.error('Error adding bills: ', e);
    }
  };
};

export const setMessages = (eventId, messages) => {
  return async () => {
    try {
      await setDoc(doc(db, 'messages', eventId), {
        ...messages,
      });
    } catch (e) {
      console.error('Error adding message: ', e);
    }
  };
};

export const fetchCurrentEvent = (eventId) => {
  return async (dispatch) => {
    dispatch(fetchEventInfo(eventId));
    dispatch(fetchMessages(eventId));
    dispatch(fetchTasks(eventId));
    dispatch(fetchBills(eventId));
    // dispatch(fetchParticipants(eventId));
  };
};

//upload event picture
export const uploadEventImage = async (imageURI, eventId) => {
  const storageRef = ref(storage, `eventImages/${eventId}`);

  const response = await fetch(imageURI);
  const blob = await response.blob();

  uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      console.log('Uploaded a blob or file!');
      try {
        const url = await getDownloadURL(storageRef);
        updateEventImage(url, eventId);
        console.log(url);
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  blob.close();
};

const updateEventImage = async (url, eventId) => {
  try {
    const userRef = doc(db, 'events', eventId);
    await updateDoc(userRef, {
      imageURL: url,
    });
  } catch (e) {
    console.error('Error editing document: ', e);
  }
};
