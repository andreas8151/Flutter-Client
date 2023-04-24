export default function ButtonIcon({ handleClick, icon, className }) {
  return (
    <span
      className={`button_icon${className ? " " + className : ""}`}
      onClick={handleClick}
    >
      {icon}
    </span>
  );
}
