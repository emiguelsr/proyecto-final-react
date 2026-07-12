import styles from './NavBar.module.css'

function NavBar(){

    return( 
            <nav className={styles.nav}>
                <ul className={styles.lista}>
                    <li className={styles.item}>
                        <a href="#">Inicio</a>
                    </li>
                    <li className={styles.item}>
                        <a href="#">Productos</a>
                    </li>
                    <li className={styles.item}>
                        <a href="#">Carrito</a>
                    </li>
                    <li className={styles.item}>
                        <a href="#">Perfil</a>
                    </li>                    
                </ul>
            </nav>
    );
}

export default NavBar;