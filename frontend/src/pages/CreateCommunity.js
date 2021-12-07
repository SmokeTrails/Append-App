import React from 'react';
import { addCommunity } from "../actions/Communities";
import TextareaAutosize from 'react-textarea-autosize';

function NewCommunity(props) {
    const saveCommunity = (e) => {
		e.preventDefault();

        if (e.target[0].value.length === 0 || e.target[1].value.length === 0) {
			alert('Fields cannot be empty!');
			return;
		}

		const community = { title: e.target[0].value, description: e.target[1].value, imageURL: e.target[2].value }
		//Send new community to backend database:

	    //Send post to backend database:
		addCommunity(community)
	}

    return (
		<form className="post new" onSubmit={saveCommunity}>
			<label className="title">
				Community Name
				<TextareaAutosize name="title" maxLength="50" />
			</label>

			<label className="title">
				Community Description
				<TextareaAutosize name="description" maxLength="200" />
			</label>

            <label className="title">
				Profile Picture URL
				<TextareaAutosize name="ImageURL" maxLength="100" />
			</label>

			<input className="button" type="submit" value="Create Community"/>
		</form>
	)

}

export default function CommunityPage() {
    return (
        <div>
            <NewCommunity/>
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