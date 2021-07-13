const styles = (theme: any) => ({
  header: {
    zIndex: 1,
    height: 75,
    backgroundColor: '#fff',
    padding: '0 30px',
    boxShadow: '0px 1px 9px 1px #cfcfcf',
    borderTop: '2px solid #fa4b2a',
  },
  headerContainer: {
    maxWidth: 1080,
    margin: 'auto',
  },
  logo: {
    textDecoration: 'none',
    fontSize: 20,
    color: '#fa4b2a',
    fontWeight: 600,
    fontFamily: "'Lato', sans-serif",
  },
  mobileIcon: {
    width: 28,
    height: 28,
    fontSize: 28,
    color: '#000000',
    marginTop: 10,
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.down('901')]: {
      display: 'inline-block',
    },
  },
  button: {
    fontFamily: "'Lato', sans-serif",
    lineHeight: '48px',
    color: '#303030',
    padding: 0,
    height: 40,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 0,
    marginRight: 30,
    '&:hover': {
      color: '#fa4b2a',
      backgroundColor: '#fff',
    },
    [theme.breakpoints.down('901')]: {
      display: 'none',
    },
  },
  drawer: {
    width: '100vw',
    height: '100%',
    backgroundColor: '#000000',
    padding: '40px 15px',
  },
  closeIcon: {
    top: 15,
    right: 15,
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  menuItem: {
    padding: '8px 12px',
    margin: '8px 0',
    width: 'max-content',
  },
  menuItemText: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 1,
    color: '#BEBEBE',
    marginLeft: -4,
  },
});

export default styles;
