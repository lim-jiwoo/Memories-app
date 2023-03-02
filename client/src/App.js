import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  // If user is already logged in, prevent from going to login page.
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
        <Container maxWidth="xl">{/* extra-large */}
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />{/* Immediately redirect */}
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
