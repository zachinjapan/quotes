import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";

function App() {
  // api stuff

  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");

  // ths to be used to pick a random quote
  const [randomNumber, setRandomNumber] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // array of wrong authors

  let [wrongAuthor1, setWrongAuthor1] = useState("");
  let [wrongAuthor2, setWrongAuthor2] = useState("");
  let [wrongAuthor3, setWrongAuthor3] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios(`https://type.fit/api/quotes`);
      setQuotes(result.data);
    };

    fetchQuotes();
  }, []);

  //

  return (
    <div className="app">
      <h1 className="title">Who said this famous quote?</h1>
      <TextPanel
        incorrectAuthor1={wrongAuthor1}
        incorrectAuthor2={wrongAuthor2}
        incorrectAuthor3={wrongAuthor3}
        quote={showQuote ? currentQuote : "Click to see a random quote"}
        author={showQuote ? currentAuthor : "N/A"}
      />
      <div className="button-panel">
        <button
          onClick={() =>
            setRandomNumber(
              // random number to pick quote
              Math.floor(Math.random() * 1643),
              // showing the quote on the main page
              setShowQuote(true),
              // setting the current quote and author
              setCurrentQuote(quotes[randomNumber].text),
              setCurrentAuthor(quotes[randomNumber].author),

              // setting the wrong authors
              setWrongAuthor1(quotes[Math.floor(Math.random() * 1643)].author),
              setWrongAuthor2(quotes[Math.floor(Math.random() * 1643)].author),
              setWrongAuthor3(quotes[Math.floor(Math.random() * 1643)].author)
            )
          }
        >
          New Random Quote
        </button>
      </div>
    </div>
  );
}

export default App;
