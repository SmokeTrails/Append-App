import React, { useState } from 'react';
import { useParams} from "react-router-dom";
import  {posts} from './CommunityPage';

const comments = [
	{
		user: 'Haider',
		content: "Okay Congrats",
		date: "11/7/2021",
		time: "6:23",
        ID: "comment0"
	}, 
	{
		user: 'Mohsin',
		content: "Nice",
		date: "11/7/2021",
		time: "12:42",
        ID: "comment1"
	}
];

function Post(props){
	return(
		<div>
			<h2 className = "title"> {props.title} </h2>
            <div className="postDescription">{props.description}</div>
			<div className = "info" style={{display: "flex", color:"gray", margin:"0px"}}>
                <p className = "date" style={{marginRight: "20px"}}> {props.date}</p>
				<p className = "timestamp" style={{marginRight: "20px"}}> {props.time}</p>
				<p className = "comments">{props.comments} comments</p>
			</div>
		</div>
	);
}

function Comment(props){
    console.log(props.postId === props.commentId);
    if(props.postId === props.commentId){
        return(
            <li className = "row" style={{listStyleType: "none", borderStyle: "solid", borderColor: "gray", borderWidth: "0.01em", marginBottom: "2px"}}>
                <h4 style={{margin: "0px"}}>{props.user}</h4>
                <div className="content">{props.content}</div>
                <div className = "info" style={{display: "flex", color:"gray", marginTop:"0px", fontSize: "80%"}}>
                    <p className = "date" style={{marginRight: "20px", marginTop:"0px"}}> {props.date}</p>
                    <p className = "timestamp" style={{marginRight: "20px", marginTop:"0px"}}> {props.time}</p>
                </div>
                
            </li>
        );
    }else{
        return(null);
    }
}

function AddComment(props) {
	const handleSubmit= (e) => {
		e.preventDefault();
		var today = new Date(),
		time = today.getHours() + ':' + today.getMinutes();
		var date = today.getMonth()+1 + '/' + today.getDate() + '/' + today.getFullYear();
		const newComment = {user: props.user, content: e.target[0].value, date: date, time: time, ID: props.postId};
		comments.push(newComment);
        props.setValue(props.value+1);
	  }

	return (
		<form onSubmit = {e => {handleSubmit(e)}} style={{marginBottom: "20px"}}>
			<label>
				<input type="textarea" name="comment" style={{ fontSize: "120%", width: "1000px", height: "30px" }}/>
			</label>

			<input type="submit" value="Add Comment"/>
		</form>
	)
}

export default function CommunityPost() {
    // const community = useParams().community;
    const postId = useParams().thread;
    const post = posts.find(element => element.postId === postId);
    const [value, setValue] = useState(0);
    
	return (
		<div>
			{ post.title }
			{/* <Post title={post.title} date={post.date} time={post.time} comments={post.comments} description={post.description}/>
            <AddComment setValue={setValue} value={value} user="Haider" postId={postId}/>
            {comments && comments.map((comment, index) =>
                <div key={index}>
                        <Comment user={comment.user} date={comment.date} time={comment.time} content={comment.content} postId={postId} commentId={comment.ID}/>
                </div>	
			)} */}
		</div>
	);
}