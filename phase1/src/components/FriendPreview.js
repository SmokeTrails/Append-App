import React from 'react';

export default function FriendPreview({ name, username, imageUrl }) {
	return (
		<div>
            <h1>{name}</h1>
            <p>{username}</p>
            <p>{imageUrl}</p>
		</div>
	);
}