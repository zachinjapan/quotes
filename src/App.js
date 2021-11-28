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
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");

  // ths to be used to show the quote once the user starts the app
  const [showQuote, setShowQuote] = useState(false);

  // array of authors to be set as the correct author and 3 random authors then randomized
  let [allAuthors, setAllAuthors] = useState([]);

  // function to replace null and identical authors with "Unknown"
  const replaceNull = (author) => {
    if (author === null) {
      return "Unknown";
    } else {
      return author;
    }
  };
  // get the quotes from the api
  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios(`https://type.fit/api/quotes`);
      setQuotes(result.data);
    };

    fetchQuotes();
  }, []);

  // set 4 random numbers to used as the keys so that buttons rerender each time
  let [keys, setKeys] = useState([]);

  //functin to set the keys to random numbers from 1- 1000
  const setRandomKeys = () => {
    let randomKeys = [];
    for (let i = 0; i < 4; i++) {
      randomKeys.push(Math.floor(Math.random() * 1000) + 1);
    }
    setKeys(randomKeys);
  };

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
        <button
          onClick={() => {
            setRandomKeys();
            let random = Math.floor(Math.random() * 1643);
            setShowQuote(true);
            // setting the current quote and author
            setCurrentQuote(quotes[random].text);
            setCurrentAuthor(
              quotes[random].author === null ? "Unknown" : quotes[random].author
            );
            // setting the all authors array, randmomizing the authors, and setting the final authors array to pass down
            setAllAuthors(
              [
                quotes[Math.floor(Math.random() * 1643)].author,
                quotes[Math.floor(Math.random() * 1643)].author,
                quotes[Math.floor(Math.random() * 1643)].author,
                quotes[random].author,
              ]
                .sort(() => Math.random() - 0.5)
                .map((author) => {
                  return replaceNull(author);
                })
            );
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);
