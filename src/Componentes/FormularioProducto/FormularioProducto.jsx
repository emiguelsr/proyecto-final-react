export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion,
  cancelarEdicion
}) {

  return (
    <form className="container mt-4" onSubmit={manejarEnvio}>
      <h3 className="mb-3">
        {modoEdicion ? "Editar producto" : "Agregar producto"}
      </h3>

      <input
        type="text"
        className="form-control mb-3"
        name="nombre"
        placeholder="Nombre"
        value={datosForm.nombre}
        onChange={manejarCambio}
      />

      <input
        type="number"
        className="form-control mb-3"
        name="precio"
        placeholder="Precio"
        value={datosForm.precio}
        onChange={manejarCambio}
      />

      <input
        type="number"
        className="form-control mb-3"
        name="stock"
        placeholder="Stock"
        value={datosForm.stock}
        onChange={manejarCambio}
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={manejarCambioImagen}
      />

      {modoEdicion && datosForm.urlImagen && (
        <div className="mb-3">
          <p>Imagen actual:</p>
          <img src={datosForm.urlImagen} alt="Actual" width="120" />
        </div>
      )}

      <button className="btn btn-primary" type="submit">
        {modoEdicion ? "Actualizar" : "Guardar"}
      </button>

      {modoEdicion && (
        <button
          className="btn btn-secondary ms-3"
          type="button"
          onClick={cancelarEdicion}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
