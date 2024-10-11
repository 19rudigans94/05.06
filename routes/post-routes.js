import express from "express";
import createPath from "../helpers/createPath.js";
import { getPosts, createGetPost, setPost, getMain, deletePost, getOnePost, getChange } from "../controllers/post-controller.js";

const router = express.Router();

// Роуты//////////////////////////////////////////////////////////

router.get("/", (req, res) => getMain(req, res));
router.get("/create", (req, res) => createGetPost(req, res));
router.get("/posts", (req, res) => getPosts(req, res));
router.post("/create", (req, res) => setPost(req, res));
router.delete('/api/posts/:id', (req, res) => deletePost(req, res));
router.get('/api/post/:id', (req, res) => getOnePost(req, res) );
// router.get('/change_post', (req, res) => getChange(req, res));



// Routes
export default router