import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      /* Save in local storage as 'profile' so even when we refresh, we still know user is logged in.
                JS에서 값을 저장하는 경우 변수를 사용한다. 영구적으로 저장하는 경우 DB, 임시 저장하는 경우 쿠키를 사용하기도 한다.
                이처럼 일정 시간/영구적으로 값을 저장하는 것으로, 사용자 로컬에 보존하는 방식인 WebStorage API Local Storage가 있다.
                Use in 'navbar'. */
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear(); // Completely clean local storage
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
