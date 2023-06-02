import { useContext, useState } from 'react';
import './Commentaire.scss';
import { JourContexte, UtilisateurContexte } from './Appli';
import { supprimer } from './code/commentaire-modele';
import { formaterDateNumerique } from './code/util';
import Vote from './Vote';
import { voter } from './code/vote-modele';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

export default function Commentaire({setToast, id, texte, nomUtil, idUtil, votes}) {
  const utilisateur = useContext(UtilisateurContexte);
  const jour = useContext(JourContexte);
  const jourId = formaterDateNumerique(jour);
  const [commentaires, setCommentaires] = useState([]);
  const votesPositifs = Object.values(votes).filter(v => v===1).length;
  const votesNegatifs = Object.values(votes).filter(v => v===-1).length;

  /**
   * Modifie le vote de l'utilisateur pour le commentaire courant
   * @param {int} upDown valeur du vote (1 ou -1)
   * @param {*} voteActuel valeur du vote actuel de l'utilisateur (1, -1 ou undefined)
   */
  function changerVote(upDown, voteActuel) {
    if(utilisateur) {
      voter(jourId, utilisateur.uid, id, upDown, voteActuel);
      setCommentaires(commentaires.map(c => { 
        if(c.id === id) {
          if(!voteActuel || voteActuel !== upDown) {
            c.votes[utilisateur.uid] = upDown;
          }
          else {
            delete c.votes[utilisateur.uid];
          }
        }
        return c;
      }));
    }
    else {
      setToast('e1020');
    }
  }

  /**
   * Supprime le commentaire courant pour l'utilisateur connecté
   */
  async function supprimerCom() {
    if(utilisateur && utilisateur.uid === idUtil) {
      let res = await supprimer(jourId, id);
      // Pas le droit de supprimer le commentaire (n'appaartient pas à l'utilisateur connecté)
      if(res === 'e2040') {
        setToast(res);
      }
      // Suppression réussie
      else {
        setToast('e2010');
        setCommentaires(commentaires.filter(c => c.id !== id));
      }
    }
    // Pas d'utilisateur connecté
    else {
      setToast('e1020');
    }
  }


  return (
    // Opacité du commentaire en fonction du ratio de votes positifs
    <div className="Commentaire" style={{opacity: `clamp(0.3, ${votesNegatifs===0 ? 1 : votesPositifs/(votesNegatifs+votesPositifs)} ,1)`}}>  
      <div className="titre">
        <span className="util">{nomUtil}</span>
        {
          // Si l'utilisateur connecté est l'auteur du commentaire, afficher le bouton de suppression
          utilisateur && utilisateur.uid===idUtil
          &&
          <IconButton onClick={supprimerCom} className='btn-supprimer-commentaire' size='small' title="Supprimer ce commentaire">
            <ClearIcon style={{fontSize: '1.15rem'}} />
          </IconButton>
        }
      </div>
      <div className="texte">{texte}</div>
      <Vote 
        voteActuel={utilisateur && votes[utilisateur.uid] ? votes[utilisateur.uid] : false} 
        down={votesNegatifs}
        up={votesPositifs} 
        changerVote={changerVote} 
      />
    </div>
  );
}