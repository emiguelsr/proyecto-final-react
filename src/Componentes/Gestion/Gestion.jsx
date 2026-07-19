import { useEffect, useState } from "react";
import { db, firebaseReady } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { FormularioContainer } from "../FormularioContainer/FormularioContainer";
import GestionCupones from "./GestionCupones";
import styles from "./Gestion.module.css";
import { Alert, Spinner } from "react-bootstrap";
import styled from "styled-components";

function normalizarProducto(producto) {
  return {
    ...producto,
    precio: Number(producto.precio),
    stock: Number(producto.stock),
  };
}

export default function Gestion() {

  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoPendienteEliminar, setProductoPendienteEliminar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerProductos = async () => {
    setCargando(true);
    setError("");

    if (!firebaseReady || !db) {
      setProductos([]);
      setError("Firebase no está configurado correctamente");
      setCargando(false);
      return;
    }

    try {
      const productosRef = collection(db, "productos");
      const snapshot = await getDocs(productosRef);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(lista);
    } catch (err) {
      setError("No se pudieron cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const solicitarEliminacion = (producto) => {
    setProductoPendienteEliminar(producto);
  };

  const confirmarEliminacion = async () => {
    if (!productoPendienteEliminar) return;

    if (!firebaseReady || !db) {
      setError("Firebase no está configurado correctamente");
      setProductoPendienteEliminar(null);
      return;
    }

    try {
      const ref = doc(db, "productos", productoPendienteEliminar.id);
      await deleteDoc(ref);
      setProductos((actual) => actual.filter((p) => p.id !== productoPendienteEliminar.id));
    } catch (err) {
      setError("No se pudo eliminar el producto");
    } finally {
      setProductoPendienteEliminar(null);
    }
  };

  const editarProducto = (producto) => {
    setProductoAEditar(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
  };

  const guardarProducto = async (productoFinal, productoOriginal) => {
    if (!firebaseReady || !db) {
      setError("Firebase no está configurado correctamente");
      return;
    }

    const productoNormalizado = normalizarProducto(productoFinal);

    if (productoOriginal) {
      const ref = doc(db, "productos", productoOriginal.id);
      await updateDoc(ref, productoNormalizado);
      setProductos((actual) =>
        actual.map((producto) =>
          producto.id === productoOriginal.id
            ? { ...producto, ...productoNormalizado }
            : producto
        )
      );
    } else {
      const ref = await addDoc(collection(db, "productos"), productoNormalizado);
      setProductos((actual) => [...actual, { ...productoNormalizado, id: ref.id }]);
    }
  };

  const cancelarEliminacion = () => {
    setProductoPendienteEliminar(null);
  };

  return (
    <Panel>
      <h2>Gestión de Productos</h2>

      <FormularioContainer
        productoAEditar={productoAEditar}
        cancelarEdicion={cancelarEdicion}
        onGuardarProducto={guardarProducto}
      />

      <SectionTitle>Lista de Productos</SectionTitle>

      {cargando && (
        <LoadingWrap>
          <Spinner animation="border" />
        </LoadingWrap>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <ul className={styles.lista}>
        {productos.map(prod => (
          <li key={prod.id} className={styles.item}>
            <span>{prod.nombre} - ${prod.precio}</span>

            <div className={styles.botones}>
              <button onClick={() => editarProducto(prod)}>Editar</button>
              <button onClick={() => solicitarEliminacion(prod)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <GestionCupones />

      {productoPendienteEliminar && (
        <ConfirmBox>
          <p>
            ¿Seguro que deseas eliminar "{productoPendienteEliminar.nombre}"?
          </p>
          <div className="actions">
            <button type="button" className="secondary" onClick={cancelarEliminacion}>
              Cancelar
            </button>
            <button type="button" className="primary danger" onClick={confirmarEliminacion}>
              Eliminar
            </button>
          </div>
        </ConfirmBox>
      )}
    </Panel>
  );
}

const Panel = styled.section`
  max-width: 42rem;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 251, 245, 0.96);
  border: 1px solid rgba(126, 88, 49, 0.16);
  box-shadow: 0 16px 40px rgba(100, 61, 22, 0.1);
`;

const SectionTitle = styled.h3`
  margin: 1.5rem 0 1rem;
  color: #4b2f1f;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const ConfirmBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 18px;
  background: rgba(255, 248, 240, 0.96);
  border: 1px solid rgba(126, 88, 49, 0.18);

  p {
    margin: 0 0 0.85rem;
    color: #4b2f1f;
    font-weight: 600;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .primary,
  .secondary {
    border: none;
    border-radius: 999px;
    padding: 0.75rem 1.1rem;
    font-weight: 700;
  }

  .primary {
    background: linear-gradient(135deg, #8a5a2b, #b56a2a);
    color: white;
  }

  .primary.danger {
    background: linear-gradient(135deg, #c74e36, #9f3122);
  }

  .secondary {
    background: #d9c7b6;
    color: #4b2f1f;
  }
`;
