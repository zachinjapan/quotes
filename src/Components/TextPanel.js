import React, { useState } from "react";
import "./TextPanel.css";
import RandomQuote from "./RandomQuote";
import OptionButton from "./OptionButton";

const TextPanel = (props) => {
  return (
    <div className="text-panel">
      <RandomQuote author={props.author} quote={props.quote} />
      <div className="option-panel">
        {/* always the right button */}
        <OptionButton letter="A " text={props.author} />
        <OptionButton letter="B " text={props.incorrectAuthor1} />
        <OptionButton letter="C " text={props.incorrectAuthor2} />
        <OptionButton letter="D " text={props.incorrectAuthor3} />
      </div>
    </div>
  );
};

export default TextPanel;
