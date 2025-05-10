import { useState } from "react"

export default function AppointmentPage() {
  const [date, setDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Cita solicitada correctamente")
  }

  const formatDate = (date) => {
    if (!date) return null
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Solicitar Cita</h1>

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="appointment-grid">
          <div className="appointment-form-group">
            <label htmlFor="name" className="appointment-label">
              Nombre
            </label>
            <input id="name" className="appointment-input" required />
          </div>

          <div className="appointment-form-group">
            <label htmlFor="email" className="appointment-label">
              Email
            </label>
            <input id="email" type="email" className="appointment-input" required />
          </div>
        </div>

        <div className="appointment-grid">
          <div className="appointment-form-group">
            <label htmlFor="phone" className="appointment-label">
              Teléfono
            </label>
            <input id="phone" type="tel" className="appointment-input" required />
          </div>

          <div className="appointment-form-group">
            <label htmlFor="artist" className="appointment-label">
              Artista
            </label>
            <select id="artist" className="appointment-select">
              <option value="">Selecciona un artista</option>
              <option value="carlos">Carlos</option>
              <option value="maria">María</option>
              <option value="juan">Juan</option>
            </select>
          </div>
        </div>

        <div className="appointment-form-group">
          <label htmlFor="date" className="appointment-label">
            Fecha deseada
          </label>
          <button type="button" className="appointment-date-button" onClick={() => setShowCalendar(!showCalendar)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              {/*Icono de calendario para la fecha*/ }
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="appointment-date-button-text">{date ? formatDate(date) : "Selecciona una fecha"}</span>
          </button>
          {showCalendar && (
            <div className="calendar-popup">
              {/* Aquí iría un componente de calendario */}
              <div className="calendar-simple">
                <input
                  type="date"
                  onChange={(e) => {
                    setDate(new Date(e.target.value))
                    setShowCalendar(false)
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="appointment-form-group">
          <label htmlFor="description" className="appointment-label">
            Descripción del tatuaje
          </label>
          <textarea
            id="description"
            placeholder="Describe el tatuaje que deseas, tamaño, ubicación, etc."
            className="appointment-textarea"
            required
          />
        </div>

        <div className="appointment-form-group">
          <label htmlFor="reference" className="appointment-label">
            Imagen de referencia (opcional)
          </label>
          <input id="reference" type="file" accept="image/*" className="appointment-input" />
        </div>

        <button type="submit" className="appointment-submit">
          Solicitar Cita
        </button>
      </form>
    </div>
  )
}
