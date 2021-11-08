import React from 'react';
import NumberFormat from 'react-number-format';
import { ChevronRightIcon } from '@heroicons/react/outline';
import CustomLink from './CustomLink';
import './CommunityPreview.css';

export default function CommunityPreview({ path, name, description, memberCount, imageUrl }) {
	return (
		<CustomLink className="communityPreview" to={`/community/${path}`} >
			<img className="image" src={require(`../images/${imageUrl}`).default} alt={name + "'s photo"} />
			<h2 className="badge">
				<NumberFormat value={memberCount} displayType={'text'} thousandSeparator={true} /> members
			</h2>
			<div className="content">
				<div>
					<h1>{name}</h1>
            		<p>{description}</p>
				</div>
				<ChevronRightIcon className="icon" />
			</div>
		</CustomLink>
	);
}
