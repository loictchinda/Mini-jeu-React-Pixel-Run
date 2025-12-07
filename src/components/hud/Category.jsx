/**
 * Affiche la catégorie de la question actuelle.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.text - Le nom de la catégorie à afficher.
 * @returns {JSX.Element} Un élément div contenant le nom de la catégorie.
 */
export default function Category({ text }) {
  return <div className="category">Catégorie : {text}</div>;
}