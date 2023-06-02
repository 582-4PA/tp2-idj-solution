import { useContext, useEffect, useState } from 'react';
import './ControleJour.scss';
import { JourContexte } from './Appli';
import { formaterDate, jourPrecedent, jourSuivant } from './code/util';
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { premier } from './code/image-modele';

export default function ControleJour({setJour}) {
  const [premierJour, setPremierJour] = useState(new Date());

  useEffect(() => {
    /**
     * Obtient le premier jour de la collection d'images (une seule fois)
     * On pourrait aussi le fixer staticement, mais ça serait moins robuste
     */
    async function obtenirPremierJour() {
      let pj = await premier();
      setPremierJour(pj);
    }
    obtenirPremierJour();
  }, []);

  const jour = useContext(JourContexte);
  // Le dernier jour est le jour courant !
  const dernierJour = new Date();

  // Pour les fonctions suivant et precedent, voir le fichier de code "util"
  const suivant = jourSuivant(jour, dernierJour);
  const precedent = jourPrecedent(jour, premierJour);

  return (
    <div className="ControleJour">
      <div className="controle-nav">
        <IconButton color='primary' className='ctrl premier' disabled={!precedent} onClick={()=>setJour(premierJour)}>
          <FirstPageIcon></FirstPageIcon>
        </IconButton>
        <IconButton color='primary' className='ctrl precedent' disabled={!precedent} onClick={()=>setJour(precedent)}>
          <ArrowBack></ArrowBack>
        </IconButton>
        <IconButton color='primary' className='ctrl suivant' disabled={!suivant} onClick={()=>setJour(suivant)}>
          <ArrowForwardIcon></ArrowForwardIcon>
        </IconButton>
        <IconButton color='primary' className='ctrl dernier' disabled={!suivant} onClick={()=>setJour(dernierJour)}>
          <LastPageIcon></LastPageIcon>
        </IconButton>
      
      </div>
      <div className="jour-courant">
        {formaterDate(jour)}
      </div>
    </div>
  );
}