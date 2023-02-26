import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'; // useLocation: which pg we're currently on
import ChipInput from 'material-ui-chip-input'; // For tags. 검색어를 Sphere-like shape로.

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

/* 다른 함수처럼 use~ 형식으로 쓰기 위함이다. URL의 */
// for Url search param. Page Info를 query에서 얻는다.
function useQuery() { // 그냥 원래처럼 const q = useq() 형식으로 쓰기 위한 훅.
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;// URL을 읽어 page param이 있다면 이 var를 채운다. 없다면 첫 페이지.
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState(''); // 검색어. 리엑트에선 field(검색어 등)는 state로 관리해야한다.
  const [tags, setTags] = useState([]); // 여러 태그를 사용하니 string이 아닌 배열.
  const history = useHistory();

  /* 더이상 Home에서 post fetch하지 않고 <Pagination/>에 바로 prop으로 'page' 념겨줄 것.
  useEffect(() => {
      dispatch(getPosts());
  }, [currentId, dispatch]); */

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch search post
      // DB에게 query에 맞는 포스트만 반환하라고 명령해야함! Redux 사용 -> Dispatch(action)
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

      // 이제 데이터가 반환됐으니, 반환된 데이터에 맞게 페이지(+URL)를 변경해보자.

      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      // 문자열로 render 필요. URL param으로 배열을 보낼 수 없다.
      // Client-side routing이 필요한 이유(어차피 백엔드가 쓸건데?): 친구에게 특정 페이지 주소를 공유할 수 있다.
    } else {
      history.push('/'); // 검색어 없음. 원위치로 redirect.
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) { // 엔터 누르면 검색
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>{/* Take half space in small devices. Take 3/4 in medium devices */}
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput // Tag로 검색하기
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* 언제나 paginate하지 않게. 특히 유저가 검색할 땐 결과가 많지 않을 테니 paginate하지 않을 것. */}
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}> {/* elevation = shadow */}
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
