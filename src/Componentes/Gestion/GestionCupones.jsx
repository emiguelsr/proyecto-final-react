import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { Alert, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { db, firebaseReady } from "../../firebase/config";
import styles from "./Gestion.module.css";

export default function GestionCupones() {
  const [codigo, setCodigo] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cuponesRef = db ? collection(db, "cupones") : null;

  const obtenerCupones = async () => {
    setCargando(true);
    setError("");

    if (!firebaseReady || !db) {
      setCupones([]);
      setError("Firebase no está configurado correctamente");
      setCargando(false);
      return;
    }

    if (!cuponesRef) {
      setCupones([]);
      setError("Firebase no está configurado correctamente");
      setCargando(false);
      return;
    }

    try {
      const snapshot = await getDocs(cuponesRef);
      const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCupones(lista);
    } catch {
      setError("No se pudieron cargar los cupones");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const crearCupon = async (e) => {
    e.preventDefault();

    const codigoLimpio = codigo.trim();
    if (!codigoLimpio || !porcentaje) return;

    if (!firebaseReady || !db) {
      setError("Firebase no está configurado correctamente");
      return;
    }

    if (!cuponesRef) return;

    try {
      await addDoc(cuponesRef, {
        codigo: codigoLimpio,
        porcentaje: Number(porcentaje),
      });

      setCodigo("");
      setPorcentaje("");
      obtenerCupones();
    } catch {
      setError("No se pudo crear el cupón");
    }
  };

  const eliminarCupon = async (id) => {
    if (!firebaseReady || !db) {
      setError("Firebase no está configurado correctamente");
      return;
    }

    try {
      await deleteDoc(doc(db, "cupones", id));
      obtenerCupones();
    } catch {
      setError("No se pudo eliminar el cupón");
    }
  };

  return (
    <Panel>
      <h3>Gestión de Cupones</h3>

      <Form onSubmit={crearCupon}>
        <Input
          type="text"
          placeholder="Código del cupón"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Porcentaje"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
        />

        <SubmitButton type="submit">Crear cupón</SubmitButton>
      </Form>

      {cargando && (
        <LoadingWrap>
          <Spinner animation="border" />
        </LoadingWrap>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <SectionTitle>Listado de Cupones</SectionTitle>

      <ul className={styles.lista}>
        {cupones.map((cupon) => (
          <li key={cupon.id} className={styles.item}>
            <span>
              <strong>{cupon.codigo}</strong> - {cupon.porcentaje}%
            </span>

            <div className={styles.botones}>
              <button type="button" onClick={() => eliminarCupon(cupon.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!cargando && cupones.length === 0 && !error && (
        <EmptyState>No hay cupones cargados todavía.</EmptyState>
      )}
    </Panel>
  );
}

const Panel = styled.section`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 251, 245, 0.96);
  border: 1px solid rgba(126, 88, 49, 0.16);
  box-shadow: 0 16px 40px rgba(100, 61, 22, 0.1);

  h3 {
    margin: 0;
    color: #4b2f1f;
  }
`;

const SectionTitle = styled.h4`
  margin: 1.25rem 0 0.75rem;
  color: #4b2f1f;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(126, 88, 49, 0.2);
  border-radius: 14px;
  padding: 0.8rem 0.95rem;
  background: white;
  color: #4b2f1f;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.8rem 1.1rem;
  background: linear-gradient(135deg, #8a5a2b, #b56a2a);
  color: white;
  font-weight: 700;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const EmptyState = styled.p`
  margin: 1rem 0 0;
  color: #6d5142;
`;