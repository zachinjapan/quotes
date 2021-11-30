import { useState } from "react";
import { connect } from "react-redux";

const AuthorButton = (props) => {
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

  const handleRoundOver = (evt) => {
    props.dispatch({
      type: "ROUND_OVER",
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
    if (testAuthor === realAuthor) {
      console.log("correct");
      changeButtonColor(true);
      setButtonDisabled(true);
      handleInc();
      handleRoundOver();
      return true;
    } else {
      console.log("incorrect");
      changeButtonColor(false);
      setButtonDisabled(true);
      handleReset();
      handleRoundOver();
      return false;
    }
  }

  // what to show if round over is true
  if (props.roundOver) {
    return (
      <button
        style={{
          backgroundColor:
            props.author === props.realAuthor ? "green" : "#ff0000",
        }}
        disabled={true}
      >
        {`${props.letter}: ${props.author}`}
      </button>
    );

    // what to show if round over is false
  } else {
    return (
      <button
        style={{ backgroundColor: buttonColor }}
        disabled={buttonDisabled}
        onClick={clickHandler}
      >
        {`${props.letter}: ${props.author}`}
      </button>
    );
  }
};

const mapStateToProps = (state) => ({
  count: state.count,
  roundOver: state.roundOver,
});

export default connect(mapStateToProps)(AuthorButton);
