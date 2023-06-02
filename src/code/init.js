import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./fb-config";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Initialiser l'appli Firebase
const app = initializeApp(firebaseConfig);

// Obtenir une connexion à la BD Firestore
export const bd = getFirestore(app);

/*********** Initialiser Auth */
export const authFirebase = getAuth(app);
export const authGoogle = new GoogleAuthProvider();

// Storage
// export const stockage = getStorage(app);

// Noms des collections Firestore utilisées dans l'appli
export const collImages = 'idj-images';
export const collComs = 'commentaires';
export const collUtilisateurs = 'utilisateurs';