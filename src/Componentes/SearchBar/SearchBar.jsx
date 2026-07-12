import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

export default function SearchBar({ busqueda, setBusqueda }) {
  return (
    <div className={styles.searchWrap}>
      <span className={styles.searchIcon}>
        <FaSearch />
      </span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}
