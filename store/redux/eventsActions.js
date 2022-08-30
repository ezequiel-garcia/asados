import {
  replaceCart,
  addEvent,
  removeEvent,
  setEvents,
  setCurrentEventInfo,
  setCurrentEventMessages,
  setCurrentEventBills,
  setCurrentEventTasks,
} from './eventsSlice';
import { addEventToUser } from './currentUserSlice';
import app from '../../config/firebase';

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';

import { dateFromDB } from '../../util/date';

const db = getFirestore(app);

export const fetchEvents = (currentUser) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log('fetching user events');

      Object.keys(currentUser?.events).map(async (eventId) => {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentEvent = docSnap.data();
          dispatch(
            addEvent({
              ...currentEvent,
              date: new Date(
                currentEvent.date.seconds * 1000 +
                  currentEvent.date.nanoseconds / 1000000
              ),
            })
          );
          //console.log('Document data:', docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
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
          chat: '',
          admin: event.admin,
          participants: { [uid]: true },
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

//Current event actions

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

            // date: new Date(
            //   currentEventInfo.date.seconds * 1000 +
            //     currentEventInfo.date.nanoseconds / 1000000
            // ),
          })
        );
        //dispatch(setCurrentEventInfo(doc.data()));
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
      //console.log('Current data: ', doc.data());
      if (doc.data()) {
        dispatch(setCurrentEventMessages(doc.data()));
      } else dispatch(setCurrentEventMessages([]));
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

export const setTasks = (eventId, tasks) => {
  return async () => {
    if (!tasks) {
      tasks = { tasks: [] };
    }
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

export const setMessages = (eventId, tasks) => {
  return async () => {
    try {
      await setDoc(doc(db, 'tasks', eventId), {
        tasks,
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
  };
};
