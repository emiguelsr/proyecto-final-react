import { useParams } from "react-router-dom";
import * as productHooks from "../../Context/useProducts.js";
import * as cartHooks from "../../Context/useCart.js";
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaCartPlus } from "react-icons/fa";
import { useMemo } from "react";

export default function ProductoDetalle() {

  const { id } = useParams();
  const { productos, loading } = productHooks.useProducts();
  const { agregarProducto } = cartHooks.useCart();

  const producto = useMemo(() => {
    return productos.find(p => p.id === id);
  }, [productos, id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (!producto) return <p>Producto no encontrado</p>;

  const agregar = () => {
    agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  };

  return (
    <div className="container mt-4">

      <Helmet>
        <title>{producto.nombre} | Mi Tienda</title>
        <meta name="description" content={`Detalle del producto ${producto.nombre}`} />
      </Helmet>

      <h2>{producto.nombre}</h2>

      {producto.urlImagen && (
        <img
          src={producto.urlImagen}
          alt={producto.nombre}
          className="img-fluid mb-3"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      )}

      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>

      <button className="btn btn-primary" onClick={agregar}>
        <FaCartPlus className="me-2" />
        Agregar al carrito
      </button>
    </div>
  );
}
