import React, { useState, useEffect } from 'react';
import FriendPreview from './FriendPreview'

export default function FriendList() {
	const [onlineFriends, setOnlineFriends] = useState(null);
	const [enrolledGroups, setEnrolledGroups] = useState(null);

	useEffect(() => {
		setOnlineFriends([
			{
				name: 'Kirill',
				username: 'KirillTregubov',
				imageUrl: '/users/kirill.png'
			},
			{
				name: 'Mohsin',
				username: 'SmokeTrails',
				imageUrl: '/users/mohsin.png'
			},
			{
				name: 'Rehan',
				username: 'TheRayman786',
				imageUrl: '/users/rayman.png'
			},
		]);
	}, []);

	return (
		<div>
			Friend list
			<div>
				{onlineFriends && onlineFriends.map((friend, index) =>
					<div key={index}>
						<FriendPreview name={friend.name} username={friend.username} imageUrl={friend.imageUrl} />
					</div>
				)}
			</div>
		</div>
	);
}
