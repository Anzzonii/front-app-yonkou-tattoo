import { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"



//VENTANA DE REGISTRO
export function RegisterDialog({ open, onOpenChange, onLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        const user = userCredential.user

        //Asiganr el nombre del usuario en el token que se va mandar para registrar
        await updateProfile(user, {
          displayName: name,
        })

        await sendEmailVerification(user)

        alert("Registro exitoso. Revisa tu correo para verificar tu cuenta.")
        handleClose()

      } catch (error) {
        console.error("Error al registrar", error)
        alert("Error al registrar. Intenta con otro correo.")
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">Crear una cuenta</h2>
          <button className="dialog-close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="dialog-form-group">
            <label htmlFor="name" className="dialog-label">
              Nombre completo
            </label>
            <input id="name" className="dialog-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
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
          <div className="dialog-form-group">
            <label htmlFor="confirmPassword" className="dialog-label">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="dialog-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="dialog-primary-button">
            Registrarse
          </button>

          <div className="dialog-separator">
            <span>O</span>
          </div>

          <div className="dialog-register-link">
            <span>¿Ya tienes una cuenta? </span>
            <button type="button" className="dialog-link-button" onClick={onLogin}>
              Inicia Sesion
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
