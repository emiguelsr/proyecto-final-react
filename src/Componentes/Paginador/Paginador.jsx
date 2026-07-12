import { Button } from "react-bootstrap";
import styles from "./Paginador.module.css";

export default function Paginador({ total, pagina, setPagina, porPagina }) {

  const totalPaginas = Math.ceil(total / porPagina);

  if (totalPaginas <= 1) return null;

  return (
    <div className={styles.paginationWrap}>

      <Button
        className={styles.paginationButton}
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
      >
        Anterior
      </Button>

      <span className={styles.paginationInfo}>Página {pagina} de {totalPaginas}</span>

      <Button
        className={styles.paginationButton}
        disabled={pagina === totalPaginas}
        onClick={() => setPagina(pagina + 1)}
      >
        Siguiente
      </Button>

    </div>
  );
}
