import { doc, updateDoc, deleteField } from "firebase/firestore";
import { bd, collComs, collImages } from "./init";

/**
 * 
 * @param {string} jour Jour de l'image
 * @param {string} uid Identifiant de l'utilisateur
 * @param {string} cid Identifiant du commentaire
 * @param {int} vote Vote de l'utilisateur pour ce commentaire (0, 1 ou -1)
 * @param {int} voteActuel Vote actuel de l'utilisateur pour ce commentaire (0, 1 ou -1)
 */
export async function voter(jour, uid, cid, vote, voteActuel) {
  await updateDoc(
          doc(bd, collImages, jour, collComs, cid), 
          {[`votes.${uid}`] : (!voteActuel || voteActuel!==vote) ? vote : deleteField()}, 
          {merge: true});
}
