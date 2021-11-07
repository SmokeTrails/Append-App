import React from 'react';
import CustomLink from '../components/CustomLink';

export default function MissingPage(props) {
	return (
		<div>
			<h1>404</h1>
			{props.username &&
				<h2>User @{props.username} was not found.</h2>
			}
			{props.community &&
				<h2>Community {props.community} was not found.</h2>
			}
			<CustomLink to="/">Go to the home page</CustomLink>
		</div>
	);
}
