/**
 * Affiche le score actuel du joueur.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {number} props.score - Le score actuel à afficher.
 * @returns {JSX.Element} Un élément div contenant le score.
 */
export default function Score({ score }) {
  return <div className="score">Score : {score}</div>;
}
