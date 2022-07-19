import Events from './Events';
import { events } from '../../dummyData';

const UpcomingEvents = () => {
  const upcoming = events
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date - b.date);

  return <Events dataEvents={upcoming} />;
};

export default UpcomingEvents;
