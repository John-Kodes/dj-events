import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import qs from "qs";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

const SearchPage = ({ events }) => {
  const router = useRouter();
  const term = router.query.term;

  return (
    <Layout title="Search Results">
      <Link href="/events">Go back</Link>
      <h1>Search Results for '{term}'</h1>
      {events.length < 1 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

// Runs only in the server
// query: {term} = url/events/search?term=manny
export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events, term },
  };
};

export default SearchPage;
