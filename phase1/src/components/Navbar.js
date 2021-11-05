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
					<CustomLink to="/about">About</CustomLink>
				</li>
				<li>
					<CustomLink to="/users">Users</CustomLink>
				</li>
				<li>
					<CustomLink to="/user/Haider">Profile</CustomLink>
				</li>
				<li>
					<CustomLink to="/random">404 Page</CustomLink>
				</li>
			</ul>
		</nav>
	);
}
