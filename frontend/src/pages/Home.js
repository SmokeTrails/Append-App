import React, { useState, useEffect, useContext } from 'react';
// import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import UserContext from '../hooks/UserContext';
import { getSuggestedCommunities } from '../hooks/Api';
// import CustomLink from '../components/CustomLink';
import CommunityPreview from '../components/CommunityPreview';
import Search from '../components/Search';
import './Home.css';

export default function Home() {
	const user = useContext(UserContext);
	// const [updates, setUpdates] = useState(null);
	const [recommendedCommunities, setRecommendedCommunities] = useState(null);

	useEffect(() => {
		if (user.stale) {
			return;
		}

		getSuggestedCommunities().then(communities => {
			setRecommendedCommunities(communities);
		})
	}, [user]);

	// useEffect(() => {
	// 	// Updates need to be fetched from backend
	// 	setUpdates([
	// 		{
	// 			content: 'Mohsin created a post in CSC309',
	// 			link: '/community/csc309'
	// 		},
	// 		{
	// 			content: 'Alex joined Anime Club',
	// 			link: '/community/AnimeClub'
	// 		},
	// 	]);
	// }, []);

	return (
		<div>
			<h1 className="heading">Welcome back, {user.name}!</h1>
			<Search query="" />
			<div>
				{/* <div className="updateScreen">
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
				</div> */}
				<h1 className="heading">Suggested Communities</h1>
				<div>
					{recommendedCommunities && recommendedCommunities.map((group, index) =>
						<CommunityPreview key={index} path={group.path} name={group.name} description={group.description} memberCount={group.members.length} imageUrl={group.imageUrl} />
					)}
				</div>
			</div>
		</div>
	);
}
