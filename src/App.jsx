import './App.css'
import Layout from './Componentes/Layout/Layout'
import { ItemListContainer } from './Componentes/ItemListContainer/ItemListContainer';

function App() {

  return (
    <Layout>
      <h1>Bienvenidos a mi página</h1>
      <p>Este es el contenido principal</p>
      <ItemListContainer Mensaje="Nuestros productos destacados"/>
    </Layout>
  );
}

export default App;
