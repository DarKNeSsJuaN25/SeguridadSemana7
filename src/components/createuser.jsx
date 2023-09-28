import React, { useState } from "react";
import { Link } from "wouter"; // Importa Link desde react-router-dom

const CrearUsuario = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [token, setToken] = useState(""); // Estado para almacenar el token
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar el mensaje

  const enviarNuevoUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: nuevoUsuario,
          password: nuevoPassword,
        }),
      });

      if (!response.ok) {
        console.log("Error HTTP al crear el usuario");
      } else {
        console.log("Usuario creado con éxito");
        const data = await response.json();
        console.log(data);
        // Actualiza el estado del token y muestra el mensaje
        setToken(data.token);
        setMensaje("Usuario creado con éxito.");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div>
      <h3>Crear Nuevo Usuario</h3>
      <form onSubmit={enviarNuevoUsuario}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={nuevoUsuario}
            onChange={(e) => setNuevoUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={nuevoPassword}
            onChange={(e) => setNuevoPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Crear Usuario</button>
        </div>
      </form>

      {/* Muestra el mensaje y el enlace al componente "Menu" */}
      {mensaje && (
        <div>
          <p>{mensaje}</p>
          <p>Token : {token}</p>
          <p>ES TU IDENTIFICADOR PARA ACCEDER A LA BASE DE DATOS. GUARDALO.</p>
          <Link to="/menu">Ir al Menú</Link>
        </div>
      )}
    </div>
  );
};

export default CrearUsuario;
