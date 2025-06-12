"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import HomePage from "./ventanas/home"
import Tatuajes from "./ventanas/tatuajes"
import Disenos from "./ventanas/disenos"
import PedirCita from "./ventanas/pedir-cita"
import Cita from "./ventanas/cita"
import Reserva from "./ventanas/reserva"
import GestionCitas from "./ventanas/gestion-citas"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubirDiseno from "./ventanas/subir-diseno"
import SubirTatuaje from "./ventanas/subir-tatuaje"
import PrivateRoute from "./components/PrivateRoute"
import { AppProvider } from "./context/appProvider"
import DetallesCita from "./ventanas/detalles-cita"
import Usuarios from "./ventanas/usuarios"

function App() {

  return (
    <AppProvider>

      <Router>
      <Navbar/>
      {/* RENDERIZA LA VENTANA DE LA PAGINA DE LA URL ACTUAL*/}
      
        <main className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tatuajes" element={<Tatuajes />} />
            <Route 
              path="/diseños" element={<Disenos />} />
            <Route path="/diseños/reserva/:id" 
              element={
                <PrivateRoute onlyUsers>
                  <Reserva/>
                </PrivateRoute>
              }/>
            <Route path="/pedir-cita" 
              element={
                <PrivateRoute onlyUsers>
                  <PedirCita />
                </PrivateRoute>
              } />
            <Route path="/citas" element={<Cita />} />
            <Route
              path="/gestionar-citas"
              element={
                <PrivateRoute requireAdmin={true}>
                  <GestionCitas />
                </PrivateRoute>
              }
            />
            <Route
              path="/administracion/usuarios"
              element={
                <PrivateRoute requireAdmin={true}>
                  <Usuarios />
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
            {/* Ruta por defecto para paginas no encontradas */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  )
}

export default App
