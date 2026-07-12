import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./Componentes/Layout/Layout";
import ProtectedRoute from "./Componentes/ProtectedRoute/ProtectedRoute";
import Spinner from "react-bootstrap/Spinner";

const Inicio = lazy(() => import("./Componentes/Inicio/Inicio"));
const Productos = lazy(() => import("./Componentes/Productos/Productos"));
const Carrito = lazy(() => import("./Componentes/Carrito/Carrito"));
const Gestion = lazy(() => import("./Componentes/Gestion/Gestion"));
const ProductoDetalle = lazy(() => import("./Componentes/ProductoDetalle/ProductoDetalle"));
const Login = lazy(() => import("./Componentes/Login/Login"));
const Registro = lazy(() => import("./Componentes/Registro/Registro"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/gestion"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <Gestion />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
