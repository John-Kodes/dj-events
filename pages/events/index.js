import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

const EventsPage = ({ events }) => {
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length < 1 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

// Runs only in the server
export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
};

export default EventsPage;
