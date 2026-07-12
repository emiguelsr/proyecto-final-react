import NavBar from './NavBar/NavBar';
import styles from './Header.module.css'

function Header(){

    return(
        <header className={styles.header}>
             <h1> Mi App React</h1>
             <NavBar/>
        </header>
    )

}

export default Header;