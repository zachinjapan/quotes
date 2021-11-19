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
  const [randomNumber, setRandomNumber] = useState(222);
  const [showQuote, setShowQuote] = useState(false);

  // array of authors
  let [allAuthors, setAllAuthors] = useState([]);

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
        allAuthors={allAuthors}
        quote={showQuote ? currentQuote : "Click to see a random quote"}
        author={showQuote ? currentAuthor : "N/A"}
      />
      <div>
        <button
          onClick={
            (() =>
              setRandomNumber(
                // random number to pick quote
                Math.floor(Math.random() * 1643)
              ),
            // showing the quote on the main page
            setShowQuote(true),
            // setting the current quote and author
            setCurrentQuote(quotes[randomNumber].text),
            setCurrentAuthor(quotes[randomNumber].author),
            setAllAuthors([
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[randomNumber].author,
            ]),
            console.log(allAuthors))
          }
        >
          New Random Quote
        </button>
      </div>
    </div>
  );
}

export default App;
