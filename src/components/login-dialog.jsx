import { useState } from "react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase"


export function LoginDialog({ open, onOpenChange, onLogin, onRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!open) return null

  //Inicio de sesion con correo
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // si el correo no esta verificado, marca un alert y no inicia sesion
      if (!user.emailVerified) {
        alert("Por favor verifica tu correo electrónico antes de iniciar sesión.")
        return
      }

      const idToken = await user.getIdToken()

      console.log("mandando token")
      // Envía el token al backend
      const response = await fetch("http://localhost:8080/api/auth/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      })
      
      if (!response.ok) {
        throw new Error("Error al autenticar con el backend");
      }

      const data = await response.json();

      // Aquí sí tienes el token JWT que te devolvió el backend
      localStorage.setItem('token', data.token);

      onLogin()
    } catch (error) {
      console.error("Login error", error)
    }
  }

  //Inicio de sesion con firebase
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      // Envía el token al backend
      const response = await fetch("http://localhost:8080/api/auth/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      })

      if (!response.ok) {
        throw new Error("Error al autenticar con el backend");
      }

      const data = await response.json();

      // Aquí sí tienes el token JWT que te devolvió el backend
      localStorage.setItem('token', data.token);
      onLogin()
      location.reload
    } catch (error) {
      console.error("Google login error", error)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">Iniciar Sesión</h2>
          <button className="dialog-close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="dialog-form-group">
            <label htmlFor="email" className="dialog-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="dialog-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="dialog-form-group">
            <label htmlFor="password" className="dialog-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="dialog-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="dialog-primary-button">
            Iniciar Sesión
          </button>

          <div className="dialog-separator">
            <span>O</span>
          </div>

          <button type="button" className="dialog-google-button" onClick={handleGoogleLogin}>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar con Google
          </button>

          <div className="dialog-register-link">
            <span>¿No tienes una cuenta? </span>
            <button type="button" className="dialog-link-button" onClick={onRegister}>
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
