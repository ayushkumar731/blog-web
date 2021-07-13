const styles = (theme: any) => ({
  root: {
    width: '100%',
  },
  container: {
    height: 'auto',
    width: 1000,
    margin: 'auto',
    boxShadow: '0px 2px 11px rgb(0 0 0 / 15%)',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
  },
  imageUrl: {
    marginBottom: 20,
    width: '90%',
  },
  imageIcon: {
    fontSize: '2.5rem',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none',
  },
  subHeading: {
    fontWeight: 500,
    marginBottom: 10,
    fontSize: '1.2rem',
  },
  button: {
    height: 40,
    width: 330,
    borderRadius: 0,
    color: '#ffffff',
    backgroundColor: '#4D6DB5',
    margin: '30px auto',
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: '#3155A6',
    },
  },
  buttonDisabled: {
    backgroundColor: 'rgba(77, 109, 181, 0.5)',
  },
});

export default styles;
