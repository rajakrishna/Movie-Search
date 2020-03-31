import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

// Here is your key: 986aab81

// Please append it to all of your API requests,

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=986aab81

const MOVIE_API_URL = "https://www.omdbapi.com/?s='ride'&apikey=986aab81";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				setMovies(jsonResponse.Search);
				setLoading(false);
			});
	}, []);

	const search = searchValue => {
		setLoading(true);
		setErrorMessage(null);

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=986aab81`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					setMovies(jsonResponse.Search);
					setLoading(false);
				} else {
					setErrorMessage(jsonResponse.Error);
					setLoading(false);
				}
			});
	};

	return (
		<div className="App">
			<Header text="Movie Search" search={search} />
			<p className="App-intro">Sharing a few of our favourite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => (
						<Movie key={`${index}-${movie.Title}`} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};

export default App;
