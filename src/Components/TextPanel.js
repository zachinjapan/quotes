import React, { useState } from "react";
import "./TextPanel.css";
import RandomQuote from "./RandomQuote";
import OptionButton from "./OptionButton";

const TextPanel = (props) => {
  function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
    console.log(testAuthor, realAuthor);
    if (testAuthor === realAuthor) {
      console.log("true");
    } else {
      console.log("not the author");
    }
    return;
  }
  function check(author, real) {
    return () => {
      checkIfButtonValueIsAuthor(author, real);
    };
  }
  return (
    <div className="text-panel">
      <RandomQuote author={props.author} quote={props.quote} />
      <section className="option-panel">
        {props.allAuthors.map((author) => (
          <OptionButton text={author} onClick={check(author, props.author)} />
        ))}
      </section>
    </div>
  );
};

export default TextPanel;
