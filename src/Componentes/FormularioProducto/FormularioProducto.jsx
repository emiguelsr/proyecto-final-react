import styled from "styled-components";

export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion,
  cancelarEdicion
}) {

  return (
    <Form onSubmit={manejarEnvio}>
      <h3>
        {modoEdicion ? "Editar producto" : "Agregar producto"}
      </h3>

      <input
        type="text"
        className="field"
        name="nombre"
        placeholder="Nombre"
        value={datosForm.nombre}
        onChange={manejarCambio}
      />

      <input
        type="text"
        inputMode="decimal"
        className="field"
        name="precio"
        placeholder="Precio"
        value={datosForm.precio}
        onChange={manejarCambio}
      />

      <input
        type="text"
        inputMode="numeric"
        className="field"
        name="stock"
        placeholder="Stock"
        value={datosForm.stock}
        onChange={manejarCambio}
      />

      <input
        type="file"
        className="field"
        onChange={manejarCambioImagen}
      />

      {modoEdicion && datosForm.urlImagen && (
        <Preview>
          <p>Imagen actual:</p>
          <img src={datosForm.urlImagen} alt="Actual" width="120" />
        </Preview>
      )}

      <div className="actions">
        <button className="primary" type="submit">
          {modoEdicion ? "Actualizar" : "Guardar"}
        </button>

        {modoEdicion && (
          <button
            className="secondary"
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1.25rem;
  border-radius: 20px;
  background: rgba(255, 248, 240, 0.9);
  border: 1px solid rgba(126, 88, 49, 0.14);

  h3 {
    margin: 0;
    color: #4b2f1f;
  }

  .field {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 14px;
    border: 1px solid rgba(126, 88, 49, 0.2);
    background: white;
    color: #4b2f1f;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .primary,
  .secondary {
    border: none;
    border-radius: 999px;
    padding: 0.75rem 1.1rem;
    font-weight: 700;
  }

  .primary {
    background: linear-gradient(135deg, #8a5a2b, #b56a2a);
    color: white;
  }

  .secondary {
    background: #d9c7b6;
    color: #4b2f1f;
  }
`;

const Preview = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.75);
  color: #6f5138;

  img {
    border-radius: 12px;
    object-fit: cover;
  }
`;
