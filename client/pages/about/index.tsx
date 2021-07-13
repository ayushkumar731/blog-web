import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import styles from '@/styles/localStyle/about';

const About = (props: any) => {
  const { classes } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9} className={classes.container}>
        <Typography className={classes.heading}>About</Typography>
        <Typography className={classes.details}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(About);
