import React, { useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import CustomLink from '../components/CustomLink';
import { posts } from './CommunityPage';
import './CommunityPost.css'

const comments = [
	{
		user: 'Haider',
		content: "It's great to be here!",
		date: "11/7/2021",
		time: "18:23"
	},
	{
		user: 'Mohsin',
		content: "Nice work everyone.",
		date: "11/7/2021",
		time: "11:42"
	}
];

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
	return (
		<div className="post">
			<h4 className="title">{props.user}</h4>
			<p className="content">{props.content}</p>
			<div className="details">
				<p className="date"> {props.date}</p>
				<p className="timestamp"> {props.time}</p>
			</div>
			<div className="adminButtons">
				<button className="small" onClick={() => { removePost(props.commentId) }}>Remove Comment</button>
				<button className="small" onClick={() => { warnUser(props.user) }}>Warn User</button>
			</div>
		</div>
	);
}

function AddComment(props) {
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
		const newComment = { user: props.user, content: inputValue, date: date, time: time };

		// New comment needs to be uploaded to backend
		comments.push(newComment);

		props.setValue(props.value + 1);
	}

	return (
		<form className="addComment">
			<label>
				<input ref={textInput} type="textarea" name="comment" />
			</label>

			<button onClick={handleSubmit}><PlusIcon className="icon"/> Add Comment</button>
		</form>
	)
}

const removePost = index => {
	var elem = document.getElementById(index);
	elem.parentNode.removeChild(elem);
}

const warnUser = name => {
	alert(name + " has been warned!");
}

export default function CommunityPost() {
	const community = useParams().community;
	const postId = useParams().thread;
	const post = posts.find(element => element.postId === postId);
	const [value, setValue] = useState(0);

	return (
		<div className="communityPost">
			<CustomLink className="backLink" to={`/community/${community}`}>
				<ArrowNarrowLeftIcon className="icon" />
				Back to {community}
			</CustomLink>
			<div>
				<Post title={post.title} date={post.date} time={post.time} comments={post.comments} description={post.description} />
				<AddComment setValue={setValue} value={value} user="Haider" postId={postId} />
				{comments && comments.map((comment, index) =>
					<div key={index}>
						<Comment user={comment.user} date={comment.date} time={comment.time} content={comment.content} postId={postId} commentId={comment.ID} />
					</div>
				)}
			</div>
		</div>
	);
}
