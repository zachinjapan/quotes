
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./AuthorButton.css";


const AuthorButton = (props) => {
	// -----------------------------------------------------------------------------
	// variables
	// -----------------------------------------------------------------------------


  const notify = () =>
    toast("Nice Job! 👍", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });


	// -----------------------------------------------------------------------------
	// redux functions
	// -----------------------------------------------------------------------------

	const handleRoundOver = (evt) => {
		props.dispatch({
			type: 'ROUND_OVER'
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

  // check if button clicked is correct
  function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
    if (testAuthor === realAuthor) {
      notify();
      handleRoundOver();
      return true;
    } else {
      handleRoundOver();

			return false;
		}
	}

  return (
    <div style={{ display: "inline-block" }}>
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
          {props.author}
        </button>
      ) : (
        <button
          className="author-button"
          style={{ backgroundColor: "#303131", margin: "20px" }}
          disabled={false}
          onClick={clickHandler}
        >
          {props.author}
        </button>
      )}
    </div>
  );

};

const mapStateToProps = (state) => ({
	roundOver: state.roundOver
});

export default connect(mapStateToProps)(AuthorButton);
