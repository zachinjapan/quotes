import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TextPanel from "./Components/TextPanel";
import Title from "./Components/Title";

function App() {
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

  return (
    <div className="app">
      <Title />
      <TextPanel
        displayQuote={showQuote}
        allAuthors={allAuthors}
        // if the main button is clicked show the quote
        quote={showQuote ? currentQuote : "Click to see a random quote"}
        author={showQuote ? currentAuthor : "N/A"}
        letter={["A", "B", "C", "D"]}
      />
      <div>
        <button
          onClick={() => {
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
          New Random Quote
        </button>
      </div>
    </div>
  );
}

export default App;
