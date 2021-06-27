import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = ({
  title = "DJ Events | Find the hottest parties",
  description = "Find the latest DJ and other musical events",
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
