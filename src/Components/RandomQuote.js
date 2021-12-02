import "./RandomQuote.css";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const RandomQuote = (props) => {
  const handleQuoteTypeToFamous = (evt) => {
    props.dispatch({
      type: "CHANGE_QUOTE_TYPE_TO_FAMOUS",
    });
    console.log(props.quoteType);
  };

  const handleQuoteTypeToMovie = (evt) => {
    props.dispatch({
      type: "CHANGE_QUOTE_TYPE_TO_MOVIE",
    });
    console.log(props.quoteType);
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
      <button className="TEST" onClick={handleQuoteTypeToFamous}>
        ///MAKES THE QUOTES FAMOUS
      </button>
      <button className="TEST" onClick={handleQuoteTypeToMovie}>
        ////MAKES THE QUOTES MOVIE BASED
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
    roundOver: state.roundOver,
    quoteType: state.quoteType,
  };
};

export default connect(mapStateToProps)(RandomQuote);
