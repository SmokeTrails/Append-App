import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { addCommunity } from "../hooks/Api";
import UserContext from '../hooks/UserContext';
import './CreateCommunity.css';

const convertBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			resolve(fileReader.result);
		}
		fileReader.onerror = (error) => {
			reject(error);
		}
	})
}

function NewCommunity(props) {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [path, setPath] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);

	// const uploadImage = (file) => {
	// 	// const formData = new FormData();
	// 	// console.log(file)
	// 	// formData.append('image', file, file.name);

	// 	// fetch(`/api/upload-image`, {
	// 	// 	method: 'POST',
	// 	// 	body: formData
	// 	// })
	// 	// .then(res => {
	// 	// 	console.log(res)
	// 	// })
	// 	// .catch(error => {
	// 	// 	console.log(error);
	// 	// });

   	// 	setImage(file);
	// }

	const saveCommunity = async (e) => {
		e.preventDefault();

		// const communityImage = await convertBase64(image);

		addCommunity({
			name: name,
			path: path,
			description: description,
			image: image,
		}).then(res => {
			props.setUser(res.user);
			navigate(`/community/${res.path}`);
		})
	}

	return (
		<form className="createCommunity" onSubmit={saveCommunity}>
			<label className="title">
				Community Name
				<TextareaAutosize name="name" maxLength="50" value={name} onChange={event => setName(event.target.value)} />
			</label>

			<label className="title">
				Customize Web Address
				<TextareaAutosize name="path" maxLength="50" value={path} onChange={event => setPath(event.target.value)} />
			</label>

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
	)
}

export default function CommunityPage(props) {
	return (
		<div>
			<NewCommunity setUser={props.setUser} />
		</div>
	)
}

// path: 'csc309',
// name: 'CSC309',
// description: "This course provides an introduction to the technologies used for developing Web applications. We discuss technologies for static and dynamic content generation, including N-tier, MVC architectures, and mobile supported web development. We also cover general web design principles, security, and web performance.",
// memberCount: 1012,
// imageUrl: 'communities/csc309.jpg',
// users: [
//     { name: 'Haider', username: 'user' },
//     { name: 'Kirill', username: 'KirillTregubov', imageUrl: 'users/kirill.png', }
// ]