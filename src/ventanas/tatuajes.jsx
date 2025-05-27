import { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';

// Datos de ejemplo

const authors = ["Todos", "Carlos", "María", "Juan"]
const types = ["Todos", "Tradicional", "Realista", "Neotradicional", "Blackwork", "Japonés"]

export default function TattoosPage() {
  const [tattoos, setTattoos] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("Todos")
  const [selectedType, setSelectedType] = useState("Todos")

  // Este useEffect se encarga de hacer el fetch
  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tatuajes");
        const data = await response.json();

        const dataTattoos = data.filter(tatu => tatu.diseno === false )


        setTattoos(dataTattoos); // Aquí guardas los tatuajes en el estado
      } catch (error) {
        console.error("Error al cargar tatuajes:", error);
      }
    };

    fetchTattoos();
  }, []);

  const filteredTattoos = tattoos.filter(
    (tattoo) =>
      (selectedAuthor === "Todos" || tattoo.author === selectedAuthor) &&
      (selectedType === "Todos" || tattoo.type === selectedType),
  )

  return (
    <div className="tatuajes-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="tatuajes-title">Galería de Tatuajes</h1>
        <NavLink to='/tatuajes/subir-tatuaje' className="disenos-reserva-button">
          <button className="upload-button" onClick={() => (window.location.hash = "#/subir-tatuaje")}>
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
            Subir Tatuaje
          </button>
        </NavLink>
      </div>

      <div className="tatuajes-filters">
        <div className="tatuajes-filter-group">
          <label htmlFor="author-filter" className="tatuajes-filter-label">
            Filtrar por artista
          </label>
          <select
            id="author-filter"
            className="tatuajes-select"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="tatuajes-filter-group">
          <label htmlFor="type-filter" className="tatuajes-filter-label">
            Filtrar por estilo
          </label>
          <select
            id="type-filter"
            className="tatuajes-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tatuajes-grid">
        {filteredTattoos.map((tattoo) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
