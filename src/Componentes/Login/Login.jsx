import { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className={styles.login}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
