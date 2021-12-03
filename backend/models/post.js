/* Post mongoose model */
const mongoose = require('mongoose')

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
    PostID: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
})

module.exports = { Post }