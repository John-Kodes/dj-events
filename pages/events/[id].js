import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const EventPage = () => {
  const router = useRouter();
  console.log(router);

  return (
    <Layout title={router.query.id}>
      <h1>My Event</h1>
      <h3>{router.query.id}</h3>
    </Layout>
  );
};

export default EventPage;
