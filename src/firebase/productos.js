import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, firebaseReady } from "./config";
import { productos as productosBase } from "../data/productos";

export async function obtenerProductos() {
  if (!firebaseReady || !db) {
    return Promise.resolve(productosBase);
  }

  try {
    const productosRef = collection(db, "productos");
    const snapshot = await getDocs(productosRef);
    const productosFirestore = snapshot.docs.map((productoDoc) => ({
      id: productoDoc.id,
      ...productoDoc.data(),
    }));

    const productosExistentes = new Set(productosFirestore.map((producto) => producto.id));
    const productosFaltantes = productosBase.filter((producto) => !productosExistentes.has(producto.id));

    if (productosFaltantes.length > 0) {
      await Promise.all(
        productosFaltantes.map((producto) =>
          setDoc(doc(productosRef, producto.id), producto)
        )
      );
    }

    const mapaProductos = new Map();

    productosBase.forEach((producto) => {
      mapaProductos.set(producto.id, producto);
    });

    productosFirestore.forEach((producto) => {
      mapaProductos.set(producto.id, producto);
    });

    return Array.from(mapaProductos.values());
  } catch {
    return Promise.resolve(productosBase);
  }
}
