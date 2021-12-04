/* Community mongoose model */
const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
	Title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	User: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	Description: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    Comments: {
		type: Number,
		required: true,
		default: 0
	},
    Date: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    Time: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    Community: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
    CommunityID: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
})

const Community = mongoose.model('Community', {
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
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
    imageUrl: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
   	members: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'User'
		}
	]
})

module.exports = { Post, Community };
