import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";


export default function DesignsPage() {
  const [disenos, setDisenos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  // UseEffect para cargar los diseños de los tatuajes
  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tatuajes");
        const data = await response.json();

        //Filtro para que solo se guarden los tatuajes que sean diseños
        const dataTattoos = data.filter(tatu => tatu.diseno === true )


        setDisenos(dataTattoos);
      } catch (error) {
        console.error("Error al cargar tatuajes:", error);
      }
    };

    fetchTattoos();
    }, []);

  return (
    <div className="disenos-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="disenos-title">Galería de Diseños</h1>
        <NavLink to='/diseños/subir-diseño' className="disenos-reserva-button">
          <button className="upload-button" onClick={() => (window.location.hash = "#/subir-diseno")}>
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
      </div>
      {/* Apartado para los filtros */}
      <div className="disenos-search-container">
        <input
          type="search"
          placeholder="Buscar por artista..."
          className="disenos-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="disenos-search-icon"
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
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
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
                  <NavLink to={`/diseños/reserva/${tattoo.id}`} className="disenos-reserva-button">RESERVAR</NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
