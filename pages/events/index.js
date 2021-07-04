import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL } from "@/config/index";
import { PER_PAGE } from "@/config/index";

const EventsPage = ({ events, page, total }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length < 1 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
};

// Runs only in the server
export const getServerSideProps = async ({ query: { page = 1 } }) => {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetching total of events
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // PER_PAGE = length of list
  // We are fetching the array of events but since we are using pagination, we are asking for only 2 events at a time and skipping the events depending on the page number with the start variable.
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  // To implement buttons to change pages, we need to pass in page and totalEvents
  return {
    props: { events, page: +page, total },
  };
};

export default EventsPage;
