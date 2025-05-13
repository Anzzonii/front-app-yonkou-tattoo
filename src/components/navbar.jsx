import { useState } from "react"
import { LoginDialog } from "./login-dialog"
import { ConfigDialog } from "./config-dialog"
import { RegisterDialog } from "./register-dialog"
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom';


// Componente personalizado para reemplazar Link
// const NavLink = ({ to, children }) => {
//   const handleClick = (e) => {
//     e.preventDefault()
//     window.location.hash = `#${to}`
//   }

//   return (
//     <a href={`#${to}`} onClick={handleClick}>
//       {children}
//     </a>
//   )
// }

export default function Navbar({ currentPath }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setLoginOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setDropdownOpen(false)
  }

  const openRegisterDialog = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        <div className="navbar-left-section">
          
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-circle w-16 h-16 rounded-full overflow-hidden">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
          </Link>
  

          <nav className="navbar-nav">
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

        <div className="navbar-center-section">
          <span className="dialog-title">Yonkou Tattoo</span>
        </div>

        <div className="navbar-right-section">
          <NavLink to="/pedir-cita" className="navbar-nav-button" activeClassName="active">
            <button className={`navbar-nav-button ${currentPath === "/pedir-cita" ? "active" : ""}`}>PEDIR CITA</button>
          </NavLink>
          <NavLink to="/calendario" className="navbar-nav-button" activeClassName="active">
            <button className={`navbar-nav-button ${currentPath === "/calendario" ? "active" : ""}`}><CalendarDaysIcon className="h-6 w-6 text-white-500" /></button>
          </NavLink>
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

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} onRegister={openRegisterDialog} />
      <ConfigDialog open={configOpen} onOpenChange={setConfigOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} onRegister={handleLogin} />
    </header>
  )
}
