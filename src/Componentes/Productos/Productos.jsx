import { useState, useMemo } from "react";
import * as productHooks from "../../Context/useProducts.js";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import * as ItemModule from "../Item/Item.jsx";
import * as SearchBarModule from "../SearchBar/SearchBar.jsx";
import * as PaginadorModule from "../Paginador/Paginador.jsx";
import { Helmet } from "react-helmet";

export default function Productos() {

  const { productos, loading } = productHooks.useProducts();
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const PRODUCTOS_POR_PAGINA = 6;

  const productosFiltrados = useMemo(() => {
    return productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [productos, busqueda]);

  const productosPagina = useMemo(() => {
    const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
    return productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);
  }, [productosFiltrados, pagina]);

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

  return (
    <section className="catalog-page">

      <Helmet>
        <title>Productos | Mi Tienda</title>
        <meta name="description" content="Catálogo de productos responsivo" />
      </Helmet>

      <h2 className="catalog-title">Nuestros Productos</h2>
      <p className="catalog-lead">Inspirados en la fiambrería artesanal, con una presentación clara, cálida y fácil de explorar.</p>

      <SearchBarModule.default busqueda={busqueda} setBusqueda={setBusqueda} />

      {productosFiltrados.length === 0 && (
        <Alert className="catalog-alert" variant="warning">No se encontraron productos</Alert>
      )}

      <Row className="catalog-grid">
        {productosPagina.map(prod => (
          <Col xs={12} sm={6} lg={4} key={prod.id} className="mb-4">
            <ItemModule.default {...prod} />
          </Col>
        ))}
      </Row>

      <div className="catalog-pagination">
        <PaginadorModule.default
        total={productosFiltrados.length}
        pagina={pagina}
        setPagina={setPagina}
        porPagina={PRODUCTOS_POR_PAGINA}
        />
      </div>
    </section>
  );
}