"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import HomePage from "./ventanas/home"
import TattoosPage from "./ventanas/tatuajes"
import DesignsPage from "./ventanas/disenos"
import AppointmentPage from "./ventanas/pedir-cita"
import CalendarPage from "./ventanas/calendario"
import Reserva from "./ventanas/reserva"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>

      <Router>
      <Navbar/>
      {/* RENDERIZA LA VENTANA DE LA PAGINA DE LA URL ACTUAL*/}
      
        <main className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tatuajes" element={<TattoosPage />} />
            <Route path="/diseños" element={<DesignsPage />} />
            <Route path="/diseños/reserva/:id" element={<Reserva/>}/>
            <Route path="/pedir-cita" element={<AppointmentPage />} />
            <Route path="/calendario" element={<CalendarPage />} />
            {/* Ruta por defecto para páginas no encontradas */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
