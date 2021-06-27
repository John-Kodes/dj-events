import Link from "next/dist/client/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
