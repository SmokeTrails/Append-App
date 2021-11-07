import React, { useState, useEffect } from 'react';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import CustomLink from '../components/CustomLink';
import CommunityPreview from '../components/CommunityPreview';
import './Home.css';

export default function Home() {
	const [user, setUser] = useState(null);
	const [updates, setUpdates] = useState(null);
	const [recommendedGroups, setRecommendedGroups] = useState(null);

	useEffect(() => {
		setUser('Haider');
		setUpdates([
			{
				content: 'Mohsin created a post in CSC309',
				link: '/group/csc309'
			},
			{
				content: 'Alex joined Anime Club',
				link: '/group/AnimeClub'
			},
		]);
		setRecommendedGroups([
			{
				path: 'csc309',
				name: 'CSC309',
				description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
				memberCount: 1012,
				imageUrl: 'groups/csc309.jpg'
			},
			{
				path: 'csc301',
				name: 'CSC301',
				description: "An introduction to agile development methods appropriate for medium-sized teams and rapidly-moving projects. Basic software development infrastructure; requirements elicitation and tracking; estimation and prioritization; teamwork skills; basic UML; design patterns and refactoring; security, discussion of ethical issues, and professional responsibility.",
				memberCount: 536,
				imageUrl: 'groups/csc301.jpg'
			},
			{
				path: 'AnimeClub',
				name: 'Anime Club',
				description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
				memberCount: 1998,
				imageUrl: 'groups/anime.jpg'
			},
			{
				path: 'WebDevClub',
				name: 'Web dev Club',
				description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
				memberCount: 405,
				imageUrl: 'groups/webdev.jpg'
			}
		]);
	}, []);

	return (
		<div>
			<h1 className="heading">Welcome back, {user}!</h1>
			<div>
				<div className="updateScreen">
					<h2 className="subheading">While you were gone...</h2>
					<ul>
						{updates && updates.map((update, index) =>
							<li key={index}>
								<CustomLink to={update.link} >
									<ArrowNarrowRightIcon />
									<div>{update.content}</div>
								</CustomLink>
							</li>
						)}
					</ul>
				</div>
				<h1 className="heading">Suggested Communities</h1>
				<div>
					{recommendedGroups && recommendedGroups.map((group, index) =>
						<CommunityPreview key={index} path={group.path} name={group.name} description={group.description} memberCount={group.memberCount} imageUrl={group.imageUrl} />
					)}
				</div>
			</div>
		</div>
	);
}
