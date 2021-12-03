import { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthorButton = (props) => {
  // -----------------------------------------------------------------------------
  // variables
  // -----------------------------------------------------------------------------

  const [buttonColor, setButtonColor] = useState("#303131");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const notify = () =>
    toast("Nice Job! 👍", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
      notify();
      return true;
    } else {
      changeButtonColor(false);
      setButtonDisabled(true);
      handleRoundOver();

      return false;
    }
  }

  return (
    <div style={{ display: "inline-block" }}>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {props.roundOver ? (
        <button
          className="author-button"
          style={{
            backgroundColor:
              props.author === props.realAuthor ? "#3AC357" : "#EE3116",
            margin: "20px",
          }}
          disabled={true}
        >
          {`${props.letter}: ${props.author}`}
        </button>
      ) : (
        <button
          className="author-button"
          style={{ backgroundColor: buttonColor, margin: "20px" }}
          disabled={buttonDisabled}
          onClick={clickHandler}
        >
          {`${props.letter}: ${props.author}`}
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  roundOver: state.roundOver,
});

export default connect(mapStateToProps)(AuthorButton);
