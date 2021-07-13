const styles = (theme: any) => ({
  root: {
    margin: '40px auto',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 'auto',
  },
  image: {
    borderRadius: '8px 8px 0 0',
    width: '100%',
  },
  content: {
    padding: '0 2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 12px',
    },
  },
  title: {
    marginTop: '1.5rem',
    fontSize: '2.5rem',
    color: '#fa4b2a',
    fontWeight: 600,
  },
  date: {
    fontSize: '0.8rem',
    color: '#303030',
    fontWeight: 600,
    marginTop: 10,
  },
  timeInMin: {
    marginLeft: 8,
    color: '#000000',
    fontWeight: 600,
  },
  details: {
    marginTop: '2rem',
    marginBottom: '3rem',
  },
});

export default styles;
