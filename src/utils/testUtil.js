import React from "react";
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme} from 'styled';

function CustomRender({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: CustomRender, ...options });

export * from '@testing-library/react'

// override render method
export { customRender as render };
