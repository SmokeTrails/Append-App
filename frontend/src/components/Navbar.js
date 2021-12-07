import React, { useState, useEffect, useContext } from 'react';
import { HomeIcon, UserGroupIcon, PlusCircleIcon } from '@heroicons/react/solid';
import UserContext from '../hooks/UserContext';
import { getCommunityById } from "../hooks/Api";
import CommunityLink from './CommunityLink';
import CustomLink from './CustomLink';

export default function Navbar(props) {
	const user = useContext(UserContext);
	const [enrolledCommunities, setEnrolledCommunities] = useState(null);

	const getCommunities = (communityId) => {
		getCommunityById(communityId).then(community => {
			return community;
		}).catch(err => {
			console.log(err)
		});
	}

	const saveCommunities = () => {
		console.log('save')
	}

	const func1 = async () => {
		console.log('func 1')
		const promises = user.communities.map((communityId) => console.log(getCommunities(communityId)));
		await Promise.all(promises);
		saveCommunities();
	}

	/*
	useEffect(() => {
		// Enrolled Communities need to be fetched from backend
		if (user.stale) {
			return;
		}
		const communities = [];

		const promise = new Promise((resolve, reject) => {
			const length = user.communities.length;

			user.communities.forEach((communityId, index) => {
				getCommunityById(communityId).then(community => {
					communities.push(community);

					if (index === length - 1) resolve();
				}).catch(err => {
					console.log(err)
				});
			})
		})
		
		promise.then(() => {
			console.log(communities)
			setEnrolledCommunities(communities);
		});

		// setEnrolledCommunities([
		// 	{
		// 		path: 'csc309',
		// 		name: 'CSC309',
		// 		description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
		// 		memberCount: 1012,
		// 		imageUrl: 'communities/csc309.jpg'
		// 	},
		// 	{
		// 		path: 'AnimeClub',
		// 		name: 'Anime Club',
		// 		description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
		// 		memberCount: 1998,
		// 		imageUrl: 'communities/anime.jpg'
		// 	},
		// 	{
		// 		path: 'WebDevClub',
		// 		name: 'Web Dev Club',
		// 		description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
		// 		memberCount: 405,
		// 		imageUrl: 'communities/webdev.jpg'
		// 	}
		// ]);
	}, [user.communities]);*/

	return (
		<nav className="navigation">
			<div>
				<div>
					<ul>
						<li>
							<CustomLink to="/"><HomeIcon /><span>Home</span></CustomLink>
						</li>
						<li>
							<CustomLink to="/friends"><UserGroupIcon /> Friends</CustomLink>
						</li>
						<li>
							<CustomLink to="/community/create"><PlusCircleIcon /> Create Community</CustomLink>
						</li>
						{user.username === 'admin' && (
							<li>
								<CustomLink to="/admin">Admin Page</CustomLink>
							</li>
						)}
					</ul>
				</div>
				<div className="groupContainer">
					<h1 className="subtleHeading">Your Communities</h1>
					{enrolledCommunities && enrolledCommunities.map((group, index) =>
						<CommunityLink key={index} path={group.path} name={group.name} imageUrl={group.imageUrl} />
					)}
				</div>
			</div>
		</nav>
	);
}
