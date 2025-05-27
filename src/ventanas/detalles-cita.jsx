import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"


export default function DetallesCita(){
    const [usuarioActual, setUsuarioActual] = useState(null)

    const [cita, setCita] = useState(null)

    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {

    // OBTENER EL USUARIO ACTUAL
    const token = localStorage.getItem("token")
    if(token){
        const user = jwtDecode(token)
        setUsuarioActual(user)
    }
    
    const fetchCita = async () => {
        try {
        const res = await fetch(`http://localhost:8080/api/citas/${id}`);
        const data = await res.json()
        setCita(data)
        } catch (error) {
        console.error("Error al cargar el diseño:", error)
        }
    }

    fetchCita()
    
    }, [])

    const handleAceptar = async (e) => {
        e.preventDefault
        fetch("http://localhost:8080/api/citas/aceptar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCita: cita.id
            })
        }).then(res => {
            if (res.ok) {
                alert('Cita aceptada correctamente.');
            } else {
                alert('Error al rechazar la cita.');
            }
        })
    }

    const handleRechazar = async (e) => {
        e.preventDefault()
        const motivo = document.getElementById('motivoRechazo').value;
        
        fetch('http://localhost:8080/api/citas/rechazar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCita: cita.id,
                motivoRechazo: motivo
            })
        }).then(res => {
        if (res.ok) {
            alert('Cita rechazada y correo enviado.');
        } else {
            alert('Error al rechazar la cita.');
        }

        navigate("/gestionar-citas")
    });
    }

    return (
    <div className="appointment-container">
        {cita && (
        <>
        
            <form onSubmit={handleAceptar} className="appointment-form">
                {/* Formulario original intacto */}

                <h1 className="appointment-title">Datos del usuario</h1>
                <div className="appointment-grid">
                    <div className="appointment-form-group">
                        <label htmlFor="date" className="appointment-label">Usuario</label>
                        <input
                        type="text"
                        defaultValue={cita.usuario.nombre}
                        className="appointment-input"
                        readOnly
                        />
                    </div>
                    <div className="appointment-form-group">
                        <label htmlFor="time" className="appointment-label">Correo electrónico</label>
                        <input
                            type="text"
                            defaultValue={cita.usuario.email}
                            className="appointment-input"
                            readOnly
                            />
                    </div>
                </div>

                <div className="appointment-grid">
                    <div className="appointment-form-group">
                        <label htmlFor="time" className="appointment-label">Teléfono</label>
                        <input
                            type="text"
                            defaultValue={cita.usuario.telefono}
                            className="appointment-input"
                            readOnly
                            />
                    </div>
                </div> 

                <h1 className="appointment-title">Datos del tatuaje</h1>
                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="image" className="appointment-label">Imagen del diseño</label>
                    <div className="bg-white p-4 rounded-xl shadow-md border w-fit">
                        <img
                        src={`${cita.imagen}`}
                        className="rounded-lg max-w-xs object-contain"
                        />
                    </div>
                </div>

                <div className="appointment-grid">
                    <div className="appointment-form-group">
                        <label htmlFor="date" className="appointment-label">Fecha deseada</label>
                        <input
                        type="date"
                        defaultValue={cita.fecha}
                        className="appointment-input"
                        readOnly
                        />
                    </div>
                    <div className="appointment-form-group">
                    <label htmlFor="time" className="appointment-label">Hora deseada</label>
                    <input
                        type="text"
                        defaultValue={new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        })}
                        className="appointment-input"
                        readOnly
                        />
                    </div>
                </div>

                <div className="appointment-grid">
                    <div className="appointment-form-group">
                        {/* Input del tatuador que realizará el tatuaje solo lectura, es el mismo que hace diseño */}
                        <label htmlFor="artist" className="appointment-label">Tatuador <span className="text-xs text-gray-500 ml-2">(Los diseños los hace el responsable del mismo)</span></label>
                        <input type="text" id="artista" className="appointment-input" defaultValue={cita.tatuador.nombre || ""} readOnly="readonly"/>
                    </div>
                </div>

                <div className="appointment-form-group">
                    <label htmlFor="description" className="appointment-label">Detalles/Cambios para sugerir</label>
                    <textarea
                        id="description"
                        placeholder="Describe cualquier cambio o detalle que quieras quitar, añadir o reemplazar en el tatuaje"
                        className="appointment-textarea"
                        defaultValue={cita.descripcion || ""}
                        readOnly
                    />
                </div>
                
                <div type="submit" className="appointment-form-group">
                    <button className="upload-submit-button">
                        Aceptar
                    </button>   
                </div>

            </form>
                    <br></br>
            <form onSubmit={handleRechazar}>
                <div className="appointment-form-group">
                    <label htmlFor="motivoRechazo" className="appointment-label">Motivos rechazo del tatuaje</label>
                    <textarea
                        id="motivoRechazo"
                        placeholder="Especifica el motivo del rechazo de la solicitud para cita del tatuaje"
                        className="appointment-textarea"
                        required
                    />
                    <button className="upload-submit-button">
                        Rechazar
                    </button>
                </div>
            </form>
                    
                

            
        </>
        )}
    </div>
    )
}