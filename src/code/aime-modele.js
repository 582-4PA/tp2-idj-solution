import { query, doc, updateDoc, onSnapshot, arrayRemove, arrayUnion } from "firebase/firestore";
import { bd, collImages } from "./init";

/**
 * Obtenir l'état d'Aime.
 * @param {string} jour Chaîne indiquant le jour dans le format AAAAMMJJ
 * @param {function} mutateurInfoAime Fonction qui met à jour l'état React "aime" défini dans le composant Aime
 * @returns {CallableFunction} Fonction pour arrêter l'écoute de l'état d'Aime
 */
export function observer(jour, mutateurInfoAime) {
  return onSnapshot(query(doc(bd, collImages, jour)), resultat => {
    mutateurInfoAime(resultat.data().aime);
  });
}

/**
 * 
 * @param {string} jour Chaîne indiquant le jour dans le format AAAAMMJJ
 * @param {string} uid Chaîne indiquant l'identifiant de l'utilisateur
 * @param {boolean} etatAime État d'Aime pour cette image et cet utilisateur 
 */
export async function basculer(jour, uid, etatAime) {
  await updateDoc(doc(bd, collImages, jour), {aime: (etatAime) ? arrayRemove(uid) : arrayUnion(uid)});
}
