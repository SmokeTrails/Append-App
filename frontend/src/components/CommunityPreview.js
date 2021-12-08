import React from 'react';
import NumberFormat from 'react-number-format';
import { ChevronRightIcon } from '@heroicons/react/outline';
import CustomLink from './CustomLink';
import './CommunityPreview.css';

export default function CommunityPreview({ path, name, description, memberCount, imageUrl }) {
	return (
		<CustomLink className="communityPreview" to={`/community/${path}`} >
			{imageUrl 
				? <img className="image" src={imageUrl} alt={name + "'s photo"} />
				: <img className="image" src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt={name + "'s photo"} />
			}
			<h2 className="badge">
				<NumberFormat value={memberCount} displayType={'text'} thousandSeparator={true} /> {memberCount === 1 ? 'member' : 'members'}
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
