import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { UserIcon, CheckIcon, PencilIcon } from '@heroicons/react/solid';
import MissingPage from '../pages/MissingPage';
import UserContext from '../hooks/UserContext';
import './Profile.css';

const users = [
	{
		name: 'Admin',
		username: 'admin',
		friendCount: '0',
		clubCount: '0',
		courseCount: '0',
		bio: 'Here to moderate all users!',
		interests: 'Being an admin',
		year: '4',
		program: 'None',
		courseCodes: [],
		communityNames: []
	},
	{
		name: 'Alex D',
		username: 'AlexDobbin',
		friendCount: '2',
		clubCount: '4',
		courseCount: '3',
		bio: 'Here to make friends and have fun!',
		interests: '#Sports #BoardGames',
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
		bio: 'If you are a raptors fan we would get along',
		interests: '#Basketball #Sports #Soccer',
		year: '2',
		program: 'Engineering Science',
		courseCodes: ['CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Soccer', 'Basketball', 'Nature Lovers']
	},
	{
		name: 'Kirill',
		username: 'KirillTregubov',
		imageUrl: 'kirill.png',
		friendCount: '7',
		clubCount: '3',
		courseCount: '5',
		bio: 'Add me on discord if you want to play somtimes: Username#2321',
		interests: '#Gaming #Anime #Book Lovers',
		year: '3',
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
		bio: 'I miss the summer',
		interests: '#Sports #Jogging #Outdoors',
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
		bio: 'Usually sitting in bahen doing my work',
		interests: '#Reading #Gym #Entrepreneurship',
		year: '1',
		program: 'Business',
		courseCodes: ['CSC309', 'CSC309', 'CSC309'],
		communityNames: ['Anime', 'Movies', 'Book Lovers']
	},
	{
		name: 'Haider',
		username: 'user',
		friendCount: '5',
		clubCount: '3',
		courseCount: '5',
		bio: 'Hello everyone! I\'m a third year computer science student looking for people to study with.',
		interests: '#coding #AI #anime #gaming',
		year: '3',
		program: 'Computer Science',
		courseCodes: ['CSC309'],
		communityNames: ['Anime', 'WebDevClub']
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
			<div className="userInfo">
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

function CardItem(props) {
	return (
		<li>
			<img src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Group banner" />
			<div>
				<h3><span className="bold">{props.courseCode}:</span> {props.courseTitle}</h3>
			</div>
		</li>
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
			{ cards.length === 0
				? <p>None</p>
				: <ul className="gallery" style={{ gridTemplateColumns: `repeat(${AllCards.length}, 250px)` }}>{AllCards}</ul>
			}
		</div>
	);
}

export default function UserProfile() {
	const username = useParams().username;
	const loggedinUser = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [profileInfo, setProfileInfo] = useState(null);

	const saveForm = () => {
		// Users need to be fetched from backend
		var filteredUser = users.filter(user => {
			return user.username === currentUser.username
		})[0]

		filteredUser.bio = profileInfo.bio
		filteredUser.interests = profileInfo.interests
		filteredUser.year = profileInfo.year
		filteredUser.program = profileInfo.program

		setProfileInfo(null);
	}

	const startEditing = () => {
		setProfileInfo({
			bio: currentUser.bio,
			interests: currentUser.interests,
			year: currentUser.year,
			program: currentUser.program
		});
	}

	useEffect(() => {
		if (isLoading || username !== currentUser.username) {
			// Users need to be fetched from backend
			var filteredUsers = users.filter(user => {
				return user.username === username
			})

			setCurrentUser(filteredUsers[0]);
			setIsLoading(false);
		}
	}, [isLoading, username, currentUser]);

	return (
		<div>
			{isLoading
				? 'Loading...'
				: currentUser
					? <div className="profile">
						<Avatar imageUrl={currentUser.imageUrl} name={currentUser.name} />

						<div className="flexContainer">
							<ProfileDescription name={currentUser.name} username={currentUser.username} friendCount={currentUser.friendCount} clubCount={currentUser.clubCount} courseCount={currentUser.courseCount} />

							{username === loggedinUser.username &&
								<button className="editButton" onClick={() => profileInfo ? saveForm() : startEditing()}>
									{profileInfo ? <CheckIcon /> : <PencilIcon />}
									{profileInfo ? 'Save Changes' : 'Edit Profile'}
								</button>
							}
						</div>

						{profileInfo
							? <ProfileEditingInfo name={currentUser.name} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
							: <ProfileInfo name={currentUser.name} bio={currentUser.bio} interests={currentUser.interests} year={currentUser.year} program={currentUser.program} />
						}

						<GalleryView title='Current Courses' items={currentUser.courseCodes} />
						<GalleryView title='Current Clubs' items={currentUser.communityNames} />
					</div>
					: <MissingPage username={username} />
			}
		</div>
	);
}
