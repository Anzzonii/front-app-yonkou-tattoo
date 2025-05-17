import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function AppointmentPage() {
  const [date, setDate] = useState(null)
  const [diseno, setDiseno] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const fetchDesign = async () => {
        console.log(id)
      try {
        const res = await fetch(`http://localhost:8080/api/tatuajes/${id}`);
        const data = await res.json()
        console.log(data);
        setDiseno(data)
      } catch (error) {
        console.error("Error al cargar el diseño:", error)
      }
    }

    if (id) {
      fetchDesign()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Cita solicitada correctamente")
  }

  return (
    <div className="appointment-container">
        {diseno && (
        <>
            <h1 className="appointment-title">Reservar diseño: {diseno.titulo}</h1>

      
        
            <form onSubmit={handleSubmit} className="appointment-form">
                {/* Formulario original intacto */}
                <div className="appointment-grid">
                <div className="appointment-form-group">
                    <label htmlFor="name" className="appointment-label">Nombre</label>
                    <input id="name" className="appointment-input" required />
                </div>
                <div className="appointment-form-group">
                    <label htmlFor="email" className="appointment-label">Email</label>
                    <input id="email" type="email" className="appointment-input" required />
                </div>
                </div>

                <div className="appointment-grid">
                <div className="appointment-form-group">
                    <label htmlFor="phone" className="appointment-label">Teléfono</label>
                    <input id="phone" type="tel" className="appointment-input" required />
                </div>
                <div className="appointment-form-group">
                    {/* Input del tatuador que realizará el tatuaje solo lectura, es el mismo que hace diseño */}
                    <label htmlFor="artist" className="appointment-label">Tatuador <span className="text-xs text-gray-500 ml-2">(Los diseños los hace el responsable del mismo)</span></label>
                    <input type="text" id="artista" className="appointment-input" value={diseno.tatuador.nombre || ""} readOnly="readonly"/>
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
                </div>
                <div className="flex justify-center items-center">
                    <div className="bg-white p-4 rounded-xl shadow-md border w-fit">
                        <img
                        src={`http://localhost:8080/api/imagenes/ver/${diseno.imagen_id}`}
                        alt={diseno.titulo}
                        className="rounded-lg max-w-xs object-contain"
                        />
                        <p className="text-center text-sm text-gray-600 mt-2">{diseno.titulo}</p>
                    </div>
                </div>
                <div className="appointment-form-group">
                <label htmlFor="description" className="appointment-label">Detalles/Cambios para sugerir</label>
                <textarea
                    id="description"
                    placeholder="Describe cualquier cambio o detalle que quieras quitar/añadir o reemplazar en el tatuaje"
                    className="appointment-textarea"
                />
                </div>

                <button type="submit" className="appointment-submit">
                Solicitar Reserva
                </button>
            </form>
        </>
      )}
    </div>
  )
}
