import { useState, useEffect } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";

export function FormularioContainer({
  productoAEditar,
  cancelarEdicion,
  onGuardarProducto
}) {

  const estadoInicial = {
    nombre: "",
    precio: "",
    stock: "",
    urlImagen: ""
  };

  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicial);
    }
  }, [productoAEditar]);

  const manejarCambio = (e) => {
    setDatosForm({
      ...datosForm,
      [e.target.name]: e.target.value
    });
  };

  const manejarCambioImagen = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const convertirArchivoADataURL = (archivo) =>
    new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.onload = () => resolve(lector.result);
      lector.onerror = () => reject(new Error("No se pudo leer la imagen"));
      lector.readAsDataURL(archivo);
    });

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!datosForm.nombre.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

    if (Number(datosForm.precio) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    let urlImagen = datosForm.urlImagen;

    if (imagenFile) {
      const formData = new FormData();
      formData.append("image", imagenFile);

      const apikey = import.meta.env.VITE_IMGBB_API_KEY;

      if (!apikey) {
        urlImagen = await convertirArchivoADataURL(imagenFile);
      } else {
        try {
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${apikey}`, {
            method: "POST",
            body: formData
          });

          if (res.ok) {
            const data = await res.json();

            if (data.success) {
              urlImagen = data.data.display_url || data.data.url;
            } else {
              urlImagen = await convertirArchivoADataURL(imagenFile);
            }
          } else {
            urlImagen = await convertirArchivoADataURL(imagenFile);
          }
        } catch {
          urlImagen = await convertirArchivoADataURL(imagenFile);
        }
      }
    }

    const productoFinal = {
      nombre: datosForm.nombre,
      precio: Number(datosForm.precio),
      stock: Number(datosForm.stock),
      urlImagen
    };

    try {
      await onGuardarProducto(productoFinal, productoAEditar);

      alert(productoAEditar ? "Producto actualizado con éxito" : "Producto creado con éxito");
      cancelarEdicion();

    } catch (error) {
      alert("Error al guardar el producto");
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      modoEdicion={!!productoAEditar}
      cancelarEdicion={cancelarEdicion}
    />
  );
}
