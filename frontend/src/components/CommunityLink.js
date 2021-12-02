import React from 'react';
import CustomLink from './CustomLink';
import './CommunityLink.css'

export default function CommunityLink({ path, name, imageUrl }) {
	return (
		<CustomLink to={'/community/' + path} className="communityLink">
			<img src={require(`../images/${imageUrl}`).default} alt={name + "'s photo"} />
			<p className="text-nowrap">{name}</p>
		</CustomLink>
	);
}
