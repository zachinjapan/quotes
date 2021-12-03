import { useState } from "react";
import { connect } from "react-redux";

const AuthorButton = (props) => {
  // -----------------------------------------------------------------------------
  // variables
  // -----------------------------------------------------------------------------

  const [buttonColor, setButtonColor] = useState("#303131");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // -----------------------------------------------------------------------------
  // redux functions
  // -----------------------------------------------------------------------------

  const handleRoundOver = (evt) => {
    props.dispatch({
      type: "ROUND_OVER",
    });
  };

  // -----------------------------------------------------------------------------
  // event handlers
  // -----------------------------------------------------------------------------

  function clickHandler() {
    return checkIfButtonValueIsAuthor(props.author, props.realAuthor);
  }
  // -----------------------------------------------------------------------------
  // helper functions
  // -----------------------------------------------------------------------------
  function changeButtonColor(trueOrFalse) {
    if (trueOrFalse) {
      setButtonColor("#3AC357");
    } else {
      setButtonColor("#EE3116");
    }
  }

  // check if button clicked is correct
  function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
    if (testAuthor === realAuthor) {
      changeButtonColor(true);
      setButtonDisabled(true);
      handleRoundOver();
      return true;
    } else {
      changeButtonColor(false);
      setButtonDisabled(true);
      handleRoundOver();
      return false;
    }
  }

  // what to show if the user has not clicked the button yet
  if (props.roundOver) {
    return (
      <button
        style={{
          backgroundColor:
            props.author === props.realAuthor ? "#3AC357" : "#EE3116",
          margin: "20px",
        }}
        disabled={true}
      >
        {`${props.letter}: ${props.author}`}
      </button>
    );

    // what to show if  the user has clicked the button
  } else {
    return (
      <button
        style={{ backgroundColor: buttonColor, margin: "20px" }}
        disabled={buttonDisabled}
        onClick={clickHandler}
      >
        {`${props.letter}: ${props.author}`}
      </button>
    );
  }
};

const mapStateToProps = (state) => ({
  roundOver: state.roundOver,
});

export default connect(mapStateToProps)(AuthorButton);
