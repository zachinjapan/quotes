import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";
import Title from "./Components/Title";
import Counter from "./Components/Counter";
import { connect } from "react-redux";

function App(props) {
  // --------------------------------------------------------------------------------
  // variables
  //----------------------------------------------------------------------------------
  //  global state
  //
  // round over (true/false)
  // count (number)

  // local
  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [correctAuthorIndex, setCorrectAuthorIndex] = useState(
    Math.floor(Math.random() * 100)
  );
  // array of authors to be set as the correct author and 3 random authors then randomized
  let [allAuthors, setAllAuthors] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  let [indexOfAuthorChecked, setIndexOfAuthorChecked] = useState(0);
  // set 4 random numbers to used as the keys so that buttons rerender each time
  let [keys, setKeys] = useState([]);

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

  //function to set the keys to random numbers from 1- 1000
  const setRandomKeys = () => {
    let randomKeys = [];
    for (let i = 0; i < 4; i++) {
      randomKeys.push(Math.floor(Math.random() * 1000) + 1);
    }
    setKeys(randomKeys);
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
          keys={keys}
          // if the main button is clicked show the quote
          quote={gameStarted ? currentQuote : "Click to see a random quote"}
          author={gameStarted ? currentAuthor : "N/A"}
          letter={["A", "B", "C", "D"]}
        />
        <div>
          <Counter />
        </div>
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
          keys={keys}
          quote={gameStarted ? currentQuote : "Click to see a random quote"}
          author={gameStarted ? currentAuthor : "N/A"}
          letter={["A", "B", "C", "D"]}
        />
        <div>
          <Counter />
          <div
            className="gameButton"
            onClick={() => {
              handleRoundStart();
              setCorrectAuthorIndex(Math.floor(Math.random() * 1643));
              setGameStarted(true);
              setCurrentQuote(quotes[correctAuthorIndex].text);
              setCurrentAuthor(
                quotes[correctAuthorIndex].author === null
                  ? "Unknown"
                  : quotes[correctAuthorIndex].author
              );
              setAllAuthors(
                [
                  quotes[Math.floor(Math.random() * 1643)].author,
                  quotes[Math.floor(Math.random() * 1643)].author,
                  quotes[Math.floor(Math.random() * 1643)].author,
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
              setRandomKeys();
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
    count: state.count,
    roundOver: state.roundOver,
  };
};

export default connect(mapStateToProps)(App);
