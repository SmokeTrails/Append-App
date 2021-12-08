import React, { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ArrowNarrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import UserContext from '../hooks/UserContext';
import MissingPage from './MissingPage';
// import { posts } from './CommunityPage';
import CustomLink from '../components/CustomLink';
// import { WarnedUsers } from './Admin';
import './CommunityPost.css';
import { createComment, getPost, deleteComment } from "../hooks/Api";

function Post(props) {
	return (
		<div>
			<h2 className="title"> {props.title} </h2>
			<div className="postDescription">{props.description}</div>
			<div className="info" style={{ display: "flex", color: "gray", margin: "0px" }}>
				<p className="date" style={{ marginRight: "20px" }}> {props.date}</p>
				<p className="timestamp" style={{ marginRight: "20px" }}> {props.time}</p>
				<p className="comments">{props.comments.length} comments</p>
			</div>
		</div>
	);
}

function Comment(props) {
	const user = useContext(UserContext);
	return (
		<div className="post">
			<h4 className="title">{props.user}</h4>
			<p className="content">{props.content}</p>
			<div className="details">
				<p className="date"> {props.date}</p>
				<p className="timestamp"> {props.time}</p>
			</div>
			{user.username === 'admin' && (
				<div className="adminButtons">
					<button className="small" onClick={() => { deleteComment(props.currentPost._id, props.currentComment._id) }}>Remove Comment</button>
				</div>
			)}
		</div>
	);

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

		console.log("Post ID: " + props.currentPost._id )
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
				setPost(post);
				setIsLoading(false);
			}).catch(err => {
				setPost(null);
				setIsLoading(false);
			});
		}
	}, [postId, isLoading]);

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
				<div>
					{post.comments && post.comments.map((comment, index) =>
						<div key={index}>
							<Comment key={index} content={comment.content} user={comment.user} date={comment.date} time={comment.time} currentPost={post} currentComment={comment}/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
