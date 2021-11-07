import React, { useState } from 'react';
import { useParams, Link  } from "react-router-dom";

export const posts = [
	{
		title: 'Whatsup yo hi',
		description: "yo yo yo yo yo yo",
		date: "11/7/2021",
		time: "6:23",
		comments: "3",
		community: "CSC309",
		postId: "CSC309_0"
	}, 
	{
		title: 'My first Post !!!1',
		description: "Happy to be here!",
		date: "11/7/2021",
		time: "13:19",
		comments: "3",
		community: "CSC309",
		postId: "CSC309_1"
	},
	{
		title: 'Anyone done the assignment?',
		description: "Im kinda stuck on 2b",
		date: "11/7/2021",
		time: "4:23",
		comments: "0",
		community: "CSC309",
		postId: "CSC309_2"
	}
	
];

function Post(props){
	const url = `/${props.community}/${props.postId}`
	return(
		<Link to={url} style = {{borderStyle: "solid", borderColor: "gray", borderWidth: "0.01em", marginBottom: "2px"}}>
			<li className = "row" style={{listStyleType: "none"}}>
				<h4 className = "title" style={{margin: "0px"}}> {props.title} </h4>
				<div className = "content" style={{display: "flex", color:"gray", margin:"0px"}}>
					<p className = "date" style={{marginRight: "20px"}}> {props.date}</p>
					<p className = "timestamp" style={{marginRight: "20px"}}> {props.time}</p>
					<p className = "comments">{props.comments} comments</p>
				</div>
			</li>
		</Link>
	);
}


function AddPost(props) {
	const handleSubmit= (e) => {
		e.preventDefault();
		var today = new Date(),
		time = today.getHours() + ':' + today.getMinutes();
		var date = today.getMonth()+1 + '/' + today.getDate() + '/' + today.getFullYear();
		const newPost = {title: e.target[0].value, description: e.target[1].value, date: date, time: time, comments: '0', community: props.community, postId: props.comments+"_"+props.postId}
		posts.push(newPost);
		props.setAddPost(false);
	  }

	return (
		<form onSubmit = {e => {handleSubmit(e)}}>
			<label>
				<h4 style = {{margin:"0px"}}>Title</h4>
				<input type="textarea" name="Title" style={{ fontSize: "150%", width: "1000px", height: "30px" }}/>
			</label>
			<label>
				<h4 style = {{margin:"0px"}}>Description</h4>
				<input type="textarea" name="content" style={{ fontSize: "100%", width: "1000px", height: "30px" }}/>
			</label>

			<input type="submit" value="Post"/>
		</form>
	)
}

export default function CommunityPage() {
	const community = useParams().community;
	const [addPost, setAddPost] = useState(false);

	return (
		<div>
			<h1>Welcome to {community}</h1>
			{posts && posts.map((post, index) =>
					<div key={index}>
						<Post title={post.title} date={post.date} time={post.time} comments={post.comments} community={post.community} postId={index}/>
					</div>
			)}

			{addPost &&
				<AddPost setAddPost={setAddPost} community={community}/>	
			}
			{!(addPost) &&
				<button onClick={() => setAddPost(true)}>{'Add Post'}</button>
			}
			
		</div>
	);
}

