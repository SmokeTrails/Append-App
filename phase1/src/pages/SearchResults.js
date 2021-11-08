import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Search from '../components/Search'
import FriendPreview from '../components/FriendPreview'
import CommunityPreview from '../components/CommunityPreview';

export default function SearchResults() {
	// Users need to be fetched from backend
	const [users, setUsers] = useState([
		{
			name: 'Haider',
			username: 'user'
		},
		{
			name: 'Alex D',
			username: 'AlexDobbin'
		},
		{
			name: 'Joshua Lee',
			username: 'Marvin'
		},
		{
			name: 'Kirill',
			username: 'KirillTregubov',
			imageUrl: 'users/kirill.png'
		},
		{
			name: 'Mohsin',
			username: 'SmokeTrails'
		},
		{
			name: 'Rehan',
			username: 'TheRayman786'
		}
	])

	// Communities need to be fetched from backend
	const [communities, setCommunities] = useState([
		{
			path: 'csc309',
			name: 'CSC309',
			description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
			memberCount: 1012,
			imageUrl: 'communities/csc309.jpg'
		},
		{
			path: 'csc301',
			name: 'CSC301',
			description: "An introduction to agile development methods appropriate for medium-sized teams and rapidly-moving projects. Basic software development infrastructure; requirements elicitation and tracking; estimation and prioritization; teamwork skills; basic UML; design patterns and refactoring; security, discussion of ethical issues, and professional responsibility.",
			memberCount: 536,
			imageUrl: 'communities/csc301.jpg'
		},
		{
			path: 'AnimeClub',
			name: 'Anime Club',
			description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
			memberCount: 1998,
			imageUrl: 'communities/anime.jpg'
		},
		{
			path: 'WebDevClub',
			name: 'Web dev Club',
			description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
			memberCount: 405,
			imageUrl: 'communities/webdev.jpg'
		}
	])

	const query = useParams().query;
	const matchingCommunities = communities.filter((community) => community.name.toLowerCase().includes(query.toLowerCase()))
	const matchingUsers = users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))

	return (
		<div>
			<Search query={query} />
			<h1 className="heading"> Users </h1>
			<MatchingProfiles users={matchingUsers} />
			<h1 className="heading"> Communities </h1>
			<MatchingCommunities communities={matchingCommunities} />
		</div>
	)
}

function MatchingProfiles(props) {
	if (props.users.length === 0) {
		return <h3> No users found. </h3>
	} else {
		return (
			<div>
				{props.users && props.users.map((user, index) =>
					<div key={index}>
						<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
					</div>
				)}
			</div>
		)
	}
}

function MatchingCommunities(props) {
	if (props.communities.length === 0) {
		return <h3> No communities found. </h3>
	} else {
		return (
			<div>
				{props.communities && props.communities.map((community, index) =>
					<CommunityPreview key={index} path={community.path} name={community.name} description={community.description} memberCount={community.memberCount} imageUrl={community.imageUrl} />
				)}
			</div>
		)
	}
}
