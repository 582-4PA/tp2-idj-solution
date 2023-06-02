import { useContext, useState } from 'react';
import './ListeCommentaires.scss';
import { JourContexte, UtilisateurContexte } from './Appli';
import { useEffect } from 'react';
import { ajouter, observer } from './code/commentaire-modele';
import { formaterDateNumerique } from './code/util';
import Commentaire from './Commentaire';
import { IconButton } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function ListeCommentaires({setToast}) {
  const utilisateur = useContext(UtilisateurContexte);
  const jour = useContext(JourContexte);
  const jourId = formaterDateNumerique(jour);
  const [commentaires, setCommentaires] = useState([]);
  
  useEffect(
    () => {
      /**
       * On observe les commentaires du jour courant en temps réel.
       * @returns {function} fonction de nettoyage de l'observateur (unsubscribe)
       */
      function commentaires() {
        return observer(jourId, setCommentaires);
      }
      // On retourne une fonction de nettoyage de l'observateur (unsubscribe)
      // Vous n'avez pas vu ce concept en classe, mais c'est très utile.
      return commentaires();
    },
    [jourId]
  );

  /**
   * Ajoute un commentaire pour l'utilisateur connecté 
   */
  async function ajouterCommentaire() {
    if(utilisateur) {
      const textarea = document.querySelector('#commentaire');
      const texte = textarea.value;
      const res = await ajouter(jourId, utilisateur.uid, utilisateur.displayName, texte);
      if(res === 'e2030') {
        setToast(res);
      }
      else {
        setCommentaires([res, ...commentaires]);
        setToast('e2000');
      }
      textarea.value = '';
    }
    else {
      setToast('e1020');
    }
  }

  return (
    <div className="ListeCommentaires">
      {
        utilisateur &&
        <div className="ajout-commentaire">
          <form>
              <textarea name="texte" id="commentaire" placeholder='...'></textarea>
              <IconButton 
                title="Envoyer" 
                onClick={ajouterCommentaire}
                size='small'>
                  <AddCommentIcon />
              </IconButton>
          </form>
        </div>
      }
      {commentaires.map(
        com => <Commentaire 
                  key={com.id} 
                  id={com.id} 
                  setToast={setToast} 
                  {...com}
                />
      )}
    </div>
  );
}