import React from 'react';
import { useResolvedPath, useMatch, Link } from "react-router-dom";

// Source: https://reactrouter.com/docs/en/v6/examples/custom-link
export default function CustomLink({ children, to, ...props }) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link
			className={match ? 'active' : ''}
			to={to}
			{...props}
		>
			{children}
		</Link>
	);
}
