import React, { useState, useEffect } from 'react';
import FriendPreview from '../components/FriendPreview'

export const WarnedUsers = [];

export default function Admin() {
	const [users, setUsers] = useState(null);
	const [value, setValue] = useState(0);

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

    const removeUser = name => {
        setUsers(users.filter(user => user.name !== name))
    }

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
				{users && users.map((user, index) =>
					<div key={index}>
						<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
                        
                        <button onClick={() => { removeUser(user.name) }}>Remove User</button>
                        <button onClick={() => { resetPassword(user.name) }}>Reset Password</button>
						<button onClick={() => { warn(user.name) }}>Warn</button>

					</div>
				)}
			</div>
			
			{/* <h2>Warned Users</h2>  For Next Phase
            <div>
                {WarnedUsers.length > 0 && WarnedUsers.map((userW, index) =>
                <div key={index+userW}>
              		<FriendPreview name={users.filter(user => user.name === userW)[0].name} username={users.filter(user => user.name === userW)[0].username} imageUrl={users.filter(user => user.name === userW)[0].imageUrl} />
                </div>
                )}
            </div> */}
        </div>
    );
}