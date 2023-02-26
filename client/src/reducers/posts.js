import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

/* '../actions'에선 type과 payload를 합쳐서 만든 하나의 'action'을 dispatch한다.
 * 인자 중 state는 (초기값은 []) redux store의 현재 상태이고(???)
 * action은 위에서 명시한 것이다.
 * 그리고 type에 따라서 기존(posts)과 주어진 payload를 잘 짬뽕해 여차저차 새로운 posts의 상태를 만든다.
 *
 * 서버/controllers에서 반환하는 데이터 구조가 바뀌었다. 이에 따라 여기서도
 * State의 구조를 바꿨기때문에(FETCH_ALL, FETCH_BY_SEARCH) 실제 그 state를 쓰는
 * 곳을 찾아 거기도 고쳐야함. `useSelector`로 검색하면 됨.
 * [결과] Posts.js에서. 이전엔 단순히 posts가 담긴 [] -> 이젠 posts가 일부인 { posts:[], ... }   | 이제 posts 외에도 필요한 정보가 많아서
 */

/* posts였다가 단순한 posts 배열보다 더 있기 때문에 state로 rename.
 * '../controller'에서 res에 posts 외에도 여러 다른 정보를 붙여주는데, 이름이 ambiguous
 */

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data }; // action.payload?
    case FETCH_POST:
      return { ...state, post: action.payload.post }; // action.payload?
    // state의 구조가 [] => { isLoading: , posts:[] } 로 바뀌었으니 모두 state를 spread 하고 이전 내용은 posts: 에 담도록 해야한다.
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

