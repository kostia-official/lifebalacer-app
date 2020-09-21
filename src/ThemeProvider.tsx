import { createMuiTheme, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const ThemeProvider: React.FC = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: teal,
      secondary: teal
    }
  });

  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </StyledThemeProvider>
    </MaterialThemeProvider>
  );
};
