import { replaceCart, addEvent, removeEvent, setEvents } from './eventsSlice';
import { addEventToUser } from './currentUserSlice';
import app from '../../config/firebase';

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const db = getFirestore(app);

export const fetchEvents = (currentUser) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log('fetching user events');

      console.log('CURRENT USEEEER' + currentUser);
      console.log('eventos desde detch' + JSON.stringify(currentUser.events));
      Object.keys(currentUser?.events).map(async (eventId) => {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentEvent = docSnap.data();
          console.log('agregando' + currentEvent);
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
      console.log('eventooo' + event);
      console.log('ecentooo ID' + eventId);
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
  console.log('eventos del uruario' + JSON.stringify(userEvents));
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
