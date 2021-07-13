import React from 'react';
import styles from '@/components/Footer/styles';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const Footer = (props: any) => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Typography className={classes.text}>&#169; 2021 All Right Reserverd</Typography>
    </Grid>
  );
};

export default withStyles(styles)(Footer);
