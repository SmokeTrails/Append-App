import React from 'react';
import { UserIcon } from '@heroicons/react/solid';
import './FriendPreview.css'

export default function FriendPreview({ name, username, imageUrl }) {
	return (
		<div className="friendPreview">
			{imageUrl
				? <img className="image" src={require(`../images/${imageUrl}`).default} alt={name + "'s photo"} />
				: <div className="image"><UserIcon /></div>}
			<div>
				<h1>{name}</h1>
				<p>@{username}</p>
			</div>
		</div>
	);
}
