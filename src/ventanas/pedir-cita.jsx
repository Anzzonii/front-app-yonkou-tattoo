import { useEffect, useState } from "react"
import { useAppContext } from "../context/appProvider"
import { jwtDecode } from "jwt-decode"

export default function AppointmentPage() {
  const { tatuadores } = useAppContext()
  
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  const [preview, setPreview] = useState(null)

  useEffect(() => {
      
      const cogerUsuario = async (user) => {
        const response = await fetch(`http://localhost:8080/api/perfiles-usuario/${user.uid}`)
        const data = await response.json()
        setUsuarioActual(data)
      }
  
      // OBTENER EL USUARIO ACTUAL
      const token = localStorage.getItem("token")
      if(token){
        const user = jwtDecode(token)
        cogerUsuario(user)
      }
    }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Cita solicitada correctamente")
  }

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Solicitar Cita</h1>

      <form onSubmit={handleSubmit} className="appointment-form">

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
            <label htmlFor="artist" className="appointment-label">
              Artista
            </label>
            <select id="artist" className="appointment-select">
              <option value="">Selecciona un artista</option>
                {tatuadores.map( (tatuador) => (   
                  <option key={tatuador.id} value={tatuador.nombre}>{tatuador.nombre}</option>

                ))} 
            </select>
          </div>
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


              {/* IMAGEN */}
        <div className="appointment-form-group">
          <label htmlFor="imagen" className="appointment-label">
            Imagen de referencia
          </label>
          
          <input id="reference" 
          type="file" 
          accept="image/*" 
          className="appointment-input file:py-2 file:px-4 file:border file:border-gray-300
                      file:rounded-lg file:bg-gray-600 file:text-white file:font-semibold
                      file:cursor-pointer hover:file:bg-gray-700" 
          onChange={handleFileChange} 
          required/>

          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Vista previa"
                className="max-w-xs rounded border"
              />
            </div>
          )}
        </div>


        <button type="submit" className="upload-submit-button">
          Solicitar Cita
        </button>
      </form>
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