/**
 * 
 * Ne pas utiliser ce composant que pour générer des données de test.
 * 
 */
import { generer } from './code/admin';

export default function Admin() {
  return (
    <button onClick={generer}>Générer données de test</button>
  )
}