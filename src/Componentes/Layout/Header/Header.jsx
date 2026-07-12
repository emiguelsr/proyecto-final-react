import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/useAuth.js";
import styles from "./Header.module.css";

export default function Header() {

  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.brandWrap}>
          <span className={styles.brandKicker}>Fiambrería</span>
          <h1 className={styles.brand}>La Familia</h1>
        </div>

        <ul className={styles.navList}>

          <li className="nav-item">
            <Link className={styles.navLink} to="/">Inicio</Link>
          </li>

          <li className="nav-item">
            <Link className={styles.navLink} to="/productos">Productos</Link>
          </li>

          <li className="nav-item">
            <Link className={styles.navLink} to="/carrito">Carrito</Link>
          </li>

          {user?.rol === "admin" && (
            <li className="nav-item">
              <Link className={styles.adminLink} to="/gestion">Gestión</Link>
            </li>
          )}

          {!user ? (
            <>
              <li className="nav-item">
                <Link className={styles.navLink} to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className={styles.navLink} to="/registro">Registro</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.userInfo}>
                Hola, {user.email}
              </li>
              <li className="nav-item">
                <button className={styles.logoutButton} onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}
