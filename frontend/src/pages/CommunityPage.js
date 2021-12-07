import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import NumberFormat from 'react-number-format';
import TextareaAutosize from 'react-textarea-autosize';
import { UserGroupIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/outline';
import UserContext from '../hooks/UserContext';
import CustomLink from '../components/CustomLink';
import FriendPreview from '../components/FriendPreview';
import MissingPage from '../pages/MissingPage';
import './CommunityPage.css';
import { getCommunity, leaveCommunity, joinCommunity, createPost } from "../hooks/Api";

export const posts = [
	{
		title: 'Welcome to our community!',
		user: 'Joshua',
		description: "Dont forget to be nice and have a fun time!",
		date: "11/7/2021",
		time: "6:23",
		comments: "1",
		postId: "0",
		forumId: "CSC309"
	},
	{
		title: 'What do you guys think about our prof and TAs?',
		user: "Kirill",
		description: "I feel like the TAs and profs for this course are really good, what do you guys think?",
		date: "11/7/2021",
		time: "13:19",
		comments: "1",
		postId: "1",
		forumId: "CSC309"
	},
	{
		title: 'Anyone done the assignment?',
		user: "Rehan",
		description: "Im kinda stuck on 2b",
		date: "11/7/2021",
		time: "16:23",
		comments: "0",
		postId: "2",
		forumId: "CSC309"
	}
];

function Post(props) {
	const user = useContext(UserContext);
	const url = `/community/${props.community}/${props.postId}`

	const removePost = index => {
		var post = document.getElementById(index);

		// Post needs to be removed from backend
		post.parentNode.removeChild(post);
	}

	const warnUser = name => {
		alert(name + " has been warned!");
	}

	return (
		<div className="post" id={url}>
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
			{user.username === 'admin' && (
				<div className="adminButtons">
					<button className="small" onClick={() => { removePost(url) }}>Remove Post</button>
					<button className="small" onClick={() => { warnUser(props.user) }}>Warn User</button>
				</div>
			)}
		</div>
	);
}

function AddPost(props) {
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (e.target[0].value.length === 0 || e.target[1].value.length === 0) {
			alert('Fields cannot be empty!');
			return;
		}

		var today = new Date();
		var time = today.getHours() + ':' + today.getMinutes();
		var date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		const newPost = { title: e.target[0].value, user: props.user, description: e.target[1].value, date: date, time: time };

		// Upload to backend
		await createPost(props.community._id, newPost).then(res => {
			navigate(`/community/${props.community.path}/${res.post._id}`);
		});
		
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

			<input className="button" type="submit" value="Post" />
		</form>
	)
}

export default function CommunityPage(props) {
	const community = useParams().community;
	const [isLoading, setIsLoading] = useState(true);
	const [currentCommunity, setCurrentCommunity] = useState(null);
	const [isCommunityMember, setIsCommunityMember] = useState(false);
	const [showUserList, setShowUserList] = useState(false);
	const [addPost, setAddPost] = useState(false);
	const loggedinUser = useContext(UserContext);

	useEffect(() => {
		setIsLoading(true);
	}, [community]);

	useEffect(() => {
		if (isLoading === true) {
			getCommunity(community).then(community => {
				console.log('community', community);

				if (community == null) {
					throw 'Error'
				}

				setCurrentCommunity(community);
				setIsCommunityMember(community.members.some(member => member._id === loggedinUser._id));
				setIsLoading(false);
			}).catch(err => {
				console.log(err)
				setCurrentCommunity(null);
				setIsLoading(false);
			});
		}
	}, [isLoading]);

	const handleJoin = () => {
		if (isCommunityMember) {
			leaveCommunity(loggedinUser.username, currentCommunity._id).then(res => {
				setCurrentCommunity(res.community);
				setIsCommunityMember(false);
				props.setUser(res.user)
			})
		} else {
			joinCommunity(loggedinUser.username, currentCommunity._id).then(res => {
				setCurrentCommunity(res.community);
				setIsCommunityMember(true);
				props.setUser(res.user);
			})
		}
	}

	const updateState = (community, user) => {
		setCurrentCommunity(community);
		props.setUser(user)
	}

	const toggleUserList = () => {
		setShowUserList(!showUserList);
	}

	return (
		<div>
			{isLoading
				? 'Loading...'
				: currentCommunity
					? <div className="communityPage">
						<div className="communityCard">
							{currentCommunity.imageUrl 
								? <img className="cover" src={currentCommunity.imageUrl} alt={currentCommunity.name + "'s banner"} />
								: <img className="cover" src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt={currentCommunity.name + "'s banner"} />
							}
							<h2 className="badge" onClick={() => toggleUserList()}>
								<NumberFormat value={currentCommunity.members.length} displayType={'text'} thousandSeparator={true} /> {currentCommunity.members.length == 1 ? 'member' : 'members'}
							</h2>
							<div className="communityContent">
								<div className="communityInfo">
									<h1>{currentCommunity.name}</h1>
									<p>{currentCommunity.description}</p>
									<div>
										<button className={isCommunityMember ? 'disabled' : ''} onClick={() => handleJoin(currentCommunity)}>
											<UserGroupIcon />
											{isCommunityMember ? 'Joined' : 'Join community'}
										</button>
									</div>
									<div className="communityList">
										
										{currentCommunity.members && currentCommunity.members.length > 0
											? showUserList && [ <h2 key="memberTitle">Members</h2>,
												currentCommunity.members && currentCommunity.members.map((user, index) =>
													<div key={index}>
														<FriendPreview name={user.name} username={user.username} imageUrl={user.imageUrl} />
													</div>
												)
											]
											: showUserList && <div>
												<h2>This community has no members.</h2>
											</div>
										}
									</div>
								</div>
							</div>
						</div>
						<div>
							{addPost &&
								<AddPost setAddPost={setAddPost} updateState={updateState} user={loggedinUser.username} community={currentCommunity} />
							}
							{!(addPost) &&
								<button onClick={() => setAddPost(true)}>{'Add Post'}</button>
							}
							{currentCommunity.posts && currentCommunity.posts.map((post, index) =>
								<Post key={index} title={post.title} user={post.user} date={post.date} time={post.time} comments={post.comments.length} community={community} postId={post._id} />
							)}
						</div>
					</div>
					: <MissingPage community={community} />
			}
		</div>
	);
}
