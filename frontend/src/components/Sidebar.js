import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import CustomLink from './CustomLink';
import UserContext from '../hooks/UserContext';
import FriendPreview from './FriendPreview';
import './Sidebar.css';

export default function SideBar(props) {
	const user = useContext(UserContext);
	const [onlineFriends, setOnlineFriends] = useState(null);
	let path = useLocation().pathname;

	useEffect(() => {
		// Online Friends need to be fetched from backend
		setOnlineFriends([
			{
				name: 'Kirill',
				username: 'KirillTregubov',
				imageUrl: 'users/kirill.png'
			},
			{
				name: 'Mohsin',
				username: 'SmokeTrails'
			}
		]);
	}, []);

	return (
		<aside>
			<div>
				<div className="profileLink">
					<CustomLink className={`${path === `/user/${user.username}` ? 'active' : ''}`} to={`/user/${user.username}`} >
						{user.imageUrl
							? <img className="image" src={require(`../images/${user.imageUrl}`).default} alt={user.name + "'s photo"} />
							: <div className="image"><UserIcon /></div>}
						<div>
							<h1>My Profile</h1>
						</div>
					</CustomLink>
					<button className="iconLink" onClick={() => props.setUser(null)}>
						<LogoutIcon className="icon" />
					</button>
				</div>
				<h1 className="subtleHeading">Friends Online</h1>
				{onlineFriends && onlineFriends.map((friend, index) =>
					<FriendPreview key={index} simple={true} name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
				)}
			</div>
		</aside>
	);
}
