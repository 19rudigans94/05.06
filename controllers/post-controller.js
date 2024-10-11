// post-controller.js

import Post from "../models/post.js";
import createPath from "../helpers/createPath.js";

const getPosts = (req, res) => {
    console.log('getting posts from db...');
    Post.find()
        .then((posts) => {
            if (!posts || posts.length === 0) {
                console.error('Error getting posts from db: Empty response');
                return res.status(500).send('Error getting posts from db: Empty response');
            }
            console.log('Got posts from db');
            return res.render(createPath("posts"), { title: "Posts page", posts });
        })
        .catch((err) => {
            console.error('Error getting posts from db', err);
            return res.status(500).send('Error getting posts from db');
        });
}

const createGetPost = (req, res) => {
    try {
        res.render(createPath("create"), { title: "Create page" });
    } catch (err) {
        console.error('Error rendering create page', err);
        return res.status(500).send('Error rendering create page');
    }
}

const setPost = (req, res) => {
    const { name, username, email, phone } = req.body;
    const newPost = new Post({ name, username, email, phone });
    newPost.save()
        .then(() => {
            console.log("Post saved to database");
            res.redirect("/posts");
        })
        .catch((err) => {
            console.error('Error saving post to db', err);
            return res.status(500).send('Error saving post to db');
        });
};

const getMain = (req, res) => {
    try {
        res.render(createPath("main"), { title: "Main page" });
    } catch (err) {
        console.error('Error rendering main page', err);
        return res.status(500).send('Error rendering main page');
    }
}

const getChange = (req, res) => {
    console.log(getChange);
}

const deletePost = (req, res) => {
    const { id } = req.params;
    if (!id) {
        console.error('Error deleting post from db: No id provided');
        return res.status(500).send('Error deleting post from db: No id provided');
    }
    Post.findByIdAndDelete(id)
        .then(() => {
            console.log("Post deleted from database");
            res.redirect("/posts");
        })
        .catch((err) => {
            console.error('Error deleting post from db', err);
            return res.status(500).send('Error deleting post from db');
        });
}

const getOnePost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        console.error('Error getting post from db: No id provided');
        return res.status(500).send('Error getting post from db: No id provided');
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        console.log(id);
        console.log('Got post from db successfully');
        res.render(createPath("/new_page"), { title: "Post page" });
    } catch (error) {
        console.error('Error getting post from db', error);
        return res.status(500).send('Error getting post from db');
    }
}

export { getPosts, createGetPost, setPost, getMain, deletePost, getOnePost, getChange };
