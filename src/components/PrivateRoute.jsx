import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // Aquí revisamos si el usuario es tatuador (es tu "admin")
    if (requireAdmin && !decoded.esTatuador) {
      return <Navigate to="/unauthorized" />; // o muestra un error de acceso
    }

    return children;
  } catch (e) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
