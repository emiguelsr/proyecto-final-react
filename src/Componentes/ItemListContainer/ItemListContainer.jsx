import * as productHooks from "../../Context/useProducts.js";
import { ItemList } from "../ItemList/ItemList.jsx";

export function ItemListContainer({ Mensaje }) {

  const { productos, loading, error } = productHooks.useProducts();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div>
      <h1>{Mensaje}</h1>
      <ItemList productos={productos} />
    </div>
  );
}
