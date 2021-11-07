import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { UserIcon } from '@heroicons/react/solid';
import MissingPage from '../pages/MissingPage'
import './Profile.css';

const users = [
	{
		name: 'Alex D',
		username: 'AlexDobbin',
		friendCount: '2',
		clubCount: '4',
		courseCount: '3',
		bio: 'yo',
		interests: '#yo',
		year: '2',
		program: 'Engineering Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Golf', 'Chess', 'Tennis', 'Nature Lovers']
	},
	{
		name: 'Joshua Lee',
		username: 'Marvin',
		friendCount: '6',
		clubCount: '4',
		courseCount: '3',
		bio: 'yo',
		interests: '#yo',
		year: '2',
		program: 'Engineering Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Golf', 'Chess', 'Tennis', 'Nature Lovers']
	},
	{
		name: 'Kirill',
		username: 'KirillTregubov',
		imageUrl: 'kirill.png',
		friendCount: '7',
		clubCount: '3',
		courseCount: '5',
		bio: 'hey',
		interests: '#hey',
		year: '2',
		program: 'Computer Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Anime', 'Gaming', 'Overwatch']
	},
	{
		name: 'Mohsin',
		username: 'SmokeTrails',
		friendCount: '9',
		clubCount: '1',
		courseCount: '6',
		bio: 'hello',
		interests: '#hello',
		year: '3',
		program: 'Computer Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Soccer']
	},
	{
		name: 'Rehan',
		username: 'TheRayman786',
		friendCount: '0',
		clubCount: '1',
		courseCount: '3',
		bio: 'hi',
		interests: '#hi',
		year: '1',
		program: 'Business',
		courseCodes: ['CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Anime', 'Movies', 'Book Lovers']
	},
	{
		name: 'Haider',
		username: 'user',
		friendCount: '3',
		clubCount: '3',
		courseCount: '5',
		bio: 'Hello 123',
		interests: '#123',
		year: '3',
		program: 'Computer Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Anime', 'Gaming', 'Martial Arts']
	}
];

function Avatar(props) {
	return (
		<div className="avatar">
			{props.imageUrl
				? <img className="image" src={require(`../images/users/${props.imageUrl}`).default} alt={props.name + "'s profile picture"} />
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
			<div className="UserInfo">
				<p><span className="count">{props.friendCount}</span> Friends</p>
				<p><span className="count">{props.clubCount}</span> Clubs</p>
				<p><span className="count">{props.courseCount}</span> Courses</p>
			</div>
		</div>
	);
}

function ProfileInfo(props) {
	return (
		<div className="profileInfo">
			<p style={{ fontSize: "120%" }}><strong>Bio:</strong></p>
			<p style={{ fontSize: "130%", width: "1000px", height: "140px", marginBottom: "20px" }}>{props.bio}</p>
			<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Interests:</strong> {props.interests}</p>
			<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Current Year:</strong> {props.year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Program:</strong> {props.program}</p>
		</div>
	)
}

function ProfileEditingInfo(props) {
	const handleSubmit = (e) => {
		e.preventDefault();

		// Users need to be fetched from backend
		var filteredUsers = users.filter(user => {
			return user.username === props.username
		})

		filteredUsers[0].bio = e.target[0].value
		filteredUsers[0].interests = e.target[1].value
		filteredUsers[0].year = e.target[2].value
		filteredUsers[0].program = e.target[3].value

		props.setIsEditing(false);
	}

	return (
		<form onSubmit={e => { handleSubmit(e) }}>
			<label>
				<p style={{ fontSize: "120%" }}><strong>Bio:</strong></p>
				<input defaultValue={props.bio} type="textarea" name="bio" style={{ fontSize: "130%", width: "1000px", height: "140px", marginBottom: "20px" }} maxLength="500" />
			</label>
			<label>
				<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Interests:</strong></p>
				<input defaultValue={props.interests} type="text" name="interests" style={{ fontSize: "120%", width: "1000px", height: "30px" }} />
			</label>
			<label>
				<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Current Year:</strong></p>
				<input defaultValue={props.year} type="number" name="year" style={{ fontSize: "120%", width: "1000px", height: "30px" }} />
			</label>
			<label>
				<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Program:</strong></p>
				<input defaultValue={props.program} type="text" name="program" style={{ fontSize: "120%", width: "1000px", height: "30px" }} />
			</label>

			<input type="submit" value="Save" />
		</form>
	)
}

function CardItem(props) {
	return (
		<li style={{ background: "#f6bd60" }}><h3 style={{ marginTop: "10px", marginLeft: "-50px", fontWeight: "normal", wordWrap: "break-word" }}><strong>{props.courseCode}:</strong> {props.courseTitle}</h3>
			<img style={{ width: "235px", height: "120px", border: "2px solid red", marginLeft: "5px", marginTop: "30px" }}
				src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Group Banner" /></li>
	);

}

function GalleryView(props) {
	var cards = props.items
	const AllCards = cards.map((item, index) =>
		<CardItem key={index} courseCode={item} courseTitle="Lorem Ipsum" />
	);

	return (
		<div>
			<h2>{props.title}</h2>
			<ul className="gallery" style={{ gridTemplateColumns: `repeat(${AllCards.length}, 250px)` }}>{AllCards}</ul>
		</div>
	);
}

export default function UserProfile() {
	const username = useParams().username;
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (isLoading || username !== currentUser.username) {
			var filteredUsers = users.filter(user => {
				return user.username === username
			})
			
			setCurrentUser(filteredUsers[0]);
			setIsLoading(false);
		}
	}, [isLoading, username, currentUser]);

	return (
		<div>
			{ isLoading
				? 'Loading...'
				: currentUser
					? <div className="profile">
						<Avatar imageUrl={currentUser.imageUrl} name={currentUser.name} />
						
						<div className="flexContainer">
							<ProfileDescription name={currentUser.name} username={currentUser.username} friendCount={currentUser.friendCount} clubCount={currentUser.clubCount} courseCount={currentUser.courseCount} />
							
							{username === 'user' &&
								<button className="editButton" onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}>{isEditing ? 'Save Changes' : 'Edit Profile'}</button>
							}
						</div>

						{isEditing
							? <ProfileEditingInfo setIsEditing={setIsEditing} username={currentUser.username} bio={currentUser.bio} interests={currentUser.interests} year={currentUser.year} program={currentUser.program} />
							: <ProfileInfo bio={currentUser.bio} interests={currentUser.interests} year={currentUser.year} program={currentUser.program} />
						}

						<GalleryView title='Current Courses' items={currentUser.courseCodes} />
						<GalleryView title='Current Clubs' items={currentUser.communityNames} />
					</div>
					: <MissingPage username={username} />
			}
		</div>
	);
}
