import { useRef } from "react"

export default function HomePage() {
  const ref = useRef(null)

  return (
    <div className="home-container">
      <section ref={ref} className="home-hero">
        <div className="home-hero-background">
          <img
            src="https://via.placeholder.com/1920x1080?text=Estudio+de+tatuajes"
            alt="Estudio de tatuajes"
            className="home-hero-image"
          />
        </div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">Yonkou Tattoo</h1>
          <p className="home-hero-subtitle">Frase</p>
          <button className="home-hero-button" onClick={() => (window.location.hash = "#/pedir-cita")}>
            Reserva tu cita
          </button>
        </div>
      </section>

      <section className="home-about-section">
        <div className="home-about-grid">
          <div className="home-about-text">
            <h2 className="home-section-title">Sobre Nosotros</h2>
            <p className="home-paragraph">
              Somos un estudio de tatuajes con más de 10 años de experiencia. Nuestro equipo está formado por artistas
              profesionales especializados en diferentes estilos.
            </p>
            <p className="home-paragraph">
              Utilizamos materiales de la más alta calidad y seguimos estrictos protocolos de higiene para garantizar la
              seguridad de nuestros clientes.
            </p>
          </div>
          <div className="home-about-image">
            <img src="https://via.placeholder.com/600x800?text=Estudio" alt="Estudio" className="home-image" />
          </div>
        </div>
      </section>

      <section className="home-services-section">
        <div className="home-services-container">
          <h2 className="home-section-title">Nuestros Servicios</h2>
          <div className="home-services-grid">
            {[
              { title: "Tatuajes Personalizados", desc: "Diseños únicos creados específicamente para ti" },
              { title: "Cover-ups", desc: "Transformamos tatuajes antiguos en nuevas obras de arte" },
              { title: "Asesoramiento", desc: "Te ayudamos a encontrar el diseño perfecto para ti" },
            ].map((service, i) => (
              <div key={i} className="home-service-card">
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-artists-section">
        <h2 className="home-section-title">Nuestros Artistas</h2>
        <div className="home-artists-grid">
          {[1, 2, 3].map((artist) => (
            <div key={artist} className="home-artist-card">
              <div className="home-artist-image-container">
                <img
                  src={`https://via.placeholder.com/300x300?text=Artista${artist}`}
                  alt={`Artista ${artist}`}
                  className="home-artist-image"
                />
              </div>
              <h3 className="home-artist-name">Artista {artist}</h3>
              <p className="home-artist-specialty">Especialista en estilo tradicional</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
