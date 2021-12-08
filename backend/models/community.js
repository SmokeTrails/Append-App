/* Community mongoose model */
const mongoose = require('mongoose');

const CommentS = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	content: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    date: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    time: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	}
})

const PostS = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	poster: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	description: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    date: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    time: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    communityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Community'
	},
	comments: [CommentS]
})

const CommunityS = new mongoose.Schema({
	path: {
		type: String,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
    imageUrl: {
		type: String,
		minlegth: 1,
		trim: true
	},
   	members: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'User'
		}
	],
	posts: [PostS]
})

const Community = mongoose.model('Community', CommunityS);
const Post = mongoose.model('Post', PostS);
const Comment = mongoose.model('Comment', CommentS);

module.exports = { Post, Community, Comment };
