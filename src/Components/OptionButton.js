const OptionButton = (props) => {
  return (
    <button className="option-button">
      {props.letter}
      {props.text}
    </button>
  );
};

export default OptionButton;
