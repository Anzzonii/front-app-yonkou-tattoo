import { useEffect, useState } from "react"
import { auth } from "../firebase";

export function ConfigDialog({ open, onOpenChange }) {

  const [userData, setUserData] = useState({
    name: "Usuario",
    email: "usuario@ejemplo.com",
    phone: "123456789",
  })

  const cogerUsuario = async (user) => {
    const response = await fetch(`http://localhost:8080/api/perfiles-usuario/${user.uid}`)
    const data = await response.json()
    return data
    
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {

        //USUARIO COGIDO DE LA BASE DE DATOS PARA COGER DATOS SUYOS
        const userBD = await cogerUsuario(user)
        setUserData({
          id: userBD.id,
          name: userBD.nombre || "Sin nombre",
          email: user.email,
          phone: userBD.telefono || "No proporcionado",
        });
      } else {
        setUserData({
          name: "Usuario",
          email: "usuario@ejemplo.com",
          phone: "123456789",
        });
      }
  });

  return () => unsubscribe(); // limpia el listener al desmontar
  }, []);

  if (!open) return null

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userData.id)
      const response = await fetch(`http://localhost:8080/api/perfiles-usuario/editar/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.name,
          telefono: userData.phone,
        }),
      });

      if (response.ok) {
        alert("Configuración guardada correctamente");
        onOpenChange(false);
      } else {
        const errorData = await response.json();
        alert(`Error al guardar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      alert(`Error de red: ${error.message}`);
    }
  };


  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">Configuración de la cuenta</h2>
          <button className="dialog-close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="dialog-form-group">
            <label htmlFor="email" className="dialog-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="dialog-input"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              readOnly="readonly"
              style={{ backgroundColor: '#d3d3d3', color: '#444', cursor: 'not-allowed' }}
            />
          </div>
          <div className="dialog-form-group">
            <label htmlFor="name" className="dialog-label">
              Nombre
            </label>
            <input
              id="name"
              className="dialog-input"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="dialog-form-group">
            <label htmlFor="phone" className="dialog-label">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              className="dialog-input"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="dialog-button-group">
            <button type="submit" className="dialog-primary-button">
              Guardar Cambios
            </button>
            <button type="button" className="dialog-secondary-button" onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
