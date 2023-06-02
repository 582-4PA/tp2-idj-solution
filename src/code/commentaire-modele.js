import { collection, query, orderBy, deleteDoc, doc, onSnapshot, addDoc } from "firebase/firestore";
import { bd, collImages, collComs } from "./init";

/**
 * Obtenir les commentaires d'une image.
 * @param {string} jour Chaîne indiquant le jour dans le format AAAAMMJJ
 * @returns {CallableFunction} Fonction pour arrêter l'écoute de l'état des commentaires
 */
export function observer(jour, mutateurCommentaires) {
  return onSnapshot(query(collection(bd, collImages, jour, collComs), orderBy('timestamp', 'desc')), resultat => {
    const comsFS = resultat.docs.map(
      doc => ({id: doc.id, ...doc.data()})
    );
    mutateurCommentaires(comsFS);
  });
}

/**
 * Ajouter un commentaire à une image.
 * 
 * @param {string} jour Chaîne indiquant le jour dans le format AAAAMMJJ
 * @param {string} texte Texte du commentaire
 * @param {string} idUtil Identifiant de l'utilisateur ayant écrit le commentaire
 * @param {string} nomUtil Nom de l'utilisateur ayant écrit le commentaire
 * 
 * @returns {object} Objet représentant le commentaire ajouté
 */ 
export async function ajouter(jour, idUtil, nomUtil, texte) {
  if(texte.trim().length===0) {
    return "e2030";
  }
  else {
    let ts = Date.now()
    let docRef = await addDoc(collection(bd, collImages, jour, collComs), {
      texte: texte,
      votes: {},
      idUtil: idUtil,
      nomUtil: nomUtil,
      timestamp: ts
    });
    return ({id: docRef.id, texte: texte, votes: {}, idUtil: idUtil, nomUtil: nomUtil, timestamp: ts});
  }
}

/**
 * Supprimer un commentaire.
 * @param {string} jour Jour de l'image en format AAAAMMJJ
 * @param {string} idCom Identifiant Firestore du commentaire
 * @returns {object} Objet représentant le commentaire supprimé ou une chaîne d'erreur
 */
export async function supprimer(jour, idCom) {
  try {
    return await deleteDoc(doc(bd, collImages, jour, collComs, idCom));
  }
  catch(e) {
    return 'e2040';
  }
}