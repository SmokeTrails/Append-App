import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Search.css';

export default function Search(props) {
	const navigate = useNavigate();
	const [query, setQuery] = useState(props.query);

	function handleKey(e) {
		if (e.key === 'Enter' || e.key === 'Return') {
			handleSearch();
		}
	}

	function handleSearch() {
		const path = `/search/${query}`;
		if (query.length > 0) {
			navigate(path);
		} else {
			alert("Search field cannot be empty!")
		}
	}

	return (
		<div className="Search">
			<input className="searchBar" type="text" placeholder="Search for a username or community" value={query} onChange={(event) => setQuery(event.target.value)} onKeyPress={handleKey} />
			<button className="searchButton" onClick={handleSearch}> Search </button>
		</div>
	)
}
