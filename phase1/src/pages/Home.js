import React, { useState, useEffect } from 'react';

export default function Home() {
	const [user, setUser] = useState(null);
	const [recommendedGroups, setRecommendedGroups] = useState(null);
	const [recommendedFriends, setRecommendedFriends] = useState(null);

	// useEffect(() => {
	// 	setUser('Haider');
	// }, []);

	return (
		<div>
			<h1>Welcome back, Haider</h1>
			<div>
				<h2>Recommended Groups</h2>
				<div></div>
			</div>
			<div>
				<h2>Recommended Friends</h2>
				<div></div>
			</div>
		</div>
	);
}
