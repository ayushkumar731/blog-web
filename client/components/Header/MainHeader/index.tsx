import React, { useState } from 'react';
import Head from 'next/head';
import Link from '@/components/Link';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import {
  Grid,
  Button,
  Drawer,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@/components/Header/MainHeader/styles';

const MainHeader = (props: any) => {
  const router = useRouter();
  const { push } = parseRouter(router);
  const { classes } = props;
  const [side, setSide] = useState(false);

  const toggleDrawer = (open: any) => {
    setSide(open);
  };

  const handlClick = (e: any, path: string) => {
    push(path);
    toggleDrawer(false);
  };

  return (
    <>
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
        />
      </Head>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={classes.header}
      >
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.headerContainer}
        >
          <Grid item>
            <Link
              to="/"
              className={classes.logo}
            >
              XYZ
            </Link>
          </Grid>
          <Grid container alignItems="center" style={{ width: 'max-content' }}>
            <Button
              className={classes.button}
              onClick={(e) => handlClick(e, '/')}
            >
              Home
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handlClick(e, '/about')}
            >
              About
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handlClick(e, '/contact')}
            >
              Contact
            </Button>
            <Grid onClick={() => toggleDrawer(true)}>
              <DehazeIcon className={classes.mobileIcon} />
            </Grid>
          </Grid>
        </Grid>
        <Drawer anchor="right" open={side} onClose={() => toggleDrawer(false)}>
          <div tabIndex={0} role="button" className={classes.drawer}>
            <Grid
              container
              justify="flex-end"
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon className={classes.closeIcon} />
            </Grid>
            <MenuItem
              className={classes.menuItem}
              onClick={(e) => handlClick(e, '/')}
            >
              <ListItemText
                classes={{ primary: classes.menuItemText }}
                primary="Home"
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={(e) => handlClick(e, '/about')}
            >
              <ListItemText
                classes={{ primary: classes.menuItemText }}
                primary="About"
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={(e) => handlClick(e, '/contact')}
            >
              <ListItemText
                classes={{ primary: classes.menuItemText }}
                primary="Contact"
              />
            </MenuItem>
          </div>
        </Drawer>
      </Grid>
    </>
  );
};

export default withStyles(styles)(MainHeader);
