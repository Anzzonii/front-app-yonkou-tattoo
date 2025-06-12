import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

//Ventana con formulario para la reserva de las citas
export default function Reserva() {
  
  const [usuarioActual, setUsuarioActual] = useState(null)

  const token = localStorage.getItem("token")

  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [diseno, setDiseno] = useState(null)

  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    
    const cogerUsuario = async (user) => {
      const response = await fetch(`http://localhost:8080/api/perfiles-usuario/${user.uid}`, {
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}` 
        },
      })
      const data = await response.json()
      setUsuarioActual(data)
    }

    // OBTENER EL USUARIO ACTUAL
    if(token){
      const user = jwtDecode(token)
      cogerUsuario(user)
    }
    
    const fetchDesign = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tatuajes/${id}`, {
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}` 
          },
        });
        const data = await res.json()
        setDiseno(data)
      } catch (error) {
        console.error("Error al cargar el diseño:", error)
      }
    }

    if (id) {
      fetchDesign()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const descripcion = document.getElementById("description").value;

    const citaPayload = {
      usuario: usuarioActual,
      tatuador: diseno.tatuador,
      fecha: date.toISOString().split("T")[0],
      hora: time,
      descripcion: descripcion,
      imagen: diseno.imagen,
      estado: "pendiente"
    } 
    console.log(citaPayload)
    try {
      const res = await fetch("http://localhost:8080/api/citas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(citaPayload)
      });

      if (!res.ok) {
        throw new Error("Error al registrar la cita");
      }

      alert("Cita solicitada correctamente");
      navigate("/citas")
    } catch (error) {
      console.error("Error al enviar la cita:", error);
      alert("Hubo un error al solicitar la cita.");
    }
  }

  return (
    <div className="appointment-container">
        {diseno && (
        <>
            <h1 className="appointment-title">Reservar diseño: {diseno.titulo}</h1>

      
        
            <form onSubmit={handleSubmit} className="appointment-form">
                <div className="flex justify-center items-center">
                    <div className="bg-white p-4 rounded-xl shadow-md border w-fit">
                        <img
                        src={`${diseno.imagen}`}
                        alt={diseno.titulo}
                        className="rounded-lg max-w-xs object-contain"
                        />
                        <p className="text-center text-sm text-gray-600 mt-2">{diseno.titulo}</p>
                    </div>
                </div>

                <div className="appointment-grid">
                  <div className="appointment-form-group">
                      <label htmlFor="date" className="appointment-label">Fecha deseada</label>
                      <input
                      type="date"
                      value={date ? date.toISOString().split("T")[0] : ""}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      className="appointment-input"
                      required
                      />
                  </div>
                  <div className="appointment-form-group">
                    <label htmlFor="time" className="appointment-label">Hora deseada</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="appointment-input w-full"
                      required
                    >
                      <option value="">Selecciona una hora</option>
                      {generateTimeOptions("09:00", "21:00", 60).map((hour) => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="appointment-grid">
                  <div className="appointment-form-group">
                      <label htmlFor="artist" className="appointment-label">Tatuador <span className="text-xs text-gray-500 ml-2">(Los diseños los hace el responsable del mismo)</span></label>
                      <input type="text" id="artista" className="appointment-input" value={diseno.tatuador.nombre || ""} readOnly="readonly"/>
                  </div>
                </div>

                <div className="appointment-form-group">
                  <label htmlFor="description" className="appointment-label">Detalles/Cambios para sugerir</label>
                  <textarea
                      id="description"
                      placeholder="Describe cualquier cambio o detalle que quieras quitar, añadir o reemplazar en el tatuaje"
                      className="appointment-textarea"
                  />
                </div>

                <button type="submit" className="upload-submit-button">
                Solicitar Reserva
                </button>
            </form>
        </>
      )}
    </div>
  )
}

function generateTimeOptions(start, end, intervalMinutes) {
  const options = [];
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  while (current <= endTime) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");
    if (`${hours}:${minutes}` !== "14:00" && `${hours}:${minutes}` !== "15:00") {
      options.push(`${hours}:${minutes}`);
    }
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }

  return options;
}