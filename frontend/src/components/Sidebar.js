import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import UserContext from '../hooks/UserContext';
import { getUserById } from '../hooks/Api';
import FriendPreview from './FriendPreview';
import CustomLink from './CustomLink';
import './Sidebar.css';

export default function SideBar(props) {
	const [onlineFriends, setOnlineFriends] = useState([]);
	let path = useLocation().pathname;
	const user = useContext(UserContext);

	useEffect(() => {
		// Online Friends need to be fetched from backend
		if (user.stale) {
			return;
		}
		const friends = [];

		const promise = new Promise((resolve, reject) => {
			const length = user.friends.length;

			user.friends.forEach((friendId, index) => {
				getUserById(friendId).then(user => {
					friends.push(user);

					if (index === length - 1) resolve();
				}).catch(err => {
					console.log(err);
				});
			})
		})
		
		promise.then(() => {
			setOnlineFriends(friends);
		});

		// setOnlineFriends([
		// 	{
		// 		name: 'Kirill',
		// 		username: 'KirillTregubov',
		// 		imageUrl: 'users/kirill.png'
		// 	},
		// 	{
		// 		name: 'Mohsin',
		// 		username: 'SmokeTrails'
		// 	}
		// ]);
	}, [user.friends]);

	return (
		<aside>
			<div>
				<div className="profileLink">
					<CustomLink className={`${path === `/user/${user.username}` ? 'active' : ''}`} to={`/user/${user.username}`} >
						{user.imageUrl
							? <img className="image" src={require(`../images/${user.imageUrl}`).default} alt={user.name + "'s photo"} />
							: <div className="image"><UserIcon /></div>
						}
						<div>
							<h1>My Profile</h1>
						</div>
					</CustomLink>
					<button className="iconLink" onClick={() => props.setUser(null)}>
						<LogoutIcon className="icon" />
						<div className="tooltip">Logout</div>
					</button>
				</div>
				<h1 className="subtleHeading">Your Friends</h1>
				{onlineFriends && onlineFriends.map((friend, index) =>
					<FriendPreview key={index} simple={true} name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
				)}
			</div>
		</aside>
	);
}
