const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    token: String,
    tweet: {type : mongoose.Schema.Types.ObjectId, ref: 'tweets'}
})

const User = mongoose.model('users', usersSchema);

module.exports = User;