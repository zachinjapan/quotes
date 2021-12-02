import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";
import Title from "./Components/Title";
import Counter from "./Components/Counter";
import { connect } from "react-redux";

function App(props) {
  // set up quotes araay and set displayed quote
  const [quotes, setQuotes] = useState({});
  const [allMovieQuotes, setAllMovieQuotes] = useState({});
  const [allFamousQuotes, setAllFamousQuotes] = useState({});
  // these are pulled from the above states
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [correctAuthorIndex, setCorrectAuthorIndex] = useState(
    Math.floor(Math.random() * 100)
  );

  // array of authors to be set as the correct author and 3 random authors then randomized
  let [allAuthors, setAllAuthors] = useState([]);

  const replaceNull = (author) => {
    if (author === null) {
      return "Unknown";
    } else {
      return author;
    }
  };

  let [indexOfAuthorChecked, setIndexOfAuthorChecked] = useState(0);

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

  // get the quotes from the famous quotes api
  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios(`https://type.fit/api/quotes`);
      setAllFamousQuotes(result.data);
      setQuotes(result.data);
    };

    const fetchMovieQuotes = async () => {
      const movieQuotes = require("movie-quotes");
      let data = movieQuotes.all;
      // take that array and make it into an object with the quote and the author (like the famous quotes api)
      data = data.map((quote) => {
        let splitArr = quote.split('" ');
        return { text: splitArr[0], author: splitArr[1] };
      });
      setAllMovieQuotes(data);
    };

    fetchMovieQuotes();
    fetchQuotes();
  }, []);

  // get quotes from the movie quotes api
  useEffect(() => {}, []);

  // set 4 random numbers to used as the keys so that buttons rerender each time
  let [keys, setKeys] = useState([]);

  //function to set the keys to random numbers from 1- 1000
  const setRandomKeys = () => {
    let randomKeys = [];
    for (let i = 0; i < 4; i++) {
      randomKeys.push(Math.floor(Math.random() * 1000) + 1);
    }
    setKeys(randomKeys);
  };

  // fuction to restart the round

  const handleRoundStart = (evt) => {
    props.dispatch({
      type: "ROUND_START",
    });
  };

  // function to test which quote api data to use

  const handleQuoteTypeCheck = () => {
    checkQuoteType();
  };

  const checkQuoteType = () => {
    if (props.quoteType === "famous") {
      console.log(" found famous and setting current quote");
      setQuotes(allFamousQuotes);
      return;
    } else if (props.quoteType === "movie") {
      console.log("its movie");
      setQuotes(allMovieQuotes);
      return;
    }
  };

  // if round started (the user has clicked new quote)
  if (props.roundOver === false) {
    return (
      <div className="app">
        <Title />
        <TextPanel
          displayQuote={showQuote}
          allAuthors={allAuthors}
          keys={keys}
          // if the main button is clicked show the quote
          quote={showQuote ? currentQuote : "Click to see a random quote"}
          author={showQuote ? currentAuthor : "N/A"}
          letter={["A", "B", "C", "D"]}
        />
        <div>
          <Counter />
        </div>
      </div>
    );

    // what to show  if the round is over(the user has clicked ag Author Button)
  } else {
    return (
      <div className="app">
        <Title />
        <TextPanel
          displayQuote={showQuote}
          allAuthors={allAuthors}
          keys={keys}
          quote={showQuote ? currentQuote : "Click to see a random quote"}
          author={showQuote ? currentAuthor : "N/A"}
          letter={["A", "B", "C", "D"]}
        />
        <div>
          <Counter />
          <div
            className="gameButton"
            onClick={() => {
              handleQuoteTypeCheck();
              handleRoundStart();
              setCorrectAuthorIndex(
                Math.floor(
                  Math.random() * (props.quoteType === "famous" ? 1643 : 100)
                )
              );
              console.log(correctAuthorIndex);
              console.log(props.quoteType);
              console.log("all famous quotes", allFamousQuotes);
              console.log("all movie quotes", allMovieQuotes);
              setShowQuote(true);
              setCurrentQuote(quotes[correctAuthorIndex].text);
              console.log(quotes[correctAuthorIndex].text);
              setCurrentAuthor(
                quotes[correctAuthorIndex].author === null
                  ? "Unknown"
                  : quotes[correctAuthorIndex].author
              );
              console.log("fine after set current author");
              setAllAuthors(
                [
                  quotes[
                    Math.floor(
                      Math.random() *
                        (props.quoteType === "famous" ? 1643 : 100)
                    )
                  ].author,
                  quotes[
                    Math.floor(
                      Math.random() *
                        (props.quoteType === "famous" ? 1643 : 100)
                    )
                  ].author,
                  quotes[
                    Math.floor(
                      Math.random() *
                        (props.quoteType === "famous" ? 1643 : 100)
                    )
                  ].author,
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
              console.log("finisehd setting all authors");

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
    quoteType: state.quoteType,
  };
};

export default connect(mapStateToProps)(App);
