import { collection, query, orderBy, doc, getDocs, getDoc, limit, documentId } from "firebase/firestore";
import { bd, collImages } from "./init";

/**
 * Obtenir l'image du jour.
 * 
 * @param {string}  Chaîne indiquant le jour dans le format AAAAMMJJ
 * 
 * @returns {object} Objet représentant l'image du jour
 */
export async function lireUne(jour) {
    const idj = await getDoc(doc(bd, collImages, jour));
    return {id: idj.id, ...idj.data()};
}

/**
 * Retourne le premier jour de la collection Images.
 * 
 * @returns {string} Chaîne indiquant le jour dans le format AAAAMMJJ
 */
export async function premier() {
    const images = await getDocs(query(collection(bd, collImages), orderBy(documentId(), 'asc'), limit(1)));
    const date = images.docs[0].id;
    return (new Date(date.substring(0, 4), date.substring(4, 6) - 1, date.substring(6, 8)));
}