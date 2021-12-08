import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { UserIcon, UserAddIcon, CheckIcon, PencilIcon } from '@heroicons/react/solid';
import MissingPage from './MissingPage';
import UserContext from '../hooks/UserContext';
import { getUser, updateUser, addFriend, getCommunityById } from "../hooks/Api";
import CommunityLink from '../components/CommunityLink';
import './Profile.css';

function Avatar(props) {
	return (
		<div className="avatar">
			{props.imageUrl
				? <img className="image" src={props.imageUrl} alt={props.name + "'s profile picture"} />
				: <div className="image"><UserIcon /></div>
			}
		</div>
	);
}

function ProfileDescription(props) {
	return (
		<div className="ProfileDescription">
			<h1>{props.name}</h1>
			<h4>@{props.username}</h4>
			<div className="userInfo">
				<p><span className="count">{props.friendCount}</span> {props.friendCount === 1 ? 'Friend' : 'Friends'}</p>
				<p><span className="count">{props.communityCount}</span> {props.communityCount === 1 ? 'Community' : 'Communities'}</p>
				{/* <p><span className="count">{props.clubCount}</span> Clubs</p>
				<p><span className="count">{props.courseCount}</span> Courses</p> */}
			</div>
		</div>
	);
}

function ProfileInfo(props) {
	return (
		<div className="profileInfo">
			<div>
				<h2>About {props.name}</h2>
				<p>{props.bio}</p>
			</div>
			<div>
				<h2>Interests</h2>
				<p>{props.interests}</p>
			</div>
			<div className="flex">
				<div>
					<h2>Year of Study</h2>
					<p>{props.year}</p>
				</div>
				<div>
					<h2>Program</h2>
					<p>{props.program}</p>
				</div>
			</div>
		</div>
	)
}

function ProfileEditingInfo(props) {
	const handleChange = (e) => props.setProfileInfo((state) => {
		return {
			...state,
			[e.target.name]: e.target.value
		}
	});

	return (
		<form className="profileInfo">
			<div>
				<h2>About {props.name}</h2>
				<TextareaAutosize value={props.profileInfo.bio} onChange={handleChange} name="bio" maxLength="500" />
			</div>
			<div>
				<h2>Interests</h2>
				<input value={props.profileInfo.interests} onChange={handleChange} type="text" name="interests" />
			</div>
			<div className="flex">
				<div>
					<h2>Year of Study</h2>
					<input value={props.profileInfo.year} onChange={handleChange} type="number" name="year" />
				</div>
				<div>
					<h2>Program</h2>
					<input value={props.profileInfo.program} onChange={handleChange} type="text" name="program" />
				</div>
			</div>
		</form>
	)
}

export default function UserProfile(props) {
	const username = useParams().username;
	const loggedinUser = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [enrolledCommunities, setEnrolledCommunities] = useState(null);
	const [editInfo, setEditInfo] = useState(null);
	
	const saveForm = async () => {
		// Upload to backend
		await updateUser(username, editInfo).then(res => {
			setCurrentUser(res);
		});

		setEditInfo(null);
	}

	const startEditing = () => {
		setEditInfo({
			bio: currentUser.bio,
			interests: currentUser.interests,
			year: currentUser.year,
			program: currentUser.program
		});
	}

	const handleAddFriend = () => {
		addFriend(loggedinUser.username, username).then(res => {
			props.setUser(res.user);
			setCurrentUser(res.friend);
		}).catch(err => {
			console.log(err)
		});
	}

	useEffect(() => {
		setIsLoading(true);
	}, [username]);

	useEffect(() => {
		if (isLoading === true) {
			getUser(username).then(user => {
				console.log('user', user);
				if (!user)
					user = null;

				setCurrentUser(user);
				const communities = [];

				const promise = new Promise((resolve, reject) => {
					const length = user.communities.length;

					if (length === 0) resolve();

					user.communities.forEach((communityId, index) => {
						getCommunityById(communityId).then(community => {
							communities.push(community);

							if (index === length - 1) resolve();
						}).catch(err => {
							console.log(err)
						});
					})
				})
				
				promise.then(() => {
					console.log(communities)
					setEnrolledCommunities(communities);

					setIsLoading(false);
				});
			}).catch(err => {
				setCurrentUser(null);
			});
		}
	}, [username, isLoading]);

	return (
		<div>
			{isLoading
				? 'Loading...'
				: currentUser
					? <div className="profile">
						<Avatar imageUrl={currentUser.imageUrl} name={currentUser.name} />

						<div className="flexContainer">
							{/* clubCount={currentUser.clubCount} courseCount={currentUser.courseCount} */}
							<ProfileDescription name={currentUser.name} username={currentUser.username} friendCount={currentUser.friends.length} communityCount={currentUser.communities.length} />

							{currentUser.username === loggedinUser.username
								? <button className="editButton" onClick={() => editInfo ? saveForm() : startEditing()}>
									{editInfo ? <CheckIcon /> : <PencilIcon />}
									{editInfo ? 'Save Changes' : 'Edit Profile'}
								</button>
								: !loggedinUser.friends.includes(currentUser._id)
									? <button onClick={() => handleAddFriend()}>
										<UserAddIcon />
										Add Friend
									</button>
									: <button disabled>
										<CheckIcon />
										Friends
									</button>
							}
						</div>

						{editInfo
							? <ProfileEditingInfo name={currentUser.name} profileInfo={editInfo} setProfileInfo={setEditInfo} />
							: <ProfileInfo name={currentUser.name} bio={currentUser.bio} interests={currentUser.interests} year={currentUser.year} program={currentUser.program} />
						}

						<div className="CommunityList">
							{enrolledCommunities && enrolledCommunities.map((group, index) =>
								<CommunityLink key={index} path={group.path} name={group.name} imageUrl={group.imageUrl} />
							)}
						</div>
					</div>
					: <MissingPage username={username} />
			}
		</div>
	);
}
