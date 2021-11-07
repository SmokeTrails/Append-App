import React, { useState } from 'react';
import { useParams } from 'react-router';
// import PropTypes from "prop-types";
import '../css/Main.css';

function CardItem(props) {
	return (
		<li style={{ background: "#f6bd60" }}><h3 style={{ marginTop: "10px", marginLeft: "10px", fontWeight: "normal", wordWrap: "break-word" }}><strong>{props.courseCode}:</strong> {props.courseTitle}</h3>
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
	return (
		<form>
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

function GalleryView(props) {
	return (
		<div>
			<h3>{props.title}</h3>
			<ul className="gallery">
				<CardItem courseCode='CSC309' courseTitle="Web Programming" />
				<CardItem courseCode='CSC309' courseTitle="Web Programming" />
				<CardItem courseCode='CSC309' courseTitle="Web Programming" />
				<CardItem courseCode='CSC309' courseTitle="Web Programming" />
			</ul>
		</div>
	);
}

const users = [
	{
		name: 'Alex D',
		username: 'AlexDobbin',
		friendCount: '2',
		clubCount: '5', 
		courseCount: '3',
		bio: 'yo',
		interests: '#yo',
		year: '2',
		program: 'Engineering Science'

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
		program: 'Computer Science'
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
		program: 'Computer Science'
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
		program: 'Business'
	},
	{
		name: 'Haider',
		username: 'Haider',
		friendCount: '3',
		clubCount: '5', 
		courseCount: '5',
		bio: 'Hello 123',
		interests: '#123',
		year: '3',
		program: 'Computer Science'
	}
];

export default function UserProfile() {
	const username = useParams().username;
	var Users = users.filter(user => {
		return user.username === username
	})
	var User = Users[0]
	
	const [isEditing, setIsEditing] = useState(false);

	const editClick = () => {
		setIsEditing(true);
	}

	const saveClick = () => {
		setIsEditing(false);
	}

	return (
		<div>
			{ username === 'Haider' &&
				<button onClick={isEditing ? saveClick : editClick}>{isEditing ? 'Save' : 'Edit'}</button>
			}

			<Avatar imageURL={("imageUrl" in User) ? User.imageUrl : 'DefaultPic.jpg'}/>
			
			<ProfileDescription name={User.name} username={User.username} friendCount={User.friendCount} clubCount={User.clubCount} courseCount={User.courseCount} />
			{isEditing &&
				<ProfileEditingInfo bio={User.bio} interests={User.interests} year={User.year} program={User.program} />
			}
			{!isEditing &&
				<ProfileInfo bio={User.bio} interests={User.interests} year={User.year} program={User.program} />
			}

			<GalleryView title='Current Courses' />
			<GalleryView title='Current Clubs' />
		</div>
	);
}
