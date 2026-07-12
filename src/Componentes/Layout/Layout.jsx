import { Outlet } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className="page-shell">
      <Header />
      <main className={`page-main ${styles.main}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
