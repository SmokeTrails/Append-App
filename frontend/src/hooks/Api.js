import ENV from '../config.js'
// const axios = require('axios');
const API_HOST = ENV.api_host;

export const getUser = (username) => {
	return fetch(`/api/users/${username}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			// console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getUserById = (userId) => {
	return fetch(`/api/users/byid/${userId}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			// console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getCommunity = (communityPath) => {
	return fetch(`/api/community/${communityPath}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			// console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getCommunityById = (communityId) => {
	return fetch(`/api/community/byId/${communityId}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const leaveCommunity = (username, communityId) => {
	return fetch(`/api/users/${username}/community`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ 'communityId': communityId })
	})
		.then(res => {
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const joinCommunity = (username, communityId) => {
	return fetch(`/api/users/${username}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ 'what': 'community', 'communityId': communityId })
	})
		.then(res => {
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getSuggestedCommunities = () => {
	return fetch(`/api/suggested-communities`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getAllCommunities = () => {
	return fetch(`/api/community`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const addFriend = (username, userToFriend) => {
	return fetch(`/api/users/${username}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ 'what': 'friend', 'friendUsername': userToFriend })
	})
		.then(res => {
			console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

export const getFriends = (username) => {
	return fetch(`/api/users/${username}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}

//Add new community
export const addCommunity = (community) => { //, dashboardComp) => {
	// the URL for the request
	console.log(community)

	// const formData = new FormData();
	// formData.append('name', community.name);
	// formData.append('path', community.path);
	// formData.append('creator', community.creator);
	// formData.append('description', community.description);
	// formData.append('image', community.image);

	// axios.post(`/api/community/create`, formData)
	fetch(`/api/community/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(community)
	})
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.log(error);
		});

	/* The data we are going to send in our request
	const community = newComm
	// Create our request constructor with all the parameters we need
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(community),
		headers: {
			Accept: "application/json, text/plain",
			"Content-Type": "application/json"
		}
	});

	// Send the request with fetch()
	fetch(request)
		.then(function (res) {
			if (res.status === 200) {
				alert("Community Added!")
			} else {
				alert("Community Cannot be added. Status code: " + res.status)
			}
		})
		.catch(error => {
			console.log(error);
		});
		*/
};

//Add new post
export const addPost = (formComp, dashboardComp, comID) => {
	// the URL for the request
	const url = `${API_HOST}/api/community/${comID}`;

	// The data we are going to send in our request
	const post = formComp.state

	// Create our request constructor with all the parameters we need
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(post),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	});

	// Send the request with fetch()
	fetch(request)
		.then(function (res) {
			// Handle response we get from the API.
			// Usually check the error codes to see what happened.
			if (res.status === 200) {
				// If student was added successfully, tell the user.
				dashboardComp.setState({
					message: {
						body: "Success: Added a Post.",
						type: "success"
					}
				});
			} else {
				// If server couldn't add the student, tell the user.
				// Here we are adding a generic message, but you could be more specific in your app.
				dashboardComp.setState({
					message: {
						body: "Error: Could not add Post.",
						type: "error"
					}
				});
			}
		})
		.catch(error => {
			console.log(error);
		});
};

//Add new comment
export const addComment = (formComp, dashboardComp) => {
	// the URL for the request
	const url = `${API_HOST}/api/community/:communityID`;

	// The data we are going to send in our request
	const comment = formComp.state

	// Create our request constructor with all the parameters we need
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(comment),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	});

	// Send the request with fetch()
	fetch(request)
		.then(function (res) {
			// Handle response we get from the API.
			// Usually check the error codes to see what happened.
			if (res.status === 200) {
				// If student was added successfully, tell the user.
				dashboardComp.setState({
					message: {
						body: "Success: Added a comment.",
						type: "success"
					}
				});
			} else {
				// If server couldn't add the student, tell the user.
				// Here we are adding a generic message, but you could be more specific in your app.
				dashboardComp.setState({
					message: {
						body: "Error: Could not add comment.",
						type: "error"
					}
				});
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export const deleteCommunity = (communityPath) => {
	return fetch(`/api/community/${communityPath}`, {
		headers: {
			method: "delete",
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			console.log(res)
			if (res.status === 200)
				return res.json();
			else throw 'Error'
		})
		.catch(error => {
			console.log(error);
			return null;
		});
}