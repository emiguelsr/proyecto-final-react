import { useCart } from "../../Context/useCart";

export default function Carrito() {

  const { carrito, eliminarProducto, vaciarCarrito } = useCart();

  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  if (carrito.length === 0) {
    return <p className="text-center mt-4">El carrito está vacío</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>

      {carrito.map(prod => (
        <div key={prod.id} className="card p-3 mb-3">
          <h3>{prod.nombre}</h3>
          <p>Cantidad: {prod.cantidad}</p>
          <p>Precio: ${prod.precio}</p>

          <button
            className="btn btn-danger"
            onClick={() => eliminarProducto(prod.id)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      <button className="btn btn-secondary mt-3" onClick={vaciarCarrito}>
        Vaciar carrito
      </button>
    </div>
  );
}
