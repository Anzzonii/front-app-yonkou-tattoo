import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


//VENTANAS PARA MOSTRAR LOS DISEÑOS ACTUALES DE LA APLICACION
export default function Disenos() {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [disenos, setDisenos] = useState([]);
  
  const token = localStorage.getItem("token")

  useEffect(() => {
    
    if(token){
        const user = jwtDecode(token)
        setUsuarioActual(user)
    }
    
  }, []);

  // UseEffect para cargar los diseños de los tatuajes
  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tatuajes", {
          headers: { 
              "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        //Filtro para que solo se guarden los tatuajes que sean diseños
        const dataTattoos = data.filter(tatu => tatu.diseno === true )


        setDisenos(dataTattoos.reverse());
      } catch (error) {
        console.error("Error al cargar tatuajes:", error);
      }
    };

    fetchTattoos();
    }, []);

    const handleBorrar = async (id) => {
      if (!window.confirm("¿Estás seguro de que quieres borrar este tatuaje?")) return;

      try {
        const response = await fetch(`http://localhost:8080/api/tatuajes/borrar/${id}`, {
          method: "DELETE",
          'Authorization': `Bearer ${token}` 
        });

        if (response.ok) {
          alert("Tatuaje borrado correctamente");
          window.location.reload();

        } else {
          alert("Error al borrar el tatuaje");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión al intentar borrar el tatuaje");
      }
  };

  return (
    <div className="disenos-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="disenos-title">Galería de Diseños</h1>
        {usuarioActual && usuarioActual.esTatuador &&
        <NavLink to='/diseños/subir-diseño' className="disenos-reserva-button">
          <button className="upload-button">
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
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Subir Diseño
          </button>
        </NavLink>
        }
      </div>

      <div className="disenos-grid">

        {/* MAP DE LOS DISEÑOS */ }
        {disenos.map((tattoo) => (
            <div key={tattoo.id} className="tatuajes-card">
              <div className="tatuajes-card-image">
                <img
                  src={`${tattoo.imagen}`}
                  alt={`Tatuaje por ${tattoo.tatuador.nombre}`}
                  className="tatuajes-image"
                />
              </div>
              <div className="tatuajes-card-footer">
                <div className="tatuajes-card-info">
                  <p className="tatuajes-info-label">Autor</p>
                  <p className="tatuajes-info-value">{tattoo.tatuador.nombre}</p>
                </div>
                <div className="tatuajes-card-info">
                  <p className="tatuajes-info-label">Estilo</p>
                  <p className="tatuajes-info-value">{tattoo.estilo}</p>
                </div>
                <div className="tatuajes-card-info reservar">
                  {usuarioActual && !usuarioActual.esTatuador &&
                  <NavLink to={`/diseños/reserva/${tattoo.id}`} className="disenos-reserva-button">RESERVAR</NavLink>
                  }
                </div>
                <div className="tatuajes-card-info borrar">
                {usuarioActual && usuarioActual.esTatuador &&
                <button onClick={() => handleBorrar(tattoo.id)} className="tatuajes-borrar-button">Borrar</button>
                }
              </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
