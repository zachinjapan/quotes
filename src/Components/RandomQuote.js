import "./RandomQuote.css";

const RandomQuote = (props) => {
  return (
    <div className="random-quote">
      <p className="random-quote-text">"{props.quote}"</p>
    </div>
  );
};

export default RandomQuote;
