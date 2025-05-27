"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import HomePage from "./ventanas/home"
import TattoosPage from "./ventanas/tatuajes"
import DesignsPage from "./ventanas/disenos"
import AppointmentPage from "./ventanas/pedir-cita"
import CalendarPage from "./ventanas/calendario"
import Reserva from "./ventanas/reserva"
import GestionCitas from "./ventanas/gestion-citas"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubirDiseno from "./ventanas/subir-diseno"
import SubirTatuaje from "./ventanas/subir-tatuaje"
import PrivateRoute from "./components/PrivateRoute"
import { AppProvider } from "./context/appProvider"
import DetallesCita from "./ventanas/detalles-cita"

function App() {

  return (
    <AppProvider>

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
            <Route
              path="/gestionar-citas"
              element={
                <PrivateRoute requireAdmin={true}>
                  <GestionCitas />
                </PrivateRoute>
              }
            />
            <Route
              path="/citas/:id"
              element={
                  <DetallesCita />
              }
            />
            <Route
              path="/diseños/subir-diseño"
              element={
                <PrivateRoute requireAdmin={true}>
                  <SubirDiseno />
                </PrivateRoute>
              }
            />
            <Route
              path="/tatuajes/subir-tatuaje"
              element={
                <PrivateRoute requireAdmin={true}>
                  <SubirTatuaje />
                </PrivateRoute>
              }
            />
            {/* Ruta por defecto para páginas no encontradas */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  )
}

export default App
