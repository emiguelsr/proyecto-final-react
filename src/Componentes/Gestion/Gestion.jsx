import { useEffect, useState } from "react";
import { db, firebaseReady } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FormularioContainer } from "../FormularioContainer/FormularioContainer";
import styles from "./Gestion.module.css";

export default function Gestion() {

  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const obtenerProductos = async () => {
    if (!db) {
      setProductos([]);
      return;
    }

    const productosRef = collection(db, "productos");
    const snapshot = await getDocs(productosRef);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductos(lista);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    const ref = doc(db, "productos", id);
    await deleteDoc(ref);
    setProductos(productos.filter(p => p.id !== id));
  };

  const editarProducto = (producto) => {
    setProductoAEditar(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  if (!firebaseReady || !db) {
    return (
      <div className={styles.gestion}>
        <h2>Gestión de Productos</h2>
        <p>Firebase no está configurado todavía, por eso esta sección no puede cargar datos.</p>
      </div>
    );
  }

  return (
    <div className={styles.gestion}>
      <h2>Gestión de Productos</h2>
      <hr />

      <FormularioContainer
        productoAEditar={productoAEditar}
        cancelarEdicion={cancelarEdicion}
        refrescarLista={obtenerProductos}
      />

      <hr />
      <h3>Lista de Productos</h3>

      <ul className={styles.lista}>
        {productos.map(prod => (
          <li key={prod.id} className={styles.item}>
            {prod.nombre} - ${prod.precio}

            <div className={styles.botones}>
              <button onClick={() => editarProducto(prod)}>Editar</button>
              <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
