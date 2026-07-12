import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { obtenerProductos } from "../firebase/productos";

export function ProductProvider({ children }) {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProductos()
      .then((res) => {
        setProductos(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ productos, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
