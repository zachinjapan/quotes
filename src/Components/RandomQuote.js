import "./RandomQuote.css";

const RandomQuote = (props) => {
  let twitterUrl =
    "https://twitter.com/intent/tweet?text=" +
    props.quote +
    " - " +
    props.author;

  return (
    <div className="random-quote">
      <p className="random-quote-text">"{props.quote}"</p>
      {/* just for testing */}
      <h1> {props.author}</h1>
      <a class="twitter-share-button" href={twitterUrl}>
        Tweet
      </a>
    </div>
  );
};

export default RandomQuote;
