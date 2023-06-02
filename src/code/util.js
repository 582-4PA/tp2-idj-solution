/**
 * Formater l'objet Date de JS.
 * @param {Date} d Objet Date JavaScript
 * @returns {String} Date formatée en français dans le format suivant : 
 *                      3 décembre 1987 à 05:53:08
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString}
 */
export default function formaterDateEtHeure(d) {
	const dateFormatee = d.toLocaleDateString('fr-CA', {year: 'numeric', month: 'long', day: 'numeric'});
	const heureFormatee = d.toLocaleTimeString('en-CA', {hour12: false});
	return `${dateFormatee} à ${heureFormatee}`;
}

/**
 * Formater l'objet Date de JS dans le format utilisé par les identifiants
 * des images sur Firestore.
 * 
 * @param {Date} uneDate Objet Date JavaScript
 * 
 * @returns {String} Date dans le format suivant : AAAAMMJJ
 * 
 */
export function formaterDateNumerique(uneDate) {
	return uneDate.getFullYear()
      + (uneDate.getMonth() + 1).toString().padStart(2, '0') 
      + (uneDate.getDate()).toString().padStart(2, '0');
}

/**
 * Formater l'objet Date de JS.
 * @param {Date} jour Objet Date JavaScript
 * @returns {String} Date formatée en français dans le format suivant : 
 * 										Jeudi, le 1 juin 2023
 */
export function formaterDate(jour) {
	const jour1 = jour.toLocaleDateString('fr-CA', 
									{ 
										weekday: 'long', 
										day:'numeric', 
										month: 'long', 
										year: 'numeric' 
									}
								);
	let jour2 = jour1.charAt(0).toUpperCase() + jour1.slice(1);
	let jour3 = jour2.replace(/ /, ', le ');
	return jour3;
}

/**
 * Date du jour précédent dans le format AAAAMMJJ.
 * @param {Date} date Objet Date JavaScript
 * @param {Date} premier Objet Date JavaScript
 * @returns {string} Date précédente ou false si elle est inférieure à la date du premier jour
 */
export function jourPrecedent(date, premier) {
	let nDate = new Date(date.getTime());
	nDate.setDate(nDate.getDate()-1);
	return (formaterDateNumerique(nDate)>=formaterDateNumerique(premier)) ? nDate : false;
}

/**
 * Date du jour suivant dans le format AAAAMMJJ.
 * @param {Date} date Objet Date JavaScript
 * @param {Date} dernier Objet Date JavaScript
 * @returns {string} Date suivante ou false si elle est supérieure à la date du dernier jour
 */
export function jourSuivant(date, dernier) {
	let nDate = new Date(date.getTime());
	nDate.setDate(nDate.getDate()+1);
	return (formaterDateNumerique(nDate)<=formaterDateNumerique(dernier)) ? nDate : false;
}

/**
 * Les messages de l'application.
 */
export const MESSAGES = {
	'e1000'     :  {
		'type'  :  'succes',
		'texte' :  "Allo toi 😃"
	},
	'e1010'     :  {
			'type'  :  'info',
			'texte' :  "Bye... 😥"
	},
	'e1020'     :  {
			'type'  :  'avertissement',
			'texte' :  "Connecte-toi 🙏"
	},
	'e1030'     :  {
			'type'  :  'erreur',
			'texte' :  "Pas question ! 😡"
	},
	'e2000'     :  {
			'type'  :  'succes',
			'texte' :  "Tiguidou 🙏"
	},
	'e2010'     :  {
			'type'  :  'info',
			'texte' :  "À la poubelle ! 😌"
	},
	'e2030'     :  {
		'type'  :  'erreur',
		'texte' :  "Peut faire mieux 😕"
	},
	'e2040'     :  {
		'type'  :  'erreur',
		'texte' :  "Pas à toi ! 🤦"
	}
}