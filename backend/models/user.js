/* Mongoose model for user accounts */
const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    // friendCount: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    // clubCount: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    interests: {
        type: [String],
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    program: {
        type: String,
        required: true,
        trim: true
    },
    // courseCodes: {
    //     type: [String],
    //     required: true,
    //     trim: true
    // },
    // communityNames: {
	// 	type: [String],
    //     required: true,
    //     trim: true
    // }
	communities: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'Community'
		}
	]
})

module.exports = { User };
