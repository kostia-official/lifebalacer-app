import { createMuiTheme, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MainColors } from './common/colors';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

export const ThemeProvider: React.FC = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: MainColors.Primary
      },
      secondary: {
        main: MainColors.Secondary
      }
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
