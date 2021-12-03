import "./RandomQuote.css";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const RandomQuote = (props) => {
  let twitterUrl =
    "https://twitter.com/intent/tweet?text=" +
    props.quote +
    " - " +
    props.author +
    "&url=https://quotequiz.netlify.app";

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

const mapStateToProps = (state) => {
  return {
    roundOver: state.roundOver,
    quoteType: state.quoteType,
  };
};

export default connect(mapStateToProps)(RandomQuote);
