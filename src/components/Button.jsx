const Button = ({ id, label, onClick }) => {
    return (
        <button id={id} className="button" onClick={() => onClick(label)}>
          {label}
        </button>
    );
}

export default Button;