const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    hashtag: [String],
})

const tweetSchema = mongoose.Schema({
    content: String,
    date: Date,
    author: String,
    likedBy: [{type : mongoose.Schema.Types.ObjectId, ref: 'users'}],
    hashtag: hashtagSchema,
})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;