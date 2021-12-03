'use strict';

const express = require('express')
const app = express();
const path = require('path');

// mongoose and mongo connection
const { mongoose } = require('./mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// to validate object IDs
const { ObjectID } = require('mongodb')

const bodyParser = require('body-parser') 
app.use(bodyParser.json())

function isMongoError(error) {
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// import the mongoose models
const { Post } = require('./models/post')

//Create new post and send to database.
app.post('/api/posts', async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	//title: e.target[0].value, user: props.user, description: e.target[1].value, date: date, time: time, comments: '0', community: props.community, postId: props.comments + "_" + props.postId };
	const post = new Post({
		Title: req.body.Title,
		User: req.body.User,
		Description: req.body.Description,
		Date: req.body.Date,
		Time: req.body.Time,
		Comments: req.body.Comments,
		Community: req.body.Community,
		PostID: req.body.PostID,
	})

	try {
		const result = await post.save()	
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

//Get all posts
app.get('/api/posts', async (req, res) => {

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	//Get posts
	try {
		const posts = await post.find()
		res.send(posts) // just the array
		//res.send({ posts }) // can wrap in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

//Get specific post using PostID
app.get('/api/posts/:id', async (req, res) => {
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
		const post = await Post.findById(id)
		if (!student) {
			res.status(404).send('Post not found')
		} else {
			//res.send({post})   
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

//Delete Post by ID
app.delete('/api/posts/:id', async (req, res) => {
	const id = req.params.id

	if (!ObjectId.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	try {
		const post = await Post.findByIdAndRemove(id)
		if (!post) {
			res.status(404).send()
		} else {   
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

//Edit Post using patch since dont need to replace all information, only the description
app.patch('/api/posts/:id', async (req, res) => {
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

	// Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

	try {
		const post = await Post.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!post) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(post)
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

app.get('*', (req, res) => {
	res.send('<h1>Hello World</h1>')
})

/*************************************************/
// Express server listening...

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})