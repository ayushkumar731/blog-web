import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '@/components/Header/Admin/styles';
import { Typography, Grid } from '@material-ui/core';

interface Iprops {
  classes: any;
  user: {
    name: string;
  };
  logoutAdminUser: Function;
}

const AdminHeader = (props: Iprops) => {
  const { classes, user, logoutAdminUser } = props;

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      className={classes.root}
    >
      <Typography className={classes.userName}>{user.name}</Typography>
      <Grid onClick={() => logoutAdminUser()} className={classes.logoutButton}>
        Logout
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AdminHeader);
