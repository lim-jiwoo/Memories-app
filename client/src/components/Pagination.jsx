/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
// useDispatch : dispatch things. useSelector : select things from our state

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts); // "(state.posts) That is the reducer that'll have access to #pgs."
  const dispatch = useDispatch(); // Use it as a function

  const classes = useStyles();

  useEffect(() => {
    // Fetch post whenver 'page' changes
    if (page) {
      dispatch(getPosts(page));// page가 있으면 dispatch
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (// Q. item이 현재 아이템 자기자신인가..?? (위 정보들)
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        // component={This Paginationitem is a Link component} to={Pointing to ...}
      )}
    />
  );
};

export default Paginate;
