import './Utilisateur.scss';
import logoGoogle from './images/google-logo.png';
import { useContext } from 'react';
import { UtilisateurContexte } from './Appli';
import { connexion, deconnexion } from './code/utilisateur-modele';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

export default function Utilisateur({setToast}) {
  const utilisateur = useContext(UtilisateurContexte);

  return (
    <div className="Utilisateur">
      {
        utilisateur 
        ?
          <div className='util-courant'>
            <span className="nom-utilisateur">{utilisateur.displayName}</span>
            <IconButton className='btn-deconnexion' size='small' onClick={()=>{deconnexion().then(()=>setToast('e1010'));}}><LogoutIcon/></IconButton>
          </div>
        :
          <span className="btn-google" onClick={() => {connexion().then(()=>setToast('e1000'))}}>
            <img className="btn-image" src={logoGoogle} alt="Logo Google"/>
            <span className="btn-texte">Continuer avec Google</span>
          </span>
      }
    </div>
  );
}