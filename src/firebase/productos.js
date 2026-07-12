import { productos } from "../data/productos";

export async function obtenerProductos() {
  return Promise.resolve(productos);
}
