import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'styled';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'components/page/Home';

import 'antd/dist/antd.min.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorite" component={Home} />
          <Route path="/movie/:id" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
