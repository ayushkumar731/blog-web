const styles = () => ({
  root: {
    maxWidth: '1200px',
    padding: '150px 40px 60px',
    margin: 'auto',
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
  },
  border: {
    backgroundColor: '#141488',
    width: 82,
    height: 5,
    transition: 'width 1s ease-in-out',
    '&:hover': {
      width: 120,
    },
  },
  mainContent: {
    marginTop: 20,
    display: 'flex',
  },
  ownerDetails: {
    marginBottom: 20,
  },
  subHeading: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 600,
  },
  texts: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 22,
  },
  formContainer: {
    padding: 18,
    boxShadow: '0px 1px 9px 1px #cfcfcf',
    borderRadius: 5,
  },
  formHeading: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 10,
  },
  fieldMargin: {
    marginBottom: 20,
  },
  button: {
    height: 54,
    marginBottom: 10,
  },
});

export default styles;
