var express = require('express');
const { checkBody } = require('../modules/checkBody');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets')
const User = require('../models/users')


router.get('/', (req,res) => {
    Tweet.find()
    .then(data => {
        res.json({data})
    })
})


router.post('/:token', (req,res)=> {
    if(!checkBody(req.body, ['content'])){
        res.json({result: false, error: 'empty fields'});
        return;
    } 
    User.findOne({ token: req.params.token }).then(data => {
        if (data) {
            const hashtagRegex = /#[\w]+/g;
            const hashtags = req.body.content.match(hashtagRegex) || [];
            

            const newTweet = new Tweet({
                    content: req.body.content,
                    date: new Date(),
                    author: data.username,
                    likedBy: [],
                    hashtag: {
                        hashtag: hashtags
                    }
                    })
                    console.log(newTweet)
                    newTweet.save().then(savedTweet => {
                        res.json({result: true, message: 'tweet sent', tweet: savedTweet});
                }).catch(error => {
                    res.json({result: false, error: error});
                });
            } else {
                res.json({result: false, error:'user not found'});
            }
            }).catch(error => {
                res.json({result: false, error: error})
            })
        
      })
   

module.exports = router;