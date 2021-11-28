// counter react component
import React, { useState } from "react";
import { connect } from "react-redux";

const Counter = (props) => {
  return (
    <div>
      <h1
        style={{
          color: "white",
        }}
      >
        Correct in a row Count: {props.count}
      </h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
});

export default connect(mapStateToProps)(Counter);
