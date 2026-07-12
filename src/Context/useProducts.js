import { useContext } from "react";
import * as productContext from "./ProductContext.jsx";

export function useProducts() {
  return useContext(productContext.ProductContext);
}