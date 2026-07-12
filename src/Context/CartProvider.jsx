import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {

  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
      const actualizado = carrito.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + producto.cantidad }
          : p
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const vaciarCarrito = () => setCarrito([]);

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(p => p.id !== id));
  };

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, vaciarCarrito, eliminarProducto }}>
      {children}
    </CartContext.Provider>
  );
}
