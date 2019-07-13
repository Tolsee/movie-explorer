import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'styled';
import { H1, Paragraph } from 'components/common/typo';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <H1>Movie Explorer</H1>
        <Paragraph>Welcome to movies app</Paragraph>
      </>
    </ThemeProvider>
  );
}

export default App;
