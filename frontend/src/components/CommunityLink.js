import React from 'react';
import CustomLink from './CustomLink';
import './CommunityLink.css'

export default function CommunityLink({ path, name, imageUrl }) {
	return (
		<CustomLink to={'/community/' + path} className="communityLink">
			{imageUrl
				? <img src={imageUrl} alt={name + "'s photo"} />
				: <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt={name + "'s photo"} />
			}
			<p className="text-nowrap">{name}</p>
		</CustomLink>
	);
}
