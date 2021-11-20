import React, { useState } from 'react';
import './TextPanel.css';
import RandomQuote from './RandomQuote';

const TextPanel = (props) => {
	function checkIfButtonValueIsAuthor(testAuthor, realAuthor) {
		console.log('testAuthor, realAuthor');
		if (testAuthor === realAuthor) {
			console.log('true');
			return true;
		} else {
			console.log('not the author');
			return false;
		}
	}
	const [ buttonColor, setButtonColor ] = useState('black');

	return (
		<div className="text-panel">
			<RandomQuote author={props.author} quote={props.quote} />
			<section className="option-panel">
				{props.allAuthors.map((author, index) => (
					<button
						style={{ backgroundColor: buttonColor }}
						// on click function
						onClick={() => {
							console.log(index);
							if (checkIfButtonValueIsAuthor(author, props.author)) {
								setButtonColor('darkgreen');
								setTimeout(() => {
									setButtonColor('black');
								}, 1500);
							} else {
								setButtonColor('#ff0000');
								setTimeout(() => {
									setButtonColor('black');
								}, 1000);
							}
						}}
					>
						{/* rules for setting the button to prevent blank buttons */}
						{author === null && author !== props.author ? ' Jesus ' : author === null ? 'N/A' : author}
					</button>
				))}
			</section>
		</div>
	);
};

export default TextPanel;
