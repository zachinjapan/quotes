import "./TextPanel.css";
import RandomQuote from "./RandomQuote";
import Button from "./Button.js";

const TextPanel = (props) => {
  if (props.displayQuote) {
    return (
      <div className="text-panel">
        <RandomQuote author={props.author} quote={props.quote} />
        <div className="button-panel">
          {props.allAuthors.map((author, index) => (
            <Button
              key={index}
              buttonColor={props.buttonColor}
              author={author}
              realAuthor={props.author}
              letter={props.letter[index]}
            />
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className="text-panel">
        <RandomQuote author={props.author} quote={props.quote} />
      </div>
    );
};
export default TextPanel;
