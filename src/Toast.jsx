import './Toast.scss';

export default function Toast({message, setToast}) {
  
  /**
   * Réinitialise le message d'erreur.
   */
  function resetToast() {
    setToast('');
  }

  return (
    <div className="Toast">
        <input type="checkbox" id="cc-msg-toast" />
        <label 
            onClick={resetToast}
            onAnimationEnd={resetToast}
            htmlFor="cc-msg-toast" 
            className={`msg-toast msg-${message.type}`}
            title="Cliquez pour fermer"
        >
            {message.texte}
        </label>
    </div>
  );
}