"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import HomePage from "./ventanas/home"
import TattoosPage from "./ventanas/tatuajes"
import DesignsPage from "./ventanas/disenos"
import AppointmentPage from "./ventanas/pedir-cita"
import CalendarPage from "./ventanas/calendario"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/")

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || "/")
    }

    window.addEventListener("hashchange", handleHashChange)

    // Si no hay hash al inicio, establecer uno
    if (!window.location.hash) {
      window.location.hash = "#/"
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return <HomePage />
      case "/tatuajes":
        return <TattoosPage />
      case "/disenos":
        return <DesignsPage />
      case "/pedir-cita":
        return <AppointmentPage />
      case "/calendario":
        return <CalendarPage />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <Navbar currentPath={currentPath} />
      <main className="main-container">{renderContent()}</main>
    </>
  )
}

export default App
