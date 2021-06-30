import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/event.module.css";

const EventPage = ({ evt }) => {
  const deleteEvent = () => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

////// Code below pre-renders at build time
// GetStaticPaths is necessary for dynamic pages.
export const getStaticProps = async ({ params: { id } }) => {
  const res = await fetch(`${API_URL}/events?slug=${id}`);

  const events = await res.json();

  return { props: { evt: events[0] }, revalidate: 1 };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { id: evt.slug },
  }));

  // must return an object that has an array of paths that are dynamically generated.
  return {
    paths,
    fallback: false,
    // fallback: If false, it will show a 404 if the resource or path is not found. Normally used for static websites. If you want it to look for a path even if it doesn't generate at build time and to make a new request, set it to true
  };
};

////// Code below is pre-rendering for every request.
// // The argument is "context" which gives us access to many things like the query
// export const getServerSideProps = async ({ query: { id } }) => {
//   const res = await fetch(`${API_URL}/api/events/${id}`);

//   const events = await res.json();

//   return { props: { evt: events[0] } };
// };

export default EventPage;
