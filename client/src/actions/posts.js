import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api/index.js';

/* Redux makes it easy to have one central source of truth.
 * 언제나 '로딩인가 아닌가' 알 수 있게 Redux를 쓸 것.
 */

// Payload (aka `data`) is what 'server/controller' attaches to res and returns!

// Get ONE post.
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id); // NOT post's'

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING }); // 로딩 시작
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    // 'data' now contains 3 different things

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING }); // 로딩 끝
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    // Try문 안에선 백엔드와 대화 시도.
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    // Destructure twice. Because (1) we're making an axios req (2) We put it in a new obj which has the data property
    // data : query에 맞는 posts 배열이 반환됨.

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // 아무데도 안가서 로딩 필요없음 (like, delete도 동일)
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
