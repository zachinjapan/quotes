import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";

function App() {
  // set up quotes araay and set displayed quote

  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");

  // ths to be used to show the quote
  const [showQuote, setShowQuote] = useState(false);

  // array of authors to be set as the correct author and 3 random authors
  let [allAuthors, setAllAuthors] = useState([]);

  // get the quotes from the api
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
        // if the main button is clicked show the quote
        quote={showQuote ? currentQuote : "Click to see a random quote"}
        author={showQuote ? currentAuthor : "N/A"}
      />
      <div>
        <button
          onClick={() => {
            let random = Math.floor(Math.random() * 1643);
            setShowQuote(true);
            // setting the current quote and author
            setCurrentQuote(quotes[random].text);
            setCurrentAuthor(quotes[random].author);
            // setting the all authors array
            setAllAuthors([
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[Math.floor(Math.random() * 1643)].author,
              quotes[random].author,
            ]);
            console.log(allAuthors);
          }}
        >
          New Random Quote
        </button>
      </div>
    </div>
  );
}

export default App;
