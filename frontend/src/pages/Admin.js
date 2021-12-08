import React, { useState, useEffect } from 'react';
import FriendPreview from '../components/FriendPreview'
import { getAllCommunities, deleteCommunity, getAllUsers, deleteUser } from '../hooks/Api';
import CommunityPreview from '../components/CommunityPreview';

export default function Admin() {
	const [users, setUsers] = useState(null);
	const [allCommunities, setAllCommunities] = useState(null);
	const [allUsers, setAllUsers] = useState(null);

	useEffect(() => {
		getAllCommunities().then(communities => {
			setAllCommunities(communities);
		})
	});

	useEffect(() => {
		getAllUsers().then(user => {
			setAllUsers(user);
		})
	});

	useEffect(() => {
		// Users need to be fetched from backend
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
				name: 'Joshua Lee',
				username: 'Marvin'
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

    const resetPassword = name => {
        alert('Reset request sent to ' + name);
    }

	const warn = name => {
        alert(name + " has been warned!");
		//For Next Phase
        // WarnedUsers.push(name);
        // setValue(value+1);
    }


	return (
		<div>
			<h1 className="heading">User Management</h1>
			<h2>All Users</h2>
            <div>
				{allUsers && allUsers.map((user, index) =>
					<div key={index}>
						<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
                        
                        <button onClick={() => { deleteUser(user.username) }}>Ban User</button>
                        <button onClick={() => { resetPassword(user.name) }}>Reset Password</button>
						<button onClick={() => { warn(user.name) }}>Warn</button>

					</div>
				)}
			</div>
			
			<h1 className="heading">Recently Made Communities</h1>
			<div>
				{allCommunities && allCommunities.map((group, index) =>
					<div>
					<CommunityPreview key={index} path={group.path} name={group.name} description={group.description} memberCount={group.members.length} imageUrl={group.imageUrl} />
					<button onClick={() => { deleteCommunity(group.path) }}>Remove Community</button>
					</div>
				)}
			</div>
        </div>
    );
}