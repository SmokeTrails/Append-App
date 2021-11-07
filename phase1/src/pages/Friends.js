import React, { useState, useEffect } from 'react';
import FriendPreview from '../components/FriendPreview'

export default function Friends() {
	const [friends, setFriends] = useState(null);

	useEffect(() => {
		setFriends([
			{
				name: 'Alex D',
				username: 'AlexDobbin'
			},
			{
				name: 'Kirill',
				username: 'KirillTregubov',
				imageUrl: 'users/kirill.png'
			},
			{
				name: 'Mohsin',
				username: 'SmokeTrails'
			},
			{
				name: 'Rehan',
				username: 'TheRayman786'
			}
		]);
	}, []);

	return (
		<div>
			<h1 className="heading">Your Friends</h1>
			<div>
				{friends && friends.map((friend, index) =>
					<div key={index}>
						<FriendPreview name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
					</div>
				)}
			</div>
		</div>
	);
}
