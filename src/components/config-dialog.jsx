import { useState } from "react"

export function ConfigDialog({ open, onOpenChange }) {
  const [userData, setUserData] = useState({
    name: "Usuario",
    email: "usuario@ejemplo.com",
    phone: "123456789",
    notifications: true,
  })

  if (!open) return null

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar los cambios
    alert("Configuración guardada correctamente")
    onOpenChange(false)
  }

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
            <label htmlFor="name" className="dialog-label">
              Nombre completo
            </label>
            <input
              id="name"
              className="dialog-input"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
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
          <div className="dialog-switch-group">
            <label htmlFor="notifications" className="dialog-label">
              Notificaciones
            </label>
            <label className="dialog-switch">
              <input
                id="notifications"
                type="checkbox"
                checked={userData.notifications}
                onChange={(e) => handleChange("notifications", e.target.checked)}
              />
              <span className="dialog-slider"></span>
            </label>
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
