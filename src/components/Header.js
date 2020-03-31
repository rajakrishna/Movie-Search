import React from "react";
import Search from "./Search";

const Header = props => {
	return (
		<header className="App-header">
			<h2 className="h-text">{props.text}</h2>
			<Search search={props.search} />
		</header>
	);
};

export default Header;
