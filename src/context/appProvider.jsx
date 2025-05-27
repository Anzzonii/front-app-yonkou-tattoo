import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const [tatuadores, setTatuadores] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState(null);

     useEffect(() => {
        const fetchTatuadores = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/perfiles-usuario`);
                const data = await res.json()

                const perfTatuadores = data.filter(user => user.esTatuador === true) 
                setTatuadores(perfTatuadores)
            } catch (error) {
                console.error("Error al cargar el diseño:", error)
            }
        }

        fetchTatuadores()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            try{
                const decoded = jwtDecode(token);
                setUsuarioActual(decoded)
            }catch(error){
                console.error("Token inválido:", error);
                setUsuarioActual(null)
            }
        }
    }, [])

    return(
        <AppContext.Provider value={{ tatuadores, usuarioActual }}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext);