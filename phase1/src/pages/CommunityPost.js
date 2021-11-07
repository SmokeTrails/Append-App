import React from 'react';


function Post(props){
	return(
		<li className = "row">
			<h4 className = "title"> {props.title} </h4>
			<div className = "content">
				<p className = "timestamp"> {props.time}</p>
				<p className = "comments">{props.comments}</p>
			</div>
            <div className="postDescription">{props.description}</div>
		</li>
	);
}

function Comment(props){
	return(
		<li className = "row">
			<div className = "content">
				<p className = "timestamp"> {props.time}</p>
				<p className = "user">{props.user}</p>
			</div>
            <div className="content">{props.content}</div> {/*comment content*/}
		</li>
	);
}

function AddComment() {
	const handleSubmit= (e) => {
		e.preventDefault();
		//e.target[0].value
	  }

	return (
		<form onSubmit = {e => {handleSubmit(e)}}>
			<label>
				<input type="textarea" name="comment" style={{ fontSize: "120%", width: "1000px", height: "30px" }}/>
			</label>

			<input type="submit" value="Add Comment"/>
		</form>
	)
}

export default function CommunityPage() {
	return (
		<div>
			<Post title="Test 123" time="1:20" comments="2" postDescription="hello guys first post!!"/>
            <AddComment/>
            <Comment time="1:20" user="Haider" content="okay congrats"/>
            <Comment time="1:20" user="Mohsin" content="cool nice yo"/>
		</div>
	);
}