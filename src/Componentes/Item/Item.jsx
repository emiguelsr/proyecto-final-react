import { useState } from "react";
import styles from './Item.module.css'

export function Item({ nombre, precio, stock }){
    
    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        if ( cantidad < stock ) setCantidad(cantidad + 1);
    };

    const decrementar = () => {
        if ( cantidad > 1 ) setCantidad(cantidad - 1)
    };

    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito`);    
    };

    return(
        <div className={styles.div1}>
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>

            <div className={styles.div2}>
                <button onClick={decrementar}>-</button>
                <span>{cantidad}</span>
                <button onClick={incrementar}>+</button>
            </div>

            <button onClick={agregarAlCarrito}>Agregar al carrito</button>
        </div>
    );
}