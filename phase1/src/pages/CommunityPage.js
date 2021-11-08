import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NumberFormat from 'react-number-format';
import TextareaAutosize from 'react-textarea-autosize';
import { ChevronRightIcon } from '@heroicons/react/outline';
import CustomLink from '../components/CustomLink';
import MissingPage from '../pages/MissingPage'
import './CommunityPage.css'

const communities = [
	{
		path: 'csc309',
		name: 'CSC309',
		description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
		memberCount: 1012,
		imageUrl: 'communities/csc309.jpg'
	},
	{
		path: 'csc301',
		name: 'CSC301',
		description: "An introduction to agile development methods appropriate for medium-sized teams and rapidly-moving projects. Basic software development infrastructure; requirements elicitation and tracking; estimation and prioritization; teamwork skills; basic UML; design patterns and refactoring; security, discussion of ethical issues, and professional responsibility.",
		memberCount: 536,
		imageUrl: 'communities/csc301.jpg'
	},
	{
		path: 'AnimeClub',
		name: 'Anime Club',
		description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
		memberCount: 1998,
		imageUrl: 'communities/anime.jpg'
	},
	{
		path: 'WebDevClub',
		name: 'Web dev Club',
		description: "U of T's largest anime club. We have weekly meetings but feel free to make a post on the forum.",
		memberCount: 405,
		imageUrl: 'communities/webdev.jpg'
	}
];

export const posts = [
	{
		title: 'Welcome to our community!',
		user: 'Joshua',
		description: "yo yo yo yo yo yo",
		date: "11/7/2021",
		time: "6:23",
		comments: "3",
		postId: "0"
	},
	{
		title: 'My first Post !!!',
		user: "Kirill",
		description: "Happy to be here!",
		date: "11/7/2021",
		time: "13:19",
		comments: "3",
		postId: "1"
	},
	{
		title: 'Anyone done the assignment?',
		user: "Rehan",
		description: "Im kinda stuck on 2b",
		date: "11/7/2021",
		time: "4:23",
		comments: "0",
		postId: "2"
	}

];

function Post(props) {
	const url = `/community/${props.community}/${props.postId}`

	const removePost = index => {
		var elem = document.getElementById(index);
		elem.parentNode.removeChild(elem);
	}
	
	const warnUser = name => {
		alert(name + " has been warned!");
	}

	return (
		<div className="post">
			<CustomLink to={url}>
				<div>
					<h4 className="title"> {props.title} </h4>
					<div className="details">
						<p className="date"> {props.date}</p>
						<p className="timestamp"> {props.time}</p>
						<p className="comments">{props.comments} comments</p>
					</div>
				</div>
				<ChevronRightIcon className="icon" />
			</CustomLink>
			<div className="adminButtons">
				<button className="small" onClick={() => { /*removePost(props.community + "_" + index)*/ }}>Remove Post</button>
				<button className="small" onClick={() => { /*warnUser(post.user)*/ }}>Warn User</button>
			</div>
		</div>
	);
}

function AddPost(props) {
	const handleSubmit = (e) => {
		e.preventDefault();

		if (e.target[0].value.length === 0 || e.target[1].value.length === 0) {
			alert('Fields cannot be empty!');
			return;
		}

		var today = new Date();
		var time = today.getHours() + ':' + today.getMinutes();
		var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		const newPost = { title: e.target[0].value, user: props.user, description: e.target[1].value, date: date, time: time, comments: '0', community: props.community, postId: props.comments + "_" + props.postId };
		
		// New post needs to be uploaded to backend
		posts.push(newPost);

		props.setAddPost(false);
	}

	return (
		<form className="post new" onSubmit={handleSubmit}>
			<label className="title">
				Title
				<TextareaAutosize name="title" maxLength="500" />
			</label>

			<label className="title">
				Description
				<TextareaAutosize name="description" maxLength="500" />
			</label>

			<input type="submit" value="Post" />
		</form>
	)
}

export default function CommunityPage() {
	const community = useParams().community;
	const [isLoading, setIsLoading] = useState(true);
	const [currentCommunity, setCurrentCommunity] = useState(null);
	const [addPost, setAddPost] = useState(false);

	useEffect(() => {
		if (isLoading || (currentCommunity && community !== currentCommunity.path)) {
			var filteredCommunities = communities.filter(c => {
				return c.path === community
			})

			setCurrentCommunity(filteredCommunities[0]);
			setIsLoading(false);
		}
	}, [community, isLoading, currentCommunity]);

	return (
		<div>
			{isLoading
				? 'Loading...'
				: currentCommunity
					? <div className="communityPage">
						<img className="cover" src={require(`../images/${currentCommunity.imageUrl}`).default} alt={currentCommunity.name + "'s banner"} />
						<h2 className="badge">
							<NumberFormat value={currentCommunity.memberCount} displayType={'text'} thousandSeparator={true} /> members
						</h2>
						<div className="communityContent">
							<div className="communityInfo">
								<h1>{currentCommunity.name}</h1>
								<p>{currentCommunity.description}</p>
							</div>
							<div>
								{posts && posts.map((post, index) =>
									<Post key={index} title={post.title} date={post.date} time={post.time} comments={post.comments} community={community} postId={index} />
								)}
							</div>

							{addPost &&
								<AddPost setAddPost={setAddPost} community={community} />
							}
							{!(addPost) &&
								<button onClick={() => setAddPost(true)}>{'Add Post'}</button>
							}
						</div>
					</div>
					: <MissingPage community={community} />
			}
		</div>
	);
}
