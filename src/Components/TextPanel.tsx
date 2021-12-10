import "./TextPanel.css";
import RandomQuote from "./RandomQuote";
import AuthorButton from "./AuthorButton";

const TextPanel = (props: any) => {
  if (props.displayQuote) {
    return (
      <div className="container">
        <div className="text-panel">
          <RandomQuote author={props.author} quote={props.quote} />
        </div>
        <div className="button-panel">
          {props.allAuthors.map((author: string, index: number) => (
            <AuthorButton
              key={index}
              buttonColor={props.buttonColor}
              author={author}
              realAuthor={props.author}
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
