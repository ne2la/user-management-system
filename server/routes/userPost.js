import express  from "express";
import { getPosts, createPost,updatePost,deletePost } from "../controllers/userPost.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/',getPosts);
router.post('/createPost',auth,createPost);
router.patch('/updatePost/:id',auth,updatePost);
router.delete('/deletePost/:id',auth,deletePost);

export default router;
