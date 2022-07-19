import Events from './Events';
import { events } from '../../dummyData';

const PreviousEvents = () => {
  const previous = events
    .filter((e) => e.date < new Date())
    .sort((a, b) => a.date - b.date);

  return <Events dataEvents={previous} />;
};

export default PreviousEvents;

// const styles = StyleSheet.create({})
