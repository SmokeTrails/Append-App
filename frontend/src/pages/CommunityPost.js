import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import UserContext from '../hooks/UserContext';
import { getPost } from "../hooks/Api";
import MissingPage from './MissingPage';
// import { posts } from './CommunityPage';
import CustomLink from '../components/CustomLink';
// import { WarnedUsers } from './Admin';
import './CommunityPost.css';
import { createComment } from "../hooks/Api";

// const comments = [
// 	{
// 		user: 'Haider',
// 		content: "It's great to be here!",
// 		date: "11/7/2021",
// 		time: "18:23",
// 		ID: "CSC309_0"
// 	},
// 	{
// 		user: 'Mohsin',
// 		content: "Nice work everyone.",
// 		date: "11/7/2021",
// 		time: "11:42",
// 		ID: "CSC309_1"
// 	}
// ];

function Post(props) {
	return (
		<div>
			<h2 className="title"> {props.title} </h2>
			<div className="postDescription">{props.description}</div>
			<div className="info" style={{ display: "flex", color: "gray", margin: "0px" }}>
				<p className="date" style={{ marginRight: "20px" }}> {props.date}</p>
				<p className="timestamp" style={{ marginRight: "20px" }}> {props.time}</p>
				<p className="comments">{props.comments} comments</p>
			</div>
		</div>
	);
}

function Comment(props) {
	const user = useContext(UserContext);

	const removePost = index => {
		var post = document.getElementById(index);

		// Post needs to be removed from backend
		post.parentNode.removeChild(post);
	}

	if (props.commentId.toLowerCase() === props.postId.toLowerCase()) {
		return (
			<div className="post" id={props.commentId}>
				<h4 className="title">{props.user}</h4>
				<p className="content">{props.content}</p>
				<div className="details">
					<p className="date"> {props.date}</p>
					<p className="timestamp"> {props.time}</p>
				</div>
				{user.username === 'admin' && (
					<div className="adminButtons">
						<button className="small" onClick={() => { removePost(props.commentId) }}>Remove Comment</button>
						{/* <button className="small" onClick={() => { warnUser(props.user) }}>Warn User</button> */}
					</div>
				)}
			</div>
		);
	} else {
		return (null);
	}

}

function AddComment(props) {
	const user = useContext(UserContext);
	const textInput = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const inputValue = textInput.current.value;

		if (inputValue.length === 0) {
			alert('Comment cannot be empty!');
			return;
		}

		var today = new Date(),
			time = today.getHours() + ':' + today.getMinutes();
		var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		console.log(props.postId);
		const newComment = { user: user.name, content: inputValue, date: date, time: time, ID: props.community+"_"+props.postId};

		// New comment needs to be uploaded to backend
		// comments.push(newComment);
		console.log(newComment)

		createComment(props.currentPost._id, newComment)

		props.setValue(props.value + 1);
	}

	return (
		<form className="addComment">
			<label>
				<input ref={textInput} type="textarea" name="comment" />
			</label>

			<button onClick={handleSubmit}><PlusIcon className="icon" /> Add Comment</button>
		</form>
	)
}

// const warnUser = name => {
// 	alert(name + " has been warned!");

// 	// Warned User must be uploaded to backend
// 	WarnedUsers.push(name);
// }

export default function CommunityPost() {
	const community = useParams().community;
	const postId = useParams().thread;
	const [value, setValue] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState(true);

	useEffect(() => {
		setIsLoading(true);
	}, [postId]);

	useEffect(() => {
		if (isLoading === true) {
			getPost(postId).then(post => {
				console.log('post', post);

				setPost(post);
				setIsLoading(false);
			}).catch(err => {
				setPost(null);
				setIsLoading(false);
			});
		}
	}, [isLoading]);

	if (isLoading) {
		return 'Loading...'
	}
	// const post = posts.find(element => element.postId === postId);
	if (!post) {
		return <MissingPage community={community} postId={postId} />
	}

	return (
		<div className="communityPost">
			<CustomLink className="backLink" to={`/community/${community}`}>
				<ArrowNarrowLeftIcon className="icon" />
				Back to {community}
			</CustomLink>
			<div>
				<Post title={post.title} date={post.date} time={post.time} comments={post.comments} description={post.description} />
				<AddComment setValue={setValue} value={value} postId={postId} community={community} currentPost={post}/>
				{/* {comments && comments.map((comment, index) =>
					<div key={index}>
						<Comment user={comment.user} date={comment.date} time={comment.time} content={comment.content} postId={community + "_" + postId} commentId={comment.ID}/>
					</div>
				)} */}
			</div>
		</div>
	);
}
