import { useState } from "react"
import { useAppContext } from "../context/appProvider"
import { useNavigate } from "react-router-dom"

export default function SubirTatuaje() {
  const { tatuadores } = useAppContext()
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    type: "",
    image: null,
  })
  const [previewUrl, setPreviewUrl] = useState(null)
  const navigate = useNavigate();

  //USE STATE CON METODO PARA LA PREVIEW DE LAS FOTOS
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Guardar imagen en formData
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Previsualización
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      //1. GUARDAR LA IMAGEN EN CLOUDINARY
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image)

      const imageRes = await fetch("http://localhost:8080/api/cloudinary/upload", {
        method: "POST",
        body: imageFormData
      })

      if (!imageRes.ok) throw new Error("Error al subir la imagen");

      const imagen = await imageRes.json();

      const imagenUrl = imagen.url;

      console.log(imagenUrl);

      // 1. Crear el tatuaje sin imagen
      const tatuajePayload = {
        titulo: formData.title,
        estilo: formData.type,
        tatuador: tatuadores.find((tatuador) => tatuador.id === parseInt(formData.artist)), // debe estar ya como { id: ... } en formData
        imagen: imagenUrl,
        diseno: false,
      };

      console.log(tatuajePayload)
      const tatuajeRes = await fetch("http://localhost:8080/api/tatuajes/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tatuajePayload),
      });

      console.log(tatuajeRes)
      if (!tatuajeRes.ok) throw new Error("Error al crear el tatuaje");


      alert("¡Tatuaje subido correctamente!");

      navigate("/tatuajes")

    } catch (error) {
      console.error("Error al subir el tatuaje:", error);
      alert("Ocurrió un error. Revisa la consola.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1 className="upload-title">Subir Tatuaje</h1>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-grid">
          <div className="upload-form-group">
            <label htmlFor="title" className="upload-label">
              Título del tatuaje
            </label>
            <input
              id="title"
              name="title"
              className="upload-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="upload-form-group">
            <label htmlFor="artist" className="appointment-label">
              Artista
            </label>
            <select
              id="artist"
              name="artist"
              className="appointment-select"
              value={formData.artist}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un artista</option>
                {tatuadores.map( (tatuador) => (   
                  <option key={tatuador.id} value={tatuador.id}>{tatuador.nombre}</option>
                ))} 
            </select>
          </div>
        </div>

        <div className="upload-form-group">
          <label htmlFor="type" className="upload-label">
            Estilo del tatuaje
          </label>
          <input
            type="text"
            id="type"
            name="type"
            className="upload-input"
            value={formData.type}
            onChange={handleChange}
            placeholder="Escribe un estilo"
            required
          />
        </div>

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

        {previewUrl && (
          <div className="upload-preview">
            <h3 className="upload-preview-title">Vista previa</h3>
            <div className="upload-preview-image-container">
              <img src={previewUrl || "/placeholder.svg"} alt="Vista previa" className="upload-preview-image" />
            </div>
          </div>
        )}

        <button type="submit" className="upload-submit-button">
          Subir tatuaje
        </button>
      </form>
    </div>
  )
}
