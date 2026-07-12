import { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Registro.module.css";

export default function Registro() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      alert("Usuario registrado");
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className={styles.registro}>
      <h2>Crear cuenta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
