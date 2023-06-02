import { useContext, useState } from 'react';
import './Aime.scss';
import { JourContexte, UtilisateurContexte } from './Appli';
import { useEffect } from 'react';
import { basculer, observer } from './code/aime-modele';
import { formaterDateNumerique } from './code/util';

export default function Aime({setToast}) {
  const utilisateur = useContext(UtilisateurContexte);
  const jour = useContext(JourContexte);
  const jourId = formaterDateNumerique(jour);
  const [infoAime, setInfoAime] = useState([]);
  const etatAime = utilisateur && infoAime.includes(utilisateur.uid) ? 1 : 0;

  useEffect(
    () => {
      /**
       * 
       * @returns Observe l'info du plébiscite en temps réel
       */
      function infoAime() {
        return observer(jourId, setInfoAime);
      }
      return infoAime();
    },
    [jourId]
  );

  /**
   * Faire basculer la valeur du plébiscite pour l'image du jour et 
   * l'utilisateur courants
   */
  function basculerAime() {
    if(utilisateur) {
      basculer(jourId, utilisateur.uid, etatAime)
    }
    // Si pas d'utilisateur connecté, afficher un message d'erreur
    else {
      setToast('e1020');
    }
  }

  return (
    <div className="Aime">
      {/* LÉtat du coeur ;-) */}
      <span 
        className={'aime-icone aime-etat-' + etatAime}
        onClick={basculerAime}
      >
        &#x2665;
      </span>
      {/* Le décompte des plébiscites */}
      <span className="aime-compte">{infoAime.length}</span>
    </div>
  );
}