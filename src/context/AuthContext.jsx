import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.get("/users", {
        params: { email, password }
      });

      if (res.data.length === 0) {
        return { success: false, message: "Credenciales incorrectas" };
      }

      const u = res.data[0];
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));

      return { success: true };

    } catch (error) {
      console.error("Login error", error);
      return { success: false, message: "Error en el servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
