import React from 'react';

export default function GroupPreview({ id, name, description, memberCount, imageUrl }) {
	return (
		<div>
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>{memberCount}</h2>
		</div>
	);
}