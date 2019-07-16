import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'styled';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'components/page/Home';
import Movie from 'components/page/Movie';
import List from 'components/page/List';

import 'antd/dist/antd.min.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list/:listName" component={List} />
          <Route path="/movie/:id" component={Movie} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
