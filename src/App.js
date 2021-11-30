import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TextPanel from './Components/TextPanel';
import Title from './Components/Title';
import Counter from './Components/Counter';
import { connect } from 'react-redux';

function App(props) {
	// set up quotes araay and set displayed quote

	const [ quotes, setQuotes ] = useState({});
	const [ currentQuote, setCurrentQuote ] = useState('');
	const [ currentAuthor, setCurrentAuthor ] = useState('');
	const [ showQuote, setShowQuote ] = useState(false);

	// array of authors to be set as the correct author and 3 random authors then randomized
	let [ allAuthors, setAllAuthors ] = useState([]);

	const replaceNull = (author) => {
		if (author === null) {
			return 'Unknown';
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
	let [ keys, setKeys ] = useState([]);

	//function to set the keys to random numbers from 1- 1000
	const setRandomKeys = () => {
		let randomKeys = [];
		for (let i = 0; i < 4; i++) {
			randomKeys.push(Math.floor(Math.random() * 1000) + 1);
		}
		setKeys(randomKeys);
	};

	// fuction to restart the round

	const handleRoundStart = (evt) => {
		props.dispatch({
			type: 'ROUND_START'
		});
	};

	// if round started
	if (props.roundOver === false) {
		return (
			<div className="app">
				<Title />
				<TextPanel
					displayQuote={showQuote}
					allAuthors={allAuthors}
					keys={keys}
					// if the main button is clicked show the quote
					quote={showQuote ? currentQuote : 'Click to see a random quote'}
					author={showQuote ? currentAuthor : 'N/A'}
					letter={[ 'A', 'B', 'C', 'D' ]}
				/>
				<div>
					<Counter />
				</div>
			</div>
		);
	} else {
		return (
			<div className="app">
				<Title />
				<TextPanel
					displayQuote={showQuote}
					allAuthors={allAuthors}
					keys={keys}
					quote={showQuote ? currentQuote : 'Click to see a random quote'}
					author={showQuote ? currentAuthor : 'N/A'}
					letter={[ 'A', 'B', 'C', 'D' ]}
				/>
				<div>
					<Counter />
					<a
						href
						class="gameButton"
						onClick={() => {
							handleRoundStart();
							setRandomKeys();
							let correctAuthorIndex = Math.floor(Math.random() * 1643);
							setShowQuote(true);
							setCurrentQuote(quotes[correctAuthorIndex].text);
							setCurrentAuthor(
								quotes[correctAuthorIndex].author === null
									? 'Unknown'
									: quotes[correctAuthorIndex].author
							);
							setAllAuthors(
								[
									quotes[Math.floor(Math.random() * 1643)].author,
									quotes[Math.floor(Math.random() * 1643)].author,
									quotes[Math.floor(Math.random() * 1643)].author,
									quotes[correctAuthorIndex].author
								]
									.sort(() => Math.random() - 0.5)
									.map((author) => {
										return replaceNull(author);
									})
							);
						}}
					>
						<span />
						<span />
						<span />
						<span />
						New Quote
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		count: state.count,
		roundOver: state.roundOver
	};
};

export default connect(mapStateToProps)(App);
