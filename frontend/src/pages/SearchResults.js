import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Search from '../components/Search';
import FriendPreview from '../components/FriendPreview';
import CommunityPreview from '../components/CommunityPreview';
import env from '../config.js'
const api_host = env.api_host

export default function SearchResults() {
	// Users need to be fetched from backend
	const query = useParams().query;
	const [isLoading, setIsLoading] = useState(true)
	const [users, setUsers] = useState([])

	// Communities need to be fetched from backend
	const [communities, setCommunities] = useState([])

	useEffect(() => {
		console.log(users)
	}, [users]);

	useEffect(() => {
		setIsLoading(true);
	}, [query]);

	useEffect(() => {
		if (isLoading === true) {
			fetch(`${api_host}/users`)
			.then(res => {
				// console.log("The status is", res.status)
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(json => {
				console.log("Users found: ", json)
				if (json) {
					setUsers(json.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()) || user.name.toLowerCase().includes(query.toLowerCase())))
				}
			})
			.catch(error => {
				console.log(error);
				setIsLoading(false);
				return;
			});
			fetch(`${api_host}/community`)
			.then(res => {
				// console.log("The status is", res.status)
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(json => {
				console.log("Communities found: ", json)
				if (json) {
					setCommunities(json.filter((community) => community.name.toLowerCase().includes(query.toLowerCase())))
					setIsLoading(false)
				}
			})
			.catch(error => {
				console.log(error);
				setIsLoading(false);
				return;
			});
		}
	}, [isLoading]);

	return (
		<div>
			{
				isLoading ? 'Loading...'
				: <div> <Search query={query} />
				<h1 className="heading"> Users </h1>
				<MatchingProfiles users={users} />
				<h1 className="heading"> Communities </h1>
				<MatchingCommunities communities={communities} /> </div>
			}
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
						<FriendPreview simple={false} name={user.name} username={user.username} imageUrl={user.imageUrl} />
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
					<CommunityPreview key={index} path={community.path} name={community.name} description={community.description} memberCount={community.members.length} imageUrl={community.imageUrl} />
				)}
			</div>
		)
	}
}
