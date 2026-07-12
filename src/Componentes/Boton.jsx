import styles from './Boton.module.css'

function Boton( {texto} ){
    return(
        <button className={styles.Boton}>{texto}</button>       
    )
}

export default Boton;