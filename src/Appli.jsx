import { createContext, useEffect, useState } from 'react';
import './Appli.scss';
import { lireUne } from './code/image-modele';
import Aime from './Aime';
// Le composant suivant seulement pour générer des données de test
// import Admin from "./Admin";
import Utilisateur from './Utilisateur';
import { observerEtatConnexion } from './code/utilisateur-modele';
import { MESSAGES, formaterDate, formaterDateNumerique } from './code/util';
import Toast from './Toast';
import ControleJour from './ControlJour';
import ListeCommentaires from './ListeCommentaires';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export const UtilisateurContexte = createContext(null);
export const JourContexte = createContext('');

export default function Appli() {
  const [jour, setJour] = useState(() => new Date());
  const [idj, setIdj] = useState({url:'', aime: [], description: ''});
  const [utilisateur, setUtilisateur] = useState(null);
  const [toast, setToast] = useState('');

  document.title = formaterDate(jour);

  // Surveiller l'état de la connexion Firebase Auth
  useEffect(() => observerEtatConnexion(setUtilisateur, setToast),[]);

  useEffect(
    ()  => {
      /**
       * On obtient l'info de l'image du jour à partir de Firestore
       */
      async function obtenirIdj() {
        const idjFS = await lireUne(formaterDateNumerique(jour));
        // On remplace l'URL de Firebase Storage par celle d'ImageKit 
        // (pas vu en classe, mais mentionné pour ceux qui veulent aller plus loin)
        idjFS.url = idjFS.url.replace('https://firebasestorage.googleapis.com/v0/b/pa-h23-prof.appspot.com/', 'https://ik.imagekit.io/xvitae/');
        setIdj(idjFS);
      }
      obtenirIdj();
    }, [jour]
  );

  return (
    <UtilisateurContexte.Provider value={utilisateur}>
      <JourContexte.Provider value={jour}>
        <div className="Appli" style={{backgroundImage: "url('"+ idj.url +"')"}}>
          {toast === '' || <Toast message={MESSAGES[toast]} setToast={setToast} /> }
          <Aime setToast={setToast}/>
          <label className="label-tiroir-droite" htmlFor='checkbox-tiroir-droite'>
            <MenuOpenIcon />
          </label>
          <input type="checkbox" id="checkbox-tiroir-droite" />
          <section className="droite">
            <Utilisateur setToast={setToast} />
            <ListeCommentaires setToast={setToast} />
          </section>
          <section className="bas">
            {idj.description && <p className="description">{idj.description}</p>}
            <ControleJour setJour={setJour} />
          </section>
        </div>
      </JourContexte.Provider>
    </UtilisateurContexte.Provider>
  );
}
