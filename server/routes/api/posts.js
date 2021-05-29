const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.post('/', [auth, [
    check('text', 'Status is required')
        .not()
        .isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        if (!posts) {
            return res.status(400).json({
                msg: 'There is no posts'
            });
        }
        res.json(posts);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(400).json({
                msg: 'There is no post matched'
            });
        }
        res.json(post);
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'There is no post matched'
            });
        }
        res.status(500).send('Server Error');
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() == req.user.id).length > 0) {
            return res.status(400).json({
                msg: "User has already liked the post"
            });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'post not found'
            });
        }
        res.status(500).send('Server Error');
    }
});

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like =>
            like.user.toString() == req.user.id).length == 0) {
            return res.status(400).json({
                msg: "Post has not yet been liked!"
            });
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'post not found'
            });
        }
        res.status(500).send('Server Error');
    }
});
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(401).json({ msg: 'Post Not Found !!' });
        }
        if (post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User Not Authenticated!!' });
        }
        await post.remove();
        res.json({ msg: 'Post Removed' });
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'post not found'
            });
        }
        res.status(500).send('Server Error');
    }
})

// comments
router.post('/comment/:post_id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(401).json({ msg: 'Post Not Found !!' });
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id == req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment Not Found !!' });
        }
        if (comment.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized !!' });
        }
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.msg);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'post not found'
            });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;