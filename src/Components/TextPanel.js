import "./TextPanel.css";
import RandomQuote from "./RandomQuote";
import AuthorButton from "./AuthorButton.js";

const TextPanel = (props) => {

	if (props.displayQuote) {
		return (
			<div className="container">
				<div className="text-panel">
					<RandomQuote author={props.author} quote={props.quote} />
				</div>
				<div className="button-panel">
					{props.allAuthors.map((author, index) => (
						<AuthorButton
							key={props.keys[index]}
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
