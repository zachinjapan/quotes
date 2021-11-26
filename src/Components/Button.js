import { useState } from "react";

const Button = (props) => {
  function clickHandler() {
    return checkIfButtonValueIsAuthor(props.author, props.realAuthor);
  }

  function changeButtonColor(trueOrFalse) {
    if (trueOrFalse) {
      setButtonColor("green");
      setTimeout(() => {
        setButtonColor("black");
      }, 200);
    } else {
      setButtonColor("#ff0000");
      setTimeout(() => {
        setButtonColor("black");
      }, 200);
    }
  }

  //   button values
  const [buttonColor, setButtonColor] = useState("black");

  // check if button clicked is correct
  function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
    if (testAuthor === realAuthor) {
      console.log("correct");
      changeButtonColor(true);
      return true;
    } else {
      console.log("incorrect");
      changeButtonColor(false);
      return false;
    }
  }

  return (
    <button style={{ backgroundColor: buttonColor }} onClick={clickHandler}>
      {`${props.letter}: ${props.author}`}
    </button>
  );
};

export default Button;
