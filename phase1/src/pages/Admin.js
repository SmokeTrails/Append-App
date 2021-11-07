import React, { useState, useEffect } from 'react';
import FriendPreview from '../components/FriendPreview'

export default function Admin() {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		setUsers([
			{
				name: 'Alex D',
				username: 'AlexDobbin'
			},
			{
				name: 'Haider',
				username: 'user'
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

    const RemoveUser = name => {
        setUsers(users.filter(user => user.name !== name))
    }

    const ResetPassword = name => {
        alert('Reset request sent to ' + name);
    }

	return (
		<div>
			<h1>User Management</h1>
			<h2>All Users</h2>
            <div>
				{users && users.map((user, index) =>
					<div key={index}>
						<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
                        
                        <button onClick={() => { RemoveUser(user.name) }}>Remove User</button>
                        <button onClick={() => { ResetPassword(user.name) }}>Reset Password</button>

					</div>
				)}
			</div>
		</div>
	);
}