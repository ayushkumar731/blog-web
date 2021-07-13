import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IState {
  hasError?: boolean;
}

interface IProps {
  classes: any;
  children: any;
}

class ErrorBoundary extends Component<IState & IProps> {
  // eslint-disable-next-line react/state-in-constructor
  state: IState;

  constructor(props: IProps | any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    if (error && error.toString().includes('ChunkLoadError')) {
      return { hasError: true };
    }
    return null;
  }

  render() {
    const { hasError } = this.state;
    const { children, classes } = this.props;

    if (hasError) {
      return (
        <Grid container alignContent="center" justify="center" className={classes.root} direction="column">
          <Grid item>
            <h5>Sorry about that!</h5>
          </Grid>
          <Grid item>
            <h6>
              We had an issue loading the page! Please check your internet or
              <Grid className={classes.container} onClick={() => window.location.reload()}>
                reload!
              </Grid>
            </h6>
          </Grid>
        </Grid>
      );
    }

    return <>{children}</>;
  }
}
export default withStyles(styles)(ErrorBoundary);
