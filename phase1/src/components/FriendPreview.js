import React from 'react';
import { UserIcon, ChevronRightIcon } from '@heroicons/react/solid';
import CustomLink from './CustomLink';
import './FriendPreview.css'

export default function FriendPreview({ simple, name, username, imageUrl }) {
	return (
		<div className={`friendPreview ${!simple ? 'rich' : ''}`}>
			{imageUrl
				? <img className="image" src={require(`../images/${imageUrl}`).default} alt={name + "'s photo"} />
				: <div className="image"><UserIcon /></div>}
			<div>
				<h1>{name}</h1>
				<p>@{username}</p>
			</div>
			{!simple && <div className="link">
				<CustomLink to={`/user/${username}`} >View Profile <ChevronRightIcon /></CustomLink>
			</div>}
		</div>
	);
}
