const styles = (theme: any) => ({
  root: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
    div: {
      width: '100%',
    },
  },
  img: {
    width: '100%',
  },
  title: {
    margin: '5px 0 10px 0',
    color: '#fa4b2a',
    fontWeight: 600,
    fontSize: '1.5rem',
    cursor: 'pointer',
    width: 'max-content',
    '&:hover': {
      color: '#000000',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  date: {
    fontSize: '0.8rem',
    color: '#303030',
    fontWeight: 600,
  },
  timeInMin: {
    marginLeft: 8,
    color: '#000000',
    fontWeight: 600,
  },
  shortDescription: {
    marginTop: '1rem',
    color: '#777',
    fontSize: '0.8rem',
    lineHeight: '1.8em',
    fontWeight: 600,
  },
  buttonsContainer: {
    width: '100%',
    margin: '1.5rem 0',
  },
  continueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 228,
    backgroundColor: '#fa4b2a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff',
    },
  },
});

export default styles;
