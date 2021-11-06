import React, { useState, useEffect } from 'react';
import FriendPreview from './FriendPreview'

export default function FriendList() {
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
			},
			{
				name: 'Rehan',
				username: 'TheRayman786'
			},
		]);
	}, []);

	return (
		<div className="complementary">
			<div>
				<h1>Friends Online</h1>
				{onlineFriends && onlineFriends.map((friend, index) =>
					<FriendPreview key={index} name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
				)}
			</div>
		</div>
	);
}
