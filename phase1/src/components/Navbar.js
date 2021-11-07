import React, { useState, useEffect } from 'react';
import { HomeIcon, UserGroupIcon } from '@heroicons/react/solid';
import CustomLink from './CustomLink';
import GroupLink from './CommunityLink';

export default function Navbar(props) {
	const [enrolledGroups, setEnrolledGroups] = useState(null);

	useEffect(() => {
		setEnrolledGroups([
			{
				path: 'csc309',
				name: 'CSC309',
				description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
				memberCount: 1012,
				imageUrl: 'groups/csc309.jpg'
			},
			{
				path: 'WebDevClub',
				name: 'Web Dev Club',
				description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
				memberCount: 405,
				imageUrl: 'groups/webdev.jpg'
			}
		]);
	}, []);

	return (
		<div className="navigation" ref={props.elementRef}>
			<nav>
				<ul>
					<li>
						<CustomLink to="/"><HomeIcon /><span>Home</span></CustomLink>
					</li>
					<li>
						<CustomLink to="/friends"><UserGroupIcon /> Friends</CustomLink>
					</li>
					<li>
						<CustomLink to="/admin">Admin Homepage</CustomLink>
					</li>
					<li>
						<CustomLink to="/random">404 Page</CustomLink>
					</li>
				</ul>
			</nav>
			<div className="groupContainer">
				<h1 className="subtleHeading">Your Groups</h1>
				{enrolledGroups && enrolledGroups.map((group, index) =>
					<GroupLink key={index} path={group.path} name={group.name} imageUrl={group.imageUrl} />
				)}
			</div>
		</div>
	);
}
