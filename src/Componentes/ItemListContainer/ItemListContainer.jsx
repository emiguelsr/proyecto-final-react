import { useEffect, useState } from 'react';
import { pedirProductos } from '../../data/pedirProductos';
import { ItemList } from '../ItemList/ItemList'

export function ItemListContainer({ Mensaje }){

    const [productos, setProductos] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {pedirProductos().then((respuesta) => {
        setProductos(respuesta);
        setLoading(false);
    });
}, []);

if (loading){
    return <p>Cargando...</p>
}

    return(
        <div>
            <h1>{Mensaje}</h1>
            <ItemList productos={productos}/>
        </div>
    );
}