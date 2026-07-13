import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/useCart";
import { FaPlus, FaMinus, FaCartPlus } from "react-icons/fa";
import React from "react";
import styles from "./Item.module.css";

function Item({ id, nombre, precio, stock, urlImagen }) {

  const [cantidad, setCantidad] = useState(0);
  const { agregarProducto } = useCart();

  const incrementar = useCallback(() => {
    setCantidad((prev) => (prev < stock ? prev + 1 : prev));
  }, [stock]);

  const decrementar = useCallback(() => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const agregarAlCarrito = useCallback(() => {
    agregarProducto({ id, nombre, precio, cantidad });
    alert(`Agregaste ${nombre} al carrito`);
  }, [id, nombre, precio, cantidad, agregarProducto]);

  return (
    <article className={styles.itemCard}>

      <Link to={`/producto/${id}`} className="text-decoration-none">
        <h4 className={styles.itemTitle}>{nombre}</h4>
      </Link>

      {urlImagen && (
        <img
          src={urlImagen}
          alt={nombre}
          className={styles.itemImage}
        />
      )}

      <p className={styles.itemPrice}>${precio.toLocaleString("es-AR")}</p>
      <p className={styles.itemMeta}>Stock disponible: {stock}</p>

      <div className={styles.itemCounter}>
        <button className={styles.counterButton} onClick={decrementar}>
          <FaMinus />
        </button>

        <span className={styles.counterValue}>{cantidad}</span>

        <button className={styles.counterButton} onClick={incrementar}>
          <FaPlus />
        </button>
      </div>

      <button className={styles.cartButton} onClick={agregarAlCarrito}>
        <FaCartPlus className="me-2" />
        Agregar al carrito
      </button>
    </article>
  );
}

export default React.memo(Item);
