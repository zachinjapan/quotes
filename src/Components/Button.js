import { useState } from "react";
import { connect } from "react-redux";

const Button = (props) => {
  const handleInc = (evt) => {
    props.dispatch({
      type: "INCREMENT",
    });
  };
  const handleReset = (evt) => {
    props.dispatch({
      type: "RESET",
    });
  };

  function clickHandler() {
    return checkIfButtonValueIsAuthor(props.author, props.realAuthor);
  }

  function changeButtonColor(trueOrFalse) {
    if (trueOrFalse) {
      setButtonColor("green");
    } else {
      setButtonColor("#ff0000");
    }
  }

  //   button color value
  const [buttonColor, setButtonColor] = useState("black");

  //  button disabled value

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // check if button clicked is correct
  function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
    if (testAuthor == realAuthor) {
      console.log("correct");
      changeButtonColor(true);
      setButtonDisabled(true);
      handleInc();
      return true;
    } else {
      console.log("incorrect");
      changeButtonColor(false);
      setButtonDisabled(true);
      handleReset();
      return false;
    }
  }

  return (
    <button
      style={{ backgroundColor: buttonColor }}
      disabled={buttonDisabled}
      onClick={clickHandler}
    >
      {`${props.letter}: ${props.author}`}
    </button>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
});

export default connect(mapStateToProps)(Button);
