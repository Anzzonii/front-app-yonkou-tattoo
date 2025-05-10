import { useState } from "react"

// Datos de ejemplo para citas
const appointments = [
  { id: 1, date: new Date(2025, 3, 25), client: "Ana García", artist: "Carlos" },
  { id: 2, date: new Date(2025, 3, 26), client: "Pedro López", artist: "María" },
  { id: 3, date: new Date(2025, 3, 28), client: "Laura Martínez", artist: "Juan" },
]

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())

  // Función para obtener las citas del día seleccionado
  const getDayAppointments = (day) => {
    if (!day) return []

    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === day.getDate() &&
        appointment.date.getMonth() === day.getMonth() &&
        appointment.date.getFullYear() === day.getFullYear(),
    )
  }

  const dayAppointments = getDayAppointments(date)

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value))
  }

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Calendario</h2>
        </div>
        <div className="calendar-component">
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="appointment-input"
          />
        </div>
      </div>

      <div className="calendar-card">
        <div className="calendar-header">
          <h2 className="calendar-title">
            {date ? (
              <span>
                Citas para el {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </span>
            ) : (
              "Selecciona una fecha"
            )}
          </h2>
        </div>
        <div>
          {dayAppointments.length > 0 ? (
            <ul className="calendar-appointments">
              {dayAppointments.map((appointment) => (
                <li key={appointment.id} className="calendar-appointment">
                  <p className="calendar-client">{appointment.client}</p>
                  <p className="calendar-artist">Artista: {appointment.artist}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="calendar-empty">No hay citas para este día</p>
          )}
        </div>
      </div>
    </div>
  )
}
