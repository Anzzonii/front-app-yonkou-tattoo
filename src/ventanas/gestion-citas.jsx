import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

//VENTAN APARA QUE LOS TATUADORES PUEDAN GESTIONAR LAS CITAS QUE HAY ACTUALMENTE EN LA APP
export default function GestionCitas() {

    const [citas, setCitas] = useState([])
    const [citasCompletadas, setCitasCompletadas] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch("http://localhost:8080/api/citas", {
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}` 
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCitas(data.filter(cita => cita.estado !== "Completada").reverse())
                setCitasCompletadas(data.filter(cita => cita.estado === "Completada").reverse())
            })
            .catch(() => console.error("Error cargando citas:", err))
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Gestión de Citas</h1>

            <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-md border border-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th className="px-6 py-3 text-left">Fecha y Hora</th>
                    <th className="px-6 py-3 text-left">Usuario</th>
                    <th className="px-6 py-3 text-left">Tatuador</th>
                    <th className="px-6 py-3 text-left">Estado</th>
                    <th className="px-6 py-3 text-left"></th>
                </tr>
                </thead>
                <tbody>
                    {citas.map((cita) => (
                        <tr className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{
                                new Date(`${cita.fecha}T${cita.hora}`).toLocaleString("es-ES", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    })
                                }
                            </td>
                            <td className="px-6 py-4">{cita.usuario.nombre}</td>
                            <td className="px-6 py-4">{cita.tatuador.nombre}</td>
                            <td className="px-6 py-4 capitalize">{cita.estado}</td>
                            <td className="px-6 py-4">
                                <NavLink to={`/citas/${cita.id}`}>
                                    <button className="dialog-close-button" >
                                    Ver
                                    </button>
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            </div>
            <br></br>
            <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800">Citas Completadas</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-md border border-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th className="px-6 py-3 text-left">Fecha y Hora</th>
                    <th className="px-6 py-3 text-left">Usuario</th>
                    <th className="px-6 py-3 text-left">Tatuador</th>
                    <th className="px-6 py-3 text-left">Estado</th>
                    <th className="px-6 py-3 text-left"></th>
                </tr>
                </thead>
                <tbody>
                    {citasCompletadas.map((cita) => (
                        <tr className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{
                                new Date(`${cita.fecha}T${cita.hora}`).toLocaleString("es-ES", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    })
                                }
                            </td>
                            <td className="px-6 py-4">{cita.usuario.nombre}</td>
                            <td className="px-6 py-4">{cita.tatuador.nombre}</td>
                            <td className="px-6 py-4 capitalize">{cita.estado}</td>
                            <td className="px-6 py-4">
                                <NavLink to={`/citas/${cita.id}`}>
                                    <button className="dialog-close-button" >
                                    Ver
                                    </button>
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            </div>
        </div>
    );

}