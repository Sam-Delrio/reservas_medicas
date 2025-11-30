import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const ok = await login(email.trim(), password);
      setLoading(false);

      if (ok) {
        navigate("/panel");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Login submit error:", err);
      setLoading(false);
      setError("Error de conexión");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card glass">
        <div className="login-header">
          <div className="avatar">HC</div>
          <div>
            <h2>Hospital Curita</h2>
            <p>Inicia sesión para continuar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <div style={{ color: "#ffb4b4", fontSize: 13 }}>{error}</div>}

          <button type="submit" className="btn-apple" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
