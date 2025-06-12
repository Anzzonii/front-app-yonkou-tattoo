import { useEffect } from "react"
import { useState } from "react";

//VENTANA QUE MUESTRA A LSO ADMINISTRADORES TODOS LOS USUARIOS PUDIENDO HACER A ALGUNO TATUADOR O NO
export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const token = localStorage.getItem("token")

    const handleTatuador = async (usuario) => {
        const confirm = window.confirm("¿Estás seguro de que quieres convertir al usuario "+usuario.nombre+" en tatuador?")
        if(confirm){
            try {
                await fetch(`http://localhost:8080/api/perfiles-usuario/editarRol/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ esTatuador: true })
                });

                alert("Usuario actualizado como Tatuador");
                window.location.reload();
            } catch (error) {
                console.error("Error al cambiar a Tatuador:", error);
                alert("No se pudo cambiar el rol del usuario.");
            }
        }
    }

    const handleUsuario = async (usuario) => {
        const confirm = window.confirm("¿Estás seguro de que quieres revertir al usuario "+usuario.nombre+" a usuario normal?")
        if(confirm){
            try {
                await fetch(`http://localhost:8080/api/perfiles-usuario/editarRol/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ esTatuador: false })
                });

                alert("Usuario actualizado como Usuario normal");
                window.location.reload();
            } catch (error) {
                console.error("Error al cambiar a Tatuador:", error);
                alert("No se pudo cambiar el rol del usuario.");
            }
        }
    }

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/perfiles-usuario");
                const data = await response.json();
               setUsuarios(data);
            } catch (error) {
                console.error("Error fetching usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);


    return(
        <>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow-md border border-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th className="px-6 py-3 text-left">Uid</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Nombre</th>
                    <th className="px-6 py-3 text-left">Telefono</th>
                    <th className="px-6 py-3 text-left">Rol</th>
                    <th className="px-6 py-3 text-left">ACCIONES</th>
                </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                
                                {usuario.uid}
                            </td>
                            <td className="px-6 py-4">{usuario.email}</td>
                            <td className="px-6 py-4">{usuario.nombre}</td>
                            <td className="px-6 py-4">{usuario.telefono}</td>
                            <td className="px-6 py-4 capitalize">{usuario.esTatuador ? <>Tatuador</> : <>Usuario</>}</td>
                            <td className="px-6 py-4 flex gap-2">
                                {!usuario.esTatuador ?
                                
                                <button
                                    onClick={() => handleTatuador(usuario)}
                                    title="Convertir en Tatuador"
                                    className="text-green-600 hover:text-green-800"
                                >
                                    ▲
                                </button>
                                :
                                <button
                                    onClick={() => handleUsuario(usuario)}
                                    title="Revertir a Usuario"
                                    className="text-red-600 hover:text-red-800"
                                >
                                    ▼
                                </button>
            }
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            </div>
        </>
    )
}