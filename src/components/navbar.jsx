import { useEffect, useState } from "react"
import { LoginDialog } from "./login-dialog"
import { ConfigDialog } from "./config-dialog"
import { RegisterDialog } from "./register-dialog"
import { CalendarDaysIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { auth, googleProvider } from "../firebase"
import { signOut } from "firebase/auth";

export default function Navbar({ currentPath }) {
  const token = localStorage.getItem("token")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [toggleAdmin, setToggleAdmin] = useState(false)
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cogerUsuario = async (user) => {
    const response = await fetch(`http://localhost:8080/api/perfiles-usuario/${user.uid}`, {
      headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}` 
        }
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          cogerUsuario(decoded)
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true)
    setLoginOpen(false)
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    await signOut(auth); 
    location.reload()
  }

  const openRegisterDialog = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  const openLoginDialog = () => {
    setLoginOpen(true)
    setRegisterOpen(false)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Sección izquierda - Logo y menú hamburguesa */}
        <div className="navbar-left-section">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-circle w-16 h-16 rounded-full overflow-hidden">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Botón de menú hamburguesa solo para móvil */}
          <button 
            className="mobile-menu-button lg:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Navegación principal - oculta en móvil */}
          <nav className="hidden lg:flex navbar-nav">
            <NavLink to="/" className="navbar-nav-button" activeClassName="active">
              <button className={`navbar-nav-button ${currentPath === "/" ? "active" : ""}`}>INICIO</button>
            </NavLink>
            
            <NavLink to="/tatuajes" className="navbar-nav-button" activeClassName="active">
              <button className={`navbar-nav-button ${currentPath === "/tatuajes" ? "active" : ""}`}>TATUAJES</button>
            </NavLink>
            <NavLink to="/diseños" className="navbar-nav-button" activeClassName="active">
              <button className={`navbar-nav-button ${currentPath === "/disenos" ? "active" : ""}`}>DISEÑOS</button>
            </NavLink>
          </nav>
        </div>

        {/* Título central - oculto en móvil */}
        <div className="navbar-center-section hidden lg:block">
          <span className="dialog-title">Yonkou Tattoo</span>
        </div>

        {/* Sección derecha - Acciones de usuario */}
        <div className="navbar-right-section">
          {/* Botones de cita - ocultos en móvil */}
          {user && (
            <div className="hidden lg:block">
              {!user.esTatuador ? 
                <NavLink to="/pedir-cita" className="navbar-nav-button" activeClassName="active">
                  <button className={`navbar-nav-button ${currentPath === "/pedir-cita" ? "active" : ""}`}>PEDIR CITA</button>
                </NavLink>
                :
                <NavLink to="/gestionar-citas" className="navbar-nav-button" activeClassName="active">
                  <button className={`navbar-nav-button ${currentPath === "/pedir-cita" ? "active" : ""}`}>GESTIONAR CITAS</button>
                </NavLink>
              }
            </div>
          )}

          {/* Icono de calendario */}
          {user && 
            <NavLink to="/citas" className="navbar-nav-button" activeClassName="active">
              <button className={`navbar-nav-button ${currentPath === "/citas" ? "active" : ""}`}>
                <CalendarDaysIcon className="h-6 w-6" />
              </button>
            </NavLink>
          }

          {/* Menú de perfil */}
          <div className="navbar-profile-dropdown">
            <button className="navbar-profile-button" onClick={toggleDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="navbar-dropdown-menu">
                {!isLoggedIn ? (
                  <button
                    className="navbar-dropdown-item"
                    onClick={() => {
                      setLoginOpen(true)
                      setDropdownOpen(false)
                    }}
                  >
                    Iniciar Sesión
                  </button>
                ) : (
                  <>
                    <button
                      className="navbar-dropdown-item"
                      onClick={() => {
                        setConfigOpen(true)
                        setDropdownOpen(false)
                      }}
                    >
                      Configuración
                    </button>
                    
                    {user && (user.esTatuador ? 
                      <div className="navbar-dropdown-submenu">
                        <button className="navbar-dropdown-item" onClick={() => {
                          setToggleAdmin(!toggleAdmin)}}>
                          Administración ▸
                        </button>
                        {toggleAdmin && (
                          <div className="navbar-submenu">
                            <NavLink to="/administracion/usuarios">
                              <button className="navbar-dropdown-item navbar-item-grey-bg">Usuarios</button>
                            </NavLink>
                          </div>
                        )}
                      </div>
                      : null
                    )}
                    <button className="navbar-dropdown-item" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`lg:hidden mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <nav className="flex flex-col gap-2 p-4">
          <NavLink 
            to="/" 
            className="navbar-nav-button" 
            activeClassName="active"
            onClick={() => setMobileMenuOpen(false)}
          >
            <button className={`w-full text-left navbar-nav-button ${currentPath === "/" ? "active" : ""}`}>
              INICIO
            </button>
          </NavLink>
          
          <NavLink 
            to="/tatuajes" 
            className="navbar-nav-button" 
            activeClassName="active"
            onClick={() => setMobileMenuOpen(false)}
          >
            <button className={`w-full text-left navbar-nav-button ${currentPath === "/tatuajes" ? "active" : ""}`}>
              TATUAJES
            </button>
          </NavLink>
          
          <NavLink 
            to="/diseños" 
            className="navbar-nav-button" 
            activeClassName="active"
            onClick={() => setMobileMenuOpen(false)}
          >
            <button className={`w-full text-left navbar-nav-button ${currentPath === "/disenos" ? "active" : ""}`}>
              DISEÑOS
            </button>
          </NavLink>

          {/* Mostrar opciones de cita en el menú móvil si hay usuario */}
          {user && (
            <>
              {!user.esTatuador ? 
                <NavLink 
                  to="/pedir-cita" 
                  className="navbar-nav-button" 
                  activeClassName="active"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className={`w-full text-left navbar-nav-button ${currentPath === "/pedir-cita" ? "active" : ""}`}>
                    PEDIR CITA
                  </button>
                </NavLink>
                :
                <NavLink 
                  to="/gestionar-citas" 
                  className="navbar-nav-button" 
                  activeClassName="active"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className={`w-full text-left navbar-nav-button ${currentPath === "/gestionar-citas" ? "active" : ""}`}>
                    GESTIONAR CITAS
                  </button>
                </NavLink>
              }
            </>
          )}
        </nav>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} onRegister={openRegisterDialog} />
      <ConfigDialog open={configOpen} onOpenChange={setConfigOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} onLogin={openLoginDialog} />
    </header>
  )
}