import React, { useState } from "react";
import "../Components/Counter.css";

const Counter = (props) => {
  return (
    <div>
      <p className="counter-text">Correct answers: {props.count}</p>
    </div>
  );
};

export default Counter;
