import { productos } from "./productos";

export const pedirProductos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
           resolve(productos); 
        }, 2000);
    });
};

