import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";

function App() {
  // api stuff

  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      const result = await axios(`https://type.fit/api/quotes`);
      setQuotes(result.data);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="app">
      <h1 className="title"> Famous Quotes</h1>
      <TextPanel
        quote={showQuote ? currentQuote : "Click to see a random quote"}
        author={showQuote ? currentAuthor : "N/A"}
      />
      <div className="button-panel">
        <button
          onClick={() =>
            setRandomNumber(
              Math.floor(Math.random() * 1000),
              setShowQuote(true),
              setCurrentQuote(quotes[randomNumber].text),
              setCurrentAuthor(quotes[randomNumber].author)
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
