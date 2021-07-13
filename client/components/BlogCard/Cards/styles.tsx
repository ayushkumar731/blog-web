const styles = () => ({
  root: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: '2rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
    marginBottom: 10,
  },
  img: {
    width: '100%',
  },
  title: {
    marginBottom: 5,
    color: '#fa4b2a',
    fontWeight: 600,
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: 1.2,
    '&:hover': {
      color: '#000000',
    },
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
    margin: '1.5rem 0 0',
  },
  continueButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 128,
    backgroundColor: '#fa4b2a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff',
    },
  },
});

export default styles;
