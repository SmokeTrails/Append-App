import React, { useState, useEffect } from 'react';
import GroupPreview from '../components/GroupPreview';

export default function Home() {
	const [user, setUser] = useState(null);
	const [recommendedGroups, setRecommendedGroups] = useState(null);
	// const [recommendedFriends, setRecommendedFriends] = useState(null);

	useEffect(() => {
		setUser('Haider');
		setRecommendedGroups([
			{
				id: 0,
				name: 'CSC309',
				description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
				memberCount: 1012,
				imageUrl: '/groups/csc309.png'
			},
			{
				id: 1,
				name: 'CSC301',
				description: "An introduction to agile development methods appropriate for medium-sized teams and rapidly-moving projects. Basic software development infrastructure; requirements elicitation and tracking; estimation and prioritization; teamwork skills; basic UML; design patterns and refactoring; security, discussion of ethical issues, and professional responsibility.",
				memberCount: 536,
				imageUrl: '/groups/csc301.png'
			},
			{
				id: 2,
				name: 'Anime Club',
				description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
				memberCount: 1998,
				imageUrl: '/groups/anime.png'
			},
			{
				id: 3,
				name: 'Web dev Club',
				description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
				memberCount: 405,
				imageUrl: '/groups/webdev.png'
			}
		]);
	}, []);

	return (
		<div>
			<div>
				<h1>Welcome back, {user}</h1>
				<div>
					<h2>Recommended Groups</h2>
					{ recommendedGroups && recommendedGroups.map((group) =>
						<div key={group.id}>
							<GroupPreview id={group.id} name={group.name} description={group.description} memberCount={group.memberCount} imageUrl={group.imageUrl} />
						</div>
					)}
				</div>
				<div>
					<h2>Recommended Friends</h2>
					<div></div>
				</div>
			</div>
		</div>
	);
}
