import React, { useState } from "react";
import "./TextPanel.css";
import RandomQuote from "./RandomQuote";

const TextPanel = (props) => {
  return <RandomQuote author={props.author} quote={props.quote} />;
};

export default TextPanel;
