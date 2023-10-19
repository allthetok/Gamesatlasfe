import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#202020',
    },
    text: {
      primary: '#dddddd',
    },
  },
}

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
		  main: '#121212',
		},
		secondary: {
		  main: '#121212',
		},
		background: {
		  default: '#121212',
		},
		text: {
		  primary: '#dddddd',
		},
	  },
});
export { themeOptions, theme }