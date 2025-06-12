import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

//Configuracion de firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzGALlhr74CCcmM2_sHQWO7nTUdx1B_Vo",
  authDomain: "yonkou-tattoo.firebaseapp.com",
  projectId: "yonkou-tattoo",
  storageBucket: "yonkou-tattoo.firebasestorage.app",
  messagingSenderId: "22536026470",
  appId: "1:22536026470:web:52373c97341e7b3d49b0a7",
  measurementId: "G-LVCV4QPZED"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
