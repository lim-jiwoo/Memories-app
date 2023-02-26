import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    // 이제 page라는 param을 받아 해당 page만 반납해야함
    const {page} = req.query;
    try {
        const LIMIT = 8; // 페이지에 담을 수 있는 포스트 개수 
        const startIndex = (Number(page) - 1) * LIMIT // 모든 페이지의 시작 index를 가져옴. (ex 셋째쪽첫번째는 8*3-1 = 23 (0 시작))
        // page가 프론트에선 숫자였어도 req.query를 지나며 문자열이 된다.
        const total = await PostMessage.countDocuments({}); // 마지막 페이지 넘버를 알 수 있도록.

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); 
        // _id: -1 => Newest post first 
        // .limit  => Only give LIMIT number of posts per pg 
        // .skip   => Skip to startIndex without posting prev posts
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// QUERY  -> /posts?page=1               -> page = 1   (populate page var)
// PARAMS -> /posts/:id (ex. /posts/123) -> id = 123   (populate id var)
// 둘다 괜찮다. 보통 query는 서칭 query 시, param은 특정 뭔가를 가져올 때 쓴다. 

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query; // Get these from query
    try {
        const title = new RegExp(searchQuery, 'i'); // i flag = ignore case. Convert to regex because it's easier for mongo and mongoose to search db

        const posts = await PostMessage.find({ $or: [{ title }, {tags: { $in: tags.split(',') }}] }); 
        // Find me all the posts that matches either 'or'($or) (title or tags) 
        // 1. Does title match the title we typed in frontend.
        // 2. Is there any tag 'in'($in) the array of tags equal to our tags
        // Then, display the post.

        res.json({ data: posts }); // 다시 프론트로 보냄
    } catch {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' }); // If user is authenticated

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex(id => id === String(req.userId)); // Check if user has already liked the post. Ea like will be an id from a specific person in an array (ex. likes: ["612c7b4c7d7d5010a0e95872"] in browser Network Preview). Return -1 only if the id is not in the `like` array in postMessage model.

    if(index === -1) {
        // like
        post.likes.push(req.userId);
    } else {
        // undo like
        post.likes = post.likes.filter(id => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}


export default router;