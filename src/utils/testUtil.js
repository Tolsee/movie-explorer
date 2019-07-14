import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme} from 'styled';

function CustomRender({ children }) {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: CustomRender, ...options });

export * from '@testing-library/react'

// override render method
export { customRender as render };
