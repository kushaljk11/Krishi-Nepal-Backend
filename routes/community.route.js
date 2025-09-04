import express from 'express';
import {
  createPost,
  getAllPosts,
  addComment,
  likePost,
  unlikePost
} from '../controller/communitycontroller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const communityrouter = express.Router();

communityrouter.post('/create', verifyToken, createPost);
communityrouter.get('/getpost', verifyToken, getAllPosts);
communityrouter.post('/:postId/comment', verifyToken, addComment);
communityrouter.post('/:postId/like', verifyToken, likePost);
communityrouter.post('/:postId/unlike', verifyToken, unlikePost);

export default communityrouter;
