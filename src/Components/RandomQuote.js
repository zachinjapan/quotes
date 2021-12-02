import "./RandomQuote.css";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RandomQuote = (props) => {
  const handleQuoteTypeToFamous = (evt) => {
    props.dispatch({
      type: "CHANGE_QUOTE_TYPE_TO_FAMOUS",
    });
  };

  const handleQuoteTypeToMovie = (evt) => {
    props.dispatch({
      type: "CHANGE_QUOTE_TYPE_TO_MOVIE",
    });
  };

  let twitterUrl =
    "https://twitter.com/intent/tweet?text=" +
    props.quote +
    " - " +
    props.author +
    "&url=https://quotequiz.netlify.app";
  // let textTweet = props.quote;

  return (
    <div className="random-quote">
      <p className="random-quote-text">"{props.quote}"</p>
      {/* just for testing */}
      {/* <h1> {props.author}</h1> */}
      <a class="twitter-share-button" href={twitterUrl}>
        Tweet
        <FontAwesomeIcon icon={faTwitterSquare} size="1x" />
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      />
    </div>
  );
};

export default RandomQuote;
