import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      gray: '#8c9099',
      white: '#ffffff',
      darkBlue: '#053c77',
      lightBlue: '#f3f9ff',
      darkgreen: '#01874b',
      error: '#d32f2f',
      navBarBg: '#000000',
      subNavBarBg: '#232323',
      navBarMenuActive: '#183679',
      navBarMenuHover: '#4D6DB5',
      btnPrimary: '#4D6DB5',
      btnPrimaryHover: '#3155A6',
      btnPrimaryDisabled: '#A6B6DA',
    },
    primary: {
      main: '#1976d1',
    },
    text: {
      primary: '#313131',
      secondary: '#949a9c',
    },
    background: {
      default: '#f5f6f6',
      tab: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Avenir Next", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: 20,
        color: '#6b6f78',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '2px solid #dfe4e6',
        },
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '0px !important',
      },
      underline: {
        '&:before': {
          borderBottom: 'none',
        },
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        fontWeight: 600,
        paddingBottom: 10,
      },
    },
    MuiDivider: {
      root: {
        height: '2px',
        backgroundColor: '#ebebeb',
      },
    },
  },
});

export default theme;
