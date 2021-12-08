import React, { useState, useEffect } from 'react';
import FriendPreview from '../components/FriendPreview'
import { getAllCommunities, deleteCommunity, getAllUsers, deleteUser } from '../hooks/Api';
import CommunityPreview from '../components/CommunityPreview';
import './Admin.css'

export default function Admin() {
	// const [users, setUsers] = useState(null);
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
		<div className="AdminPage">
			<h1 className="heading">User Management</h1>
			<h2>All Users</h2>
            <div>
				{allUsers && allUsers.map((user, index) =>
					<div key={index}>
						<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
                        
						<div class="buttonGroup">
							<button className="actionButton" onClick={() => { deleteUser(user.username) }}>Ban User</button>
							<button className="actionButton" onClick={() => { resetPassword(user.name) }}>Reset Password</button>
							<button className="actionButton" onClick={() => { warn(user.name) }}>Warn</button>
						</div>
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

			<h1 className="heading">Recently Made Communities</h1>
			<div>
				{allCommunities && allCommunities.map((group, index) =>
					<div>
						<CommunityPreview key={index} path={group.path} name={group.name} description={group.description} memberCount={group.members.length} imageUrl={group.imageUrl} />
						<button className="actionButton extraSpace" onClick={() => { deleteCommunity(group.path) }}>Remove Community</button>
					</div>
				)}
			</div>
        </div>
    );
}