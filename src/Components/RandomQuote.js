import "./RandomQuote.css";

const RandomQuote = (props) => {
  return (
    <div className="random-quote">
      <p className="random-quote-text">"{props.quote}"</p>
      {/* just for testing */}
      <h1> {props.author}</h1>
    </div>
  );
};

export default RandomQuote;
