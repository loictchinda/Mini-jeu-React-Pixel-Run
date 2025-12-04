export default function Answers({ options }) {
  return (
    <div className="answers">
      {options.map((opt, i) => (
        <div key={i} className="answer">{opt}</div>
      ))}
    </div>
  );
}
