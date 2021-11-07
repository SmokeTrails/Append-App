import React, { useState, useEffect } from 'react';
// import CustomLink from './CustomLink';
import FriendPreview from './FriendPreview'
import './SideBar.css'

export default function SideBar() {
	const [onlineFriends, setOnlineFriends] = useState(null);

	useEffect(() => {
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
		<div className="complementary">
			<div>
				<div>
				{/* <CustomLink className={`friendPreview ${!simple ? 'rich' : ''}`} to={`/user/${username}`} >
					{imageUrl
						? <img className="image" src={require(`../images/${imageUrl}`).default} alt={name + "'s photo"} />
						: <div className="image"><UserIcon /></div>}
					<div>
						<h1>{name}</h1>
						<p>@{username}</p>
					</div>
					<div className="link">
						{!simple && 'View Profile'}
						<ChevronRightIcon className="icon" />
					</div>
				</CustomLink> */}
				</div>
				<h1 className="subtleHeading">Friends Online</h1>
				{onlineFriends && onlineFriends.map((friend, index) =>
					<FriendPreview key={index} simple={true} name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
				)}
			</div>
		</div>
	);
}
