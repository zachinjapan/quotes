import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";
import Title from "./Components/Title";
import { connect } from "react-redux";

function App(props) {
  // --------------------------------------------------------------------------------
  // variables
  //----------------------------------------------------------------------------------
  //  global state
  //
  // round over (true/false)

  // local
  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [correctAuthorIndex, setCorrectAuthorIndex] = useState(
    Math.floor(Math.random() * 1630)
  );
  // array of authors to be set as the correct author and 3 random authors then randomized
  let [allAuthors, setAllAuthors] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  let [indexOfAuthorChecked, setIndexOfAuthorChecked] = useState(0);

  // --------------------------------------------------------------------------------
  // helper functions
  //----------------------------------------------------------------------------------
  const replaceNull = (author) => {
    if (author === null) {
      return "Unknown";
    } else {
      return author;
    }
  };

  const replaceDuplicateAuthor = (author) => {
    if (
      author === quotes[correctAuthorIndex].author &&
      indexOfAuthorChecked !== 3
    ) {
      let newAuthor =
        quotes[
          Math.floor(
            Math.random() * (props.quoteType === "famous" ? 1643 : 100)
          )
        ].author;
      setIndexOfAuthorChecked((indexOfAuthorChecked += 1));
      return newAuthor;
    } else {
      setIndexOfAuthorChecked((indexOfAuthorChecked += 1));
      return author;
    }
  };

  // --------------------------------------------------------------------------------
  // api
  //----------------------------------------------------------------------------------
  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios(`https://type.fit/api/quotes`);
      setQuotes(result.data);
    };

    fetchQuotes();
  }, []);
  // --------------------------------------------------------------------------------
  //redux calls
  //----------------------------------------------------------------------------------

  const handleRoundStart = (evt) => {
    props.dispatch({
      type: "ROUND_START",
    });
  };

  // --------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------

  // if the user has not started the game yet / the round is over)
  if (props.roundOver === false) {
    return (
      <div className="app">
        <Title />
        <TextPanel
          displayQuote={gameStarted}
          allAuthors={allAuthors}
          // if the main button is clicked show the quote
          quote={gameStarted ? currentQuote : "Click to see a random quote"}
          author={gameStarted ? currentAuthor : "N/A"}
        />
        <div className="spacer"></div>
      </div>
    );

    // what to show before the user clicks an author button
  } else {
    return (
      <div className="app">
        <Title />
        <TextPanel
          displayQuote={gameStarted}
          allAuthors={allAuthors}
          quote={gameStarted ? currentQuote : "Click to see a random quote"}
          author={gameStarted ? currentAuthor : "N/A"}
        />
        <div>
          <div
            className="gameButton"
            onClick={() => {
              handleRoundStart();
              setCorrectAuthorIndex(Math.floor(Math.random() * 1630));
              setGameStarted(true);
              setCurrentQuote(quotes[correctAuthorIndex].text);
              setCurrentAuthor(
                quotes[correctAuthorIndex].author === null
                  ? "Unknown"
                  : quotes[correctAuthorIndex].author
              );
              setAllAuthors(
                [
                  quotes[Math.floor(Math.random() * 1630)].author,
                  quotes[Math.floor(Math.random() * 1630)].author,
                  quotes[Math.floor(Math.random() * 1630)].author,
                  quotes[correctAuthorIndex].author,
                ]
                  .map((author) => {
                    return replaceDuplicateAuthor(author);
                  })
                  .sort(() => Math.random() - 0.5)
                  .map((author) => {
                    return replaceNull(author);
                  })
              );

              setIndexOfAuthorChecked(0);
            }}
          >
            <span />
            <span />
            <span />
            <span />
            New
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roundOver: state.roundOver,
  };
};

export default connect(mapStateToProps)(App);
