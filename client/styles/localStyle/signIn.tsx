const styles = (theme: any) => ({
  root: {
    height: '100vh',
    paddingTop: 80,
    backgroundImage: 'linear-gradient(138deg, #0e2a2d, #09242e)',
  },
  container: {
    width: 437,
    margin: 'auto',
    backgroundColor: 'white',
    padding: '46px 40px 55px 40px',
    borderRadius: 6,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: 20,
    },
  },
  title: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 40,
  },
  fieldMargin: {
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  textInput: {
    '& input': {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: 10,
      },
    },
  },
  button: {
    fontSize: 13,
    fontWeight: 600,
    paddingTop: 15,
    paddingBottom: 15,
    letterSpacing: 1.3,
  },
  modal: {
    padding: 15,
    width: 320,
  },
  progress: {
    marginLeft: theme.spacing(1),
  },
});

export default styles;
