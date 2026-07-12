import { useState, useEffect } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import { db } from "../../firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export function FormularioContainer({
  productoAEditar,
  cancelarEdicion,
  refrescarLista
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

      const apikey = "TU_API_KEY_DE_IMGBB";

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apikey}`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!data.success) {
        alert("Error al subir imagen");
        return;
      }

      urlImagen = data.data.url;
    }

    const productoFinal = {
      nombre: datosForm.nombre,
      precio: Number(datosForm.precio),
      stock: Number(datosForm.stock),
      urlImagen
    };

    try {
      if (productoAEditar) {
        const ref = doc(db, "productos", productoAEditar.id);
        await updateDoc(ref, productoFinal);
        alert("Producto actualizado con éxito");
      } else {
        const ref = collection(db, "productos");
        await addDoc(ref, productoFinal);
        alert("Producto creado con éxito");
      }

      refrescarLista();
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
