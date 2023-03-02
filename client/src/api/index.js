// * api endpoints
// * (used in 'actions' functions)

import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

// We have to send our token back to the backend so that the backend middleware can varity that we're actually logged in. Middleware will not work without this.
// The following will happen for+before ea req below.
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('profile');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }

  // With interceptors, need to return actual req to make future reqs.
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// 검색어가 없으면
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
