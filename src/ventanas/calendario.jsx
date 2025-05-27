import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { NavLink } from "react-router-dom"
// Datos de ejemplo para citas del día seleccionado
const dailyAppointments = [
  { id: 1, date: new Date(2025, 3, 25), client: "Ana García", artist: "Carlos", time: "10:00" },
  { id: 2, date: new Date(2025, 3, 26), client: "Pedro López", artist: "María", time: "14:30" },
  { id: 3, date: new Date(2025, 3, 28), client: "Laura Martínez", artist: "Juan", time: "16:00" },
]

export default function CalendarPage() {

  // Datos de ejemplo para todas las citas del usuario
const [usuarioActual, setUsuarioActual] = useState(null)
const [citasUsuario, setCitasUsuario] = useState([]);


  useEffect(() => {

      // OBTENER EL USUARIO ACTUAL
      const token = localStorage.getItem("token")
      if(token){
          const user = jwtDecode(token)
          setUsuarioActual(user)
      }
      }, [])

  useEffect(() => {
    const fetchCitas = async () => {
      try{
        const res = await fetch(`http://localhost:8080/api/citas/usuario/${usuarioActual.uid}`)
        const data = await res.json();
        setCitasUsuario(data)
        console.log(data)
      }catch(error){
        console.error("Error fetching citas:", error)
      }
    }

    if(usuarioActual){
      fetchCitas();
    }
  }, [usuarioActual])

  // Función para formatear la fecha
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Función para formatear la fecha corta
  const formatShortDate = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Función para obtener el estado de la cita
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmada":
        return "appointment-status-confirmed"
      case "pendiente":
        return "appointment-status-pending"
      default:
        return "appointment-status-default"
    }
  }

  return (
    <div className="calendar-container">
      {/* Contenedor izquierdo - Todas las citas del usuario */}
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Mis Citas</h2>
        </div>
        <div className="appointments-list">
          {citasUsuario.map((cita) => (
            <div key={cita.id} className="appointment-item">
              <div className="appointment-image">
                <img
                  src={cita.imagen || "/placeholder.svg"}
                  alt="Diseño del tatuaje"
                  className="appointment-img"
                />
              </div>
              <div className="appointment-details">
                <div className="appointment-main-info">
                  <span className={`appointment-status ${getStatusColor(cita.estado)}`}>
                    {cita.estado}
                  </span>
                </div>
                <div className="appointment-meta">
                  <div className="appointment-date-time">
                    <span className="appointment-date">{
                                new Date(`${cita.fecha}T${cita.hora}`).toLocaleString("es-ES", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    })
                                }</span>
                  </div>
                  <div className="appointment-artist">
                    <span>Artista: {cita.tatuador.nombre}</span>
                  </div>
                </div>
              </div>
              <NavLink to={`/citas/${cita.id}`} className="appointment-actions">
                <button className="appointment-action-btn appointment-edit">
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
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor derecho - Citas del día seleccionado */}
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Calendario</h2>
        </div>
        <div className="calendar-component">
          <input
            type="date"
            className="appointment-input"
          />
        </div>

        <div className="calendar-day-appointments">
          <h3 className="calendar-day-title">
            Seleciona una fecha
          </h3>
          <div className="calendar-day-content">
              <p className="calendar-empty">No hay citas para este día</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
