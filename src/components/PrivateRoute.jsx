import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

//Configuracion para que en las rutas solo pueda acceder o los tatuadores o los usuarios
const PrivateRoute = ({ children, requireAdmin = false, onlyUsers = false }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // Controlar que solo sea tatuador
    if (requireAdmin && !decoded.esTatuador) {
      return <Navigate to="/unauthorized" />;
    }

    // Controlar que solo sea usuario
    if (onlyUsers && decoded.esTatuador) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (e) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
