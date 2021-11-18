import "./RandomQuote.css";

const RandomQuote = (props) => {
  if (props.author === null) {
    return (
      <div className="random-quote">
        <p className="random-quote-text">"{props.quote}"</p>
        <h5>N/A</h5>
      </div>
    );
  } else {
    return (
      <div className="random-quote">
        <p className="random-quote-text">"{props.quote}"</p>
        <h5>-{props.author}</h5>
      </div>
    );
  }
};

export default RandomQuote;
