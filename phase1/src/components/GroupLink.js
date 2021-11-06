import React from 'react';
import { Link } from "react-router-dom";

export default function GroupLink({ id, name, imageUrl }) {
	return (
		<Link to={'/group/' + id}>
			<img src={require(`../images/${imageUrl}`).default} alt={name+"'s photo"} />
			<p className="text-nowrap">{name}</p>
		</Link>
	);
}
