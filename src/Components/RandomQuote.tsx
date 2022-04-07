import "./RandomQuote.css";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const RandomQuote = (props: any) => {
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
      <a
        className="twitter-share-button"
        href={twitterUrl}
        data-size="large"
        target={"_blank"}
      >
        Tweet
        <FontAwesomeIcon icon={faTwitterSquare} size="1x" />
      </a>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    roundOver: state.roundOver,
    quoteType: state.quoteType,
  };
};

export default connect(mapStateToProps)(RandomQuote);
