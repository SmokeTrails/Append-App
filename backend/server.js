'use strict';

const env = process.env.NODE_ENV;
const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON;
const log = console.log;
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const path = require('path');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
app.use(cors());
app.options('*', cors());

// mongoose and mongo connection
const { mongoose } = require('./mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// to validate object IDs
const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// serve static react build
app.use(express.static(path.join(__dirname, '../frontend/build')));

function isMongoError(error) {
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// import the mongoose models
const { Post, Community } = require('./models/community');
const { User } = require('./models/user');

const authenticate = (req, res, next) => {
	if (env !== 'production' && USE_TEST_USER);
        req.session.user = 'user';

    if (req.session.user) {
        User.findOne({'username': req.session.user}).then((user) => {
            if (!user) {
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized");
        })
    } else {
        res.status(401).send("Unauthorized");
    }
}

/*** Session handling **************************************/
// Create a session and session cookie
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
	secret: "thisismysecretkeyngrieugbitgk",
	saveUninitialized: true,
	cookie: { maxAge: oneDay},
	resave: false,
	store: env === 'production' ? MongoStore.create({
		mongoUrl: 'mongodb+srv://team51:54321@cluster0.dsirf.mongodb.net/Team51?retryWrites=true&w=majority'
}) : null
}))

// A route to login and create a session
app.post("/api/users/login", async (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({'username': username})
		if (!user) {
			res.status(400).send()
		}
		else {
			const match = await bcrypt.compare(password, user.password)
			if (match) {
				req.session.user = username
				res.send({currentUser: username})
			} 
			else {
				res.status(400).send()
			}
		}
	} catch(error) {
		log(error)
        res.status(400).send()
	}
	
})

// A route to logout a user
app.get("/api/users/logout", async (req, res) => {
	req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
})

// A route to check if a user is logged in on the session
app.get("/api/users/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
		log(process.env.TEST_USER_ON)
        req.session.user = 'user'
        res.send({ currentUser: 'user' })
        return;
    }
    if (req.session.user) {
        res.send({ currentUser: req.session.user});
    } else {
        res.status(401).send();
    }
});


/*** Community API routes **************************************/
//Create new community:
app.post('/api/community/create', authenticate, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const community = new Community({
		path: req.body.path,
		name: req.body.name,
		creator: req.body.creator,
		description: req.body.description,
		imageUrl: req.body.imageURL,
		members: [],
		posts: []
	})

	try {
		const result = await community.save()	
		res.send(result)
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

//Create new post inside community
app.post('/api/community/:communityID', authenticate, async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const id = req.params.communityID

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	const post = new Post({
		Title: req.body.title,
		User: req.body.user,
		Description: req.body.description,
		Date: req.body.date,
		Time: req.body.time,
		Comments: [],
		CommunityID: req.body.communityID,
		PostID: req.body.postID,
	})

	try {
		const community = await Community.findById(id)
		
		if (!community) {
			res.status(404).send('Resteraunt not found')
		} else {
			community.posts.push(post)
			res.send({community, post})
			community.save()
		}
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

//Create comment inside of post
app.post('/api/posts/:postID', authenticate, async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 
	const post_id = req.params.postID

	if (!ObjectID.isValid(post_id)) {
		res.status(404).send()
		return;
	}

	const comment = new Comment({
		user: req.body.user,
		content: req.body.content,
		date: req.body.date,
		time: req.body.time,
	})

	try {
		const post = await Community.posts.findById(id)
		
		if (!post) {
			res.status(404).send('Resteraunt not found')
		} else {
			post.comments.push(comment)
			res.send({post, comment})
			post.save()
		}
	} catch(error) {
		log(error) 
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

//Get all communities
app.get('/api/community', authenticate, async (req, res) => {

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	//Get posts
	try {
		const communities = await Community.find()
		res.send(communities)
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

//Get specific community
app.get('/api/community/:id', authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectId.isValid(id)) {
		res.status(404).send()
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	//If id valid, findById
	try {
		const community = await Community.findById(id)
		if (!community) {
			res.status(404).send('Community not found')
		} else {
			res.send(community)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Community by ID
app.delete('/api/community/:id', authenticate, async (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	try {
		const community = await Community.findById(id)
		
		if (!resteraunt) {
			res.status(404).send('Resteraunt not found')
		} else {
			res.send(community)
	}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Post by ID
app.delete('/api/community/:id/:postID', authenticate, async (req, res) => {
	const community_id = req.params.id
	const post_id = req.params.postID

	if (!ObjectID.isValid(community_id) || !ObjectID.isValid(post_id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const community = await Community.findById(community_id)
		
		if (!community) {
			res.status(404).send('Community not found')
		} else {
		Community.findById(id, function(err, parent) {
			var post = parent.posts.id(post_id);
			if (!post) {
				res.status(404).send('Post not found')
			} else {
				
				for (let index = 0; index < parent.posts.length; index++) {
					if (parent.posts[index]._id == resv_id){
						const remov = parent.post[index]
						parent.posts.splice(index, 1);
						parent.save()
						res.send({remov, parent})
					}
				}
			}
		});
	}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Comment by ID
app.delete('/api/posts/:postID/:commentID', authenticate, async (req, res) => {
	const post_id = req.params.postID
	const comment_id = req.params.commentID

	if (!ObjectID.isValid(comment_id) || !ObjectID.isValid(post_id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const post = await Post.findById(post_id)
		
		if (!post) {
			res.status(404).send('Post not found')
		} else {
			Post.findById(id, function(err, parent) {
			var comment = parent.posts.id(comment_id);
			if (!comment) {
				res.status(404).send('Comment not found')
			} else {
				
				for (let index = 0; index < parent.comments.length; index++) {
					if (parent.comments[index]._id == resv_id){
						const remov = parent.comments[index]
						parent.comments.splice(index, 1);
						parent.save()
						res.send({remov, parent})
					}
				}
			}
		});
	}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

// app.get('*', (req, res) => {
// 	res.send('<h1>Hello World</h1>')
// })
/*** User API Routes below ************************************/
// A post route to create a new user
app.post('/api/users', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(req.body.password, salt)
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: hash,
		imageUrl: 'users/DefaultPic.png',
		bio: req.body.bio,
		interests: req.body.interests,
		year: req.body.year,
		program: req.body.program,
		communities: [],
		friends: [],
		warnings: []
	})

	try {
		log(user)
		const newUser = await user.save()
		res.send(newUser)

	} catch(error) {
		if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request')
        }
	}
})

// A get route to get all the users
app.get('/api/users', authenticate, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const users = await User.find()
		res.send(users)
		// res.send({users}) // just in case we need this
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}
})

// A get route to get a user with a specific username
app.get('/api/users/byusername/:username', authenticate, async (req, res) => {
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({'username': username})
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			res.send(user)
		}
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}
})

// A get route to get a user with a specific id
app.get('/api/users/byid/:id', authenticate, async (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			res.send(user)
		}
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}
})

// A delete route to delete a user with a specific username
app.delete('/api/users/:username', authenticate, async (req, res) => {
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOneAndRemove({'username': username})
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			res.send(user)
		}
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}
})

// A post route to add a post or community to the user
app.post('/api/users/:username', authenticate, async (req, res) => {
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({'username': username})
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			if (req.body.what === "friend") {
				const friend = await User.findOne({'username': req.body.friendUsername})
				if (!friend) {
					res.status(404).send('Resource not found')
				}
				else {
					user.friends.push(friend._id)
					await user.save()
					res.send({friend, user})
				}
			} else if(req.body.what === "community") {
				const community = await Community.findOne({'name': req.body.communityName})
				if (!community) {
					res.status(404).send('Resource not found')

				}
				else {
					user.communities.push(community._id)
					await user.save()
					res.send({community, user})
				}
			} else {
				res.status(400).send('Bad Request')
			}
		}
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}

})

// A delete route to delete a friend or community from the user 
app.delete('/api/users/:username/:what', authenticate, async (req, res) => {
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({'username': username})
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			if (req.params.what === "friend") {
				const friend = await User.findOne({'username': req.body.friendUsername})
				if (!friend) {
					res.status(404).send('Resource not found')
				}
				else {
					user.friends.pull(friend._id)
					await user.save()
					res.send({friend, user})
				}
			} else if(req.params.what === "community") {
				const community = await Community.findOne({'name': req.body.communityName})
				if (!community) {
					res.status(404).send('Resource not found')

				}
				else {
					user.communities.pull(community._id)
					await user.save()
					res.send({community, user})
				}
			} else {
				res.status(400).send('Bad Request')
			}
		}
	} catch(error) {
		log(error)
        res.status(500).send("Internal Server Error")
	}
})

// A route for changing a user's profile
app.patch('/api/users/:username', authenticate, async (req, res) => {
	const username = req.params.username
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})
	// If the password is being changed, rehash the password
	if ("password" in fieldsToUpdate) {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(fieldsToUpdate["password"], salt)
		fieldsToUpdate["password"] = hash
	}
	try {
		const user = await User.findOneAndUpdate({'username': username}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/*** Webpage Routes below ************************************/
// app.get('*', (req, res) => {
// 	res.sendFile(__dirname + "/frontend/public/index.html");
// })
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
})

/*************************************************/
// Express server listening...

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})