const express = require('express');
const router = express.Router();
const Posts = require('../models/Post')


// Get back all the posts
router.get('/', async (req, res) => {

    try {
        const posts = await Posts.find()
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
});

// submits a post
router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savePost = await post.save();
        res.json(savePost)
    } catch (err) {
        res.json({message: err})
    }
});


// specific post

router.get('/:postId', async (req, res) => {

    try {
        console.log(req.params.postId)
        const post = await Posts.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
})


router.delete('/:postId', async (req, res) => {

    try {
        const removedPost = await Posts.remove({_id: req.params.postId})
        res.json(removedPost)
    } catch (err) {
        res.json({message: err})
    }
})


router.patch('/:postId', async (req, res) => {

    try {
        const updatedPost = await Posts.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}})
        res.json(updatedPost)
    } catch (err) {
        res.json({message: err})
    }
})


module.exports = router;