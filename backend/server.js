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
const multer = require('multer');
var fs = require('fs');
app.use(cors());
app.options('*', cors());

// mongoose and mongo connection
const { mongoose } = require('./mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// to validate object IDs
const { ObjectId } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
app.use(bodyParser.json());

// serve static react build
app.use(express.static(path.join(__dirname, '../frontend/build')));

function isMongoError(error) {
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// import the mongoose models
const { Post, Community } = require('./models/community');
const { User } = require('./models/user');

const authenticate = async (req, res, next) => {
	// if (env !== 'production' && USE_TEST_USER)
	//     req.session.user = 'user';
	// console.log(req.session.user)

	if (req.session.user) {
		try {
			const user = await User.findOne({ 'username': req.session.user });
			if (!user) {
				return Promise.reject();
			}

			req.user = user;
			next();
			return;
		} catch (error) {
			res.status(401).send("Unauthorized");
			return;
		}
	}

	res.status(401).send("Unauthorized");
}

/*** Session handling **************************************/
// Create a session and session cookie
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
	secret: process.env.SESSION_SECRET || "thisismysecretkeyngrieugbitgk",
	saveUninitialized: true,
	cookie: { maxAge: oneDay },
	resave: false,
	store: MongoStore.create({
		mongoUrl: 'mongodb+srv://team51:54321@cluster0.dsirf.mongodb.net/Team51?retryWrites=true&w=majority'
	})
}))

// A route to login and create a session
app.post("/api/login", async (req, res) => {
	const username = req.body.username
	const password = req.body.password
	log('yo')
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({ 'username': username })
		if (!user) {
			res.status(400).send();
			return;
		}
		else {
			const match = await bcrypt.compare(password, user.password)
			if (match) {
				req.session.user = username;
				user.password = undefined;
				res.send(user)
			}
			else {
				res.status(400).send()
			}
		}
	} catch (error) {
		log(error)
		res.status(400).send()
	}

})

// A route to logout a user
app.get("/api/logout", async (req, res) => {
	req.session.destroy(error => {
		if (error) {
			res.status(500).send(error);
		} else {
			log("The user has been destroyed.")
			res.send()
		}
	});
})

// A route to check if a user is logged in on the session
app.get("/api/check-session", async (req, res) => {
	log("Session in check session: ", req.session)
	if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
		log(process.env.TEST_USER_ON)
		req.session.user = 'user'
		res.send({ currentUser: 'user' })
		return;
	}
	if (req.session.user) {
		log("The user has been set.")
		try {
			const user = await User.findOne({ 'username': req.session.user });

			if (!user) {
				res.status(400).send()
			}
			else {
				user.password = undefined
				res.send(user);
			}
		} catch (error) {
			res.status(400).send()
		}
	} else {
		res.status(401).send();
	}
});


/*** Community API routes **************************************/
const restrictedCommunities = ['create'];

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, '../uploads');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.')));
// 	}
// });

// const upload = multer({ storage: storage });

//Create new community:
// upload.single('image')
app.post('/api/community/create', [authenticate], async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	if (req.body.path === restrictedCommunities) {
		res.status(400).send('Bad Request: restricted community path');
		return;
	}

	// console.log('CREATE COMMUNITY')
	// console.log(req.body)
	// console.log('creator:', req.user._id)
	// res.send('Success')

	const community = new Community({
		path: req.body.path,
		name: req.body.name,
		creator: req.user._id,
		description: req.body.description,
		imageUrl: req.body.image,
		members: [req.user._id],
		posts: []
	})
	log(community)

	try {
		const result = await community.save();

		if (!result) {
			res.status(400).send('Bad Request')
			return
		}

		const user = await User.findById(req.user._id);
		if (!user) {
			res.status(400).send('Bad Request')
			return
		}
		
		user.communities.push()
		user.communities.push(result._id);
		const newUser = await user.save()
		newUser.password = undefined;
		console.log("Community added to backend!!");
		res.send({'path': result.path, 'user': newUser})
	} catch (error) {
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

	if (!ObjectId.isValid(id)) {
		res.status(404).send()
		return;
	}

	const user = await User.findOne({ 'username': req.session.user });

	if (!user) {
		res.status(400).send('Bad Request')
		return;
	}

	const post = new Post({
		title: req.body.title,
		poster: user._id,
		description: req.body.description,
		date: req.body.date,
		time: req.body.time,
		comments: [],
		communityID: id
	})

	try {
		const community = await Community.findById(id)

		if (!community) {
			res.status(404).send('Resteraunt not found')
		} else {
			community.posts.push(post)
			res.send({ community, post })
			post.save()
			community.save()
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

//Create comment inside of post
app.post('/api/posts/:postID', authenticate, async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	const post_id = req.params.postID

	if (!ObjectId.isValid(post_id)) {
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
			res.send({ post, comment })
			post.save()
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
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

//Get suggested communities
app.get('/api/suggested-communities', authenticate, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const community = await Community.aggregate([
			{ $sample: { size: 5 } }
		]);
		// console.log(community)

		if (!community) {
			res.status(404).send('Community not found');
			return;
		}
		
		res.send(community);
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Get specific community
app.get('/api/community/:communityPath', authenticate, async (req, res) => {
	const communityPath = req.params.communityPath;

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Find by path
	try {
		const community = await Community.findOne({"path" : {$regex : communityPath}}).populate("members")
		if (!community) {
			res.status(404).send('Community not found')
			return
		}
		
		res.send(community)
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Get specific community by id
app.get('/api/community/byId/:id', authenticate, async (req, res) => {
	const id = req.params.id;

	if (!ObjectId.isValid(id)) {
		res.status(400).send('Bad Request')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	//If id valid, findById
	try {
		const community = await Community.findById(id).populate("members")
		if (!community) {
			res.status(404).send('Community not found')
		} else {
			res.send(community)
		}
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Community by path
app.delete('/api/community/:communityPath', authenticate, async (req, res) => {
	const communityPath = req.params.communityPath;

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Find by path
	try {
		const community = await Community.findOne({"path" : {$regex : communityPath}}).remove().exec();
		if (!community) {
			res.status(404).send('Community not found')
			return
		}
		await User.updateMany({ $pull: { communities: community._id} }).exec()

		res.send(community)
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Get post
app.get('/api/posts/:postId', authenticate, async (req, res) => {
	const postId = req.params.postId;

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	if (!ObjectId.isValid(postId)) {
		res.status(400).send('Bad Request')
		return;
	}

	// Find post
	try {
		console.log(postId)
		const post = await Post.findById(postId)
		// .populate("members")
		if (!post) {
			res.status(404).send('Post not found')
			return
		}
		
		res.send(post)
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Post by ID
app.delete('/api/community/:id/:postID', authenticate, async (req, res) => {
	const community_id = req.params.id
	const post_id = req.params.postID

	if (!ObjectId.isValid(community_id) || !ObjectId.isValid(post_id)) {
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
			Community.findById(id, function (err, parent) {
				var post = parent.posts.id(post_id);
				if (!post) {
					res.status(404).send('Post not found')
				} else {

					for (let index = 0; index < parent.posts.length; index++) {
						if (parent.posts[index]._id == resv_id) {
							const remov = parent.post[index]
							parent.posts.splice(index, 1);
							parent.save()
							res.send({ remov, parent })
						}
					}
				}
			});
		}
	} catch (error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Comment by ID
app.delete('/api/posts/:postID/:commentID', authenticate, async (req, res) => {
	const post_id = req.params.postID
	const comment_id = req.params.commentID

	if (!ObjectId.isValid(comment_id) || !ObjectId.isValid(post_id)) {
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
			Post.findById(id, function (err, parent) {
				var comment = parent.posts.id(comment_id);
				if (!comment) {
					res.status(404).send('Comment not found')
				} else {

					for (let index = 0; index < parent.comments.length; index++) {
						if (parent.comments[index]._id == resv_id) {
							const remov = parent.comments[index]
							parent.comments.splice(index, 1);
							parent.save()
							res.send({ remov, parent })
						}
					}
				}
			});
		}
	} catch (error) {
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
	try {
		const user = await User.findOne({ 'username': req.body.username })
		if (!user) {
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(req.body.password, salt)
			const user = new User({
				name: req.body.name,
				username: req.body.username,
				password: hash,
				imageUrl: 'users/DefaultPic.jpg',
				bio: req.body.bio,
				interests: req.body.interests,
				year: req.body.year,
				program: req.body.program,
				communities: [],
				friends: [],
				warnings: []
			})
			// log(user)
			const newUser = await user.save()
			newUser.password = undefined
			res.send(newUser)
		}
		else {
			res.send({ message: "Already exists" })
		}
	} catch (error) {
		log(error)
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
		users.forEach(user => {
			user.password = undefined;
		})
		res.send(users)
		// res.send({users}) // just in case we need this
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// A get route to get a user with a specific username
app.get('/api/users/:username', authenticate, async (req, res) => {
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
	try {
		const user = await User.findOne({ 'username': username })
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			user.password = undefined;
			res.send(user)
		}
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// A get route to get a user with a specific id
app.get('/api/users/byid/:id', authenticate, async (req, res) => {
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
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			user.password = undefined;
			res.send(user)
		}
	} catch (error) {
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
		const user = await User.findOneAndRemove({ 'username': username })
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			res.send(user)
		}
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

// A post route to add a friend or community to the user
app.post('/api/users/:username', authenticate, async (req, res) => {
	console.log('adding friend')
	const username = req.params.username
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findOne({ 'username': username })
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			if (req.body.what === "friend") {
				const friend = await User.findOne({ 'username': req.body.friendUsername })
				if (!friend) {
					res.status(404).send('Resource not found')
				}
				else {
					user.friends.push(friend._id);
					await user.save();

					friend.friends.push(user._id);
					await friend.save();

					res.send({ friend, user });
				}
			} else if (req.body.what === "community") {
				const community_id = req.body.communityId;

				if (!ObjectId.isValid(community_id)) {
					res.status(404).send('Resource not found');
					return;
				}
				const community = await Community.findById(community_id).populate("members");
				if (!community) {
					res.status(404).send('Resource not found');
					return;
				}

				community.members.push(user._id);
				await community.save();
				user.communities.push(community._id)
				const newUser = await user.save();
				newUser.password = undefined;
				res.send({ community, 'user': newUser })
			} else {
				res.status(400).send('Bad Request')
			}
		}
	} catch (error) {
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
		const user = await User.findOne({ 'username': username })
		if (!user) {
			res.status(404).send('Resource not found')
		}
		else {
			if (req.params.what === "friend") {
				const friend = await User.findOne({ 'username': req.body.friendUsername })
				if (!friend) {
					res.status(404).send('Resource not found')
				}
				else {
					user.friends.pull(friend._id)
					await user.save()
					res.send({ friend, user })
				}
			} else if (req.params.what === "community") {
				const community_id = req.body.communityId;
				if (!ObjectId.isValid(community_id)) {
					res.status(404).send('Resource not found');
					return;
				}
				const community = await Community.findById(community_id).populate("members");
				if (!community) {
					res.status(404).send('Resource not found');
					return;
				}

				community.members.pull(user._id);
				await community.save();
				user.communities.pull(community._id)
				const newUser = await user.save();
				newUser.password = undefined;
				res.send({ community, 'user': newUser })
			} else {
				res.status(400).send('Bad Request')
			}
		}
	} catch (error) {
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
	// console.log(req.body)
	// const fieldsToUpdate = {}
	// req.body.map((change) => {
	// 	console.log(change)
	// 	const propertyToChange = change.path.substr(1) // getting rid of the '/' character
	// 	fieldsToUpdate[propertyToChange] = change.value
	// })
	const fieldsToUpdate = {}
	for (const [key, value] of Object.entries(req.body)) {
		fieldsToUpdate[key] = value;
	  }

	// If the password is being changed, rehash the password
	if ("password" in fieldsToUpdate) {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(fieldsToUpdate["password"], salt)
		fieldsToUpdate["password"] = hash
	}
	try {
		console.log(fieldsToUpdate)
		const user = await User.findOneAndUpdate({ 'username': username }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
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
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
})

/*************************************************/
// Express server listening...

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
