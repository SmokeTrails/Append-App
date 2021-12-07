/* Mongoose model for user accounts */
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ 
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
    password: {
        type: String,
        required: true,
        minlegth: 1, 
        trim: true
    },
    imageUrl: {
        type: String,
        minlegth: 1, 
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    interests: {
        type: String,
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
	communities: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'Community'
		}
	],

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ], 
    warnings: { // Warnings they receive from admin
        type: [String],
        required: true,
        trim: true
    }}, {collection: 'Users'})

const User = mongoose.model('User', UserSchema)

module.exports = { User };
