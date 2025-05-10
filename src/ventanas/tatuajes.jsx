import { useState, useEffect } from "react"

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
        console.log("Hola")
        const response = await fetch("http://localhost:8080/api/tatuajes");
        console.log(response)
        const data = await response.json();

        const dataTattoos = data.filter(tatu => tatu.diseno === false )

        console.log(dataTattoos);

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
      <h1 className="tatuajes-title">Galería de Tatuajes</h1>

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
                src={`http://localhost:8080/api/imagenes/ver/${tattoo.imagen_id}`}
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
