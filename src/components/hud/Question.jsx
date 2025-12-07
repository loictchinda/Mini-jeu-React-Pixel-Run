/**
 * Affiche le texte de la question actuelle dans une boîte stylisée.
 * Ce composant reçoit le texte de la question et un style optionnel (par exemple, pour ajuster la taille de la police).
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.text - Le texte de la question à afficher.
 * @returns {JSX.Element} Un élément div contenant la question.
 */
export default function Question({ text}) {
  return <div className="question">{text}</div>;
}
