export default function Button({ title, handler }) {
  return (
    <button className="functionButton" onClick={handler}>
      {title}
    </button>
  );
}
