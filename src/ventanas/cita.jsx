import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { Navigate, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

//CLASE PARA MOSTRAR LAS CITAS QUE HAY ACTUALMENTE
export default function Cita() {

const [usuarioActual, setUsuarioActual] = useState(null)
const [citasUsuario, setCitasUsuario] = useState([]);
const [citasCompletadas, setCitasCompletadas] = useState([]);

const token = localStorage.getItem("token")

const navigate = useNavigate();

  useEffect(() => {

      // OBTENER EL USUARIO ACTUAL
      const token = localStorage.getItem("token")
      if(token){
          const user = jwtDecode(token)
          setUsuarioActual(user)
      }else{
          navigate("/")
      }
      }, [])

  useEffect(() => {
    const fetchCitas = async () => {
      if(!usuarioActual.esTatuador){
        try{
          const res = await fetch(`http://localhost:8080/api/citas/usuario/${usuarioActual.uid}`, {
            headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}` 
            }
          })
          const data = await res.json();

          setCitasUsuario(data.filter(cita => cita.estado !== "Completada").reverse())
          setCitasCompletadas(data.filter(cita => cita.estado === "Completada").reverse())
          console.log(data)
        }catch(error){
          console.error("Error fetching citas:", error)
        }
      }else{
        try{
          const res = await fetch(`http://localhost:8080/api/citas/tatuador/${usuarioActual.uid}`, {
            headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}` 
            }
          })
          const data = await res.json();

          setCitasUsuario(data.filter(cita => cita.estado === "Confirmada").reverse())
          setCitasCompletadas(data.filter(cita => cita.estado === "Completada").reverse())
          console.log(data)
        }catch(error){
          console.error("Error fetching citas:", error)
        }
      }
    }

    if(usuarioActual){
      fetchCitas();
    }
  }, [usuarioActual])

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
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Proximas Citas</h2>
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
                  {cita.estado === "Aceptada" ? 
                  <>
                    <span>Pendiente de pago</span>
                  </>
                  :
                  <></>}
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
      
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Citas completadas</h2>
        </div>
        

        <div className="calendar-day-appointments">
          
          <div className="appointments-list">
          {citasCompletadas.map((cita) => (
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
      </div>
    </div>
  )
}
