import React, { useState, Navigate } from 'react';
import { useParams } from 'react-router';
// import PropTypes from "prop-types";
import '../css/Main.css';

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

function CardItem(props) {
	return (
		<li key={generateKey(props.courseCode)} style={{ background: "#f6bd60" }}><h3 style={{ marginTop: "10px", marginLeft: "-50px", fontWeight: "normal", wordWrap: "break-word" }}><strong>{props.courseCode}:</strong> {props.courseTitle}</h3>
			<img style={{ width: "235px", height: "120px", border: "2px solid red", marginLeft: "5px", marginTop: "30px" }}
				src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Group Banner" /></li>
	);

}

function Avatar(props) {
	return (
		<img className='Avatar'
			style={{ width: "200px", height: "200px", borderRadius: "50%", border: "2px solid red" }}
			src={require(`../images/users/${props.imageURL}`).default}
			alt="Profile Pic"
		/>
	);
}

function ProfileDescription(props) {
	return (
		<div className="ProfileDescription">
			<h1 style={{marginBottom: "2px"}}>{props.name}</h1>
			<h4 style={{color: "gray", marginTop: "2px" }}>@{props.username}</h4>
			<div className="UserInfo">
				<p style={{ fontSize: "110%" }}>{props.friendCount} Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.clubCount} Clubs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.courseCount} Courses</p>
			</div>
		</div>
	);
}

function ProfileInfo(props) {
	return (
		<div>
			<p style={{ fontSize: "120%" }}><strong>Bio:</strong></p>
			<p style={{ fontSize: "130%", width: "1000px", height: "140px", marginBottom: "20px" }}>{props.bio}</p>
			<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Interests:</strong> {props.interests}</p>
			<p style={{ fontSize: "120%", width: "1000px", height: "30px" }}><strong>Current Year:</strong> {props.year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Program:</strong> {props.program}</p>
		</div>
	)
}

function ProfileEditingInfo(props) {
	const handleSubmit= (e) => {
		e.preventDefault();

		var Users = users.filter(user => {
			return user.username === props.username
		})

		Users[0].bio = e.target[0].value
		Users[0].interests = e.target[1].value
		Users[0].year = e.target[2].value
		Users[0].program = e.target[3].value

		props.setIsEditing(false);
	  }

	return (
		<form onSubmit = {e => {handleSubmit(e)}}>
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

			<input type="submit" value="Save"/>
		</form>
	)
}


function GalleryView(props) {
	var cards = props.items
	const AllCards = cards.map((item) =>
  		<CardItem courseCode={item} courseTitle="Lorem Ipsum" />
	);

	return(
		<div>
			<h2>{props.title}</h2>
			<ul className = "gallery" style={{gridTemplateColumns: `repeat(${AllCards.length}, 250px)`}}>{AllCards}</ul>
		</div>
	);
}

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

export default function UserProfile() {
	const username = useParams().username;
	var Users = users.filter(user => {
		return user.username === username
	})
	var User = Users[0]

	if(Users.length === 0){
		<Navigate to="/*"/>
	}
	
	const [isEditing, setIsEditing] = useState(false);

	const editClick = () => {
		setIsEditing(true);
	}

	const saveClick = () => {
		setIsEditing(false);
	}

	return (
		<div>
			{ username === 'user' &&
				<button onClick={isEditing ? saveClick : editClick}>{isEditing ? 'Save' : 'Edit'}</button>
			}

			<Avatar imageURL={("imageUrl" in User) ? User.imageUrl : 'DefaultPic.jpg'}/>
			
			<ProfileDescription name={User.name} username={User.username} friendCount={User.friendCount} clubCount={User.clubCount} courseCount={User.courseCount} />
			{isEditing &&
				<ProfileEditingInfo setIsEditing={setIsEditing} username={User.username} bio={User.bio} interests={User.interests} year={User.year} program={User.program} />
			}
			{!isEditing &&
				<ProfileInfo bio={User.bio} interests={User.interests} year={User.year} program={User.program} />
			}

			<GalleryView title='Current Courses' items={User.courseCodes}/>
			<GalleryView title='Current Clubs' items={User.communityNames}/>
		</div>
	);
}
