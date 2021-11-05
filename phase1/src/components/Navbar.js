import React from 'react';
import CustomLink from './CustomLink';

export default function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<CustomLink to="/">Home</CustomLink>
				</li>
				<li>
					<CustomLink to="/friends">Friends</CustomLink>
				</li>
				<li>
					<CustomLink to="/user/Haider">My Profile</CustomLink>
				</li>
				<li>
					<CustomLink to="/random">404 Page</CustomLink>
				</li>
			</ul>
		</nav>
	);
}
