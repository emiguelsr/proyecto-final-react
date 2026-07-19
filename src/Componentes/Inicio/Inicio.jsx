import { Link } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { useProducts } from "../../Context/useProducts";
import styles from "./Inicio.module.css";

export default function Inicio() {
  const { productos, loading } = useProducts();
  const destacados = productos.slice(0, 3);

  return (
    <section className={styles.inicio}>
      <div className={styles.hero}>
        <p className={styles.kicker}>Fiambrería La Familia</p>
        <h1>Bienvenido a la tienda</h1>
        <p className={styles.lead}>Explora nuestros productos destacados y entra directo al catálogo.</p>
        <Link className={styles.cta} to="/productos">
          Ver productos
        </Link>
      </div>

      <div className={styles.destacadosSection}>
        <div className={styles.sectionHeader}>
          <h2>Productos destacados</h2>
          <p>Una selección rápida para que el inicio no quede vacío.</p>
        </div>

        {loading && (
          <div className={styles.loadingWrap}>
            <Spinner animation="border" />
          </div>
        )}

        {!loading && destacados.length === 0 && (
          <Alert variant="warning">No hay productos disponibles por ahora.</Alert>
        )}

        {!loading && destacados.length > 0 && (
          <div className={styles.grid}>
            {destacados.map((producto) => (
              <article key={producto.id} className={styles.card}>
                <img
                  className={styles.image}
                  src={producto.urlImagen}
                  alt={producto.nombre}
                />
                <div className={styles.cardBody}>
                  <span className={styles.tag}>{producto.categoria}</span>
                  <h3>{producto.nombre}</h3>
                  <p className={styles.precio}>${new Intl.NumberFormat("es-AR").format(producto.precio)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
