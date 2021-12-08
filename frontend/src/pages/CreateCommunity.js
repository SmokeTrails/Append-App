import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { addCommunity } from "../hooks/Api";
import './CreateCommunity.css';

function NewCommunity(props) {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [path, setPath] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [duplicateCommunities, setDuplicateCommunities] = useState("")

	const saveCommunity = async (e) => {
		e.preventDefault();

		addCommunity({
			name: name,
			path: path,
			description: description,
			image: image,
		}, setDuplicateCommunities).then(res => {
			if (res.message === undefined) {
				props.setUser(res.user);
				navigate(`/community/${res.path}`);
			}
			else {
				setDuplicateCommunities("This address is taken. Please choose another.")
			}
		})
	}

	return (
		<div>
			<h1 className="heading">Create a Community</h1>
			<form className="createCommunity" onSubmit={saveCommunity}>
				<label className="title">
					Community Name
					<TextareaAutosize name="name" maxLength="50" value={name} onChange={event => setName(event.target.value)} />
				</label>
				<label className="title">
					Customize Web Address
					<TextareaAutosize name="path" maxLength="50" value={path} onChange={event => setPath(event.target.value)} />
				</label>
				<label> {duplicateCommunities} </label>
				<label className="title">
					Community Description
					<TextareaAutosize name="description" maxLength="200" value={description} onChange={event => setDescription(event.target.value)} />
				</label>

				<label className="title">
					Image URL
					<TextareaAutosize name="image" maxLength="200" value={image} onChange={event => setImage(event.target.value)} />
				</label>
				{/* <label className="title">
					Profile Picture
					<input name="image" type="file" accept=".png, .jpg, .jpeg" maxLength="100" onChange={event => uploadImage(event.target.files[0])} />
				</label> */}

				<input className="button" type="submit" value="Create Community" />
			</form>
		</div>
	)
}

export default function CommunityPage(props) {
	return (
		<div>
			<NewCommunity setUser={props.setUser} />
		</div>
	)
}
