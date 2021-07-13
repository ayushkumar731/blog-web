import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '@/components/BlogDetails/styles';
import ReactHtmlParser from 'react-html-parser';
import Image from 'next/image';

interface Iprops {
  post: {
    title: string;
    image: string;
    createdAt: Date;
    timeToReadInmin: number;
    details: string;
  };
  classes: any;
}

const BlogDetails = (props: Iprops) => {
  const {
    post: {
      title,
      image,
      createdAt,
      timeToReadInmin,
      details,
    },
    classes,
  } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={7} className={classes.container}>
        <Grid>
          <Image 
            src={image} 
            alt={title} 
            className={classes.image}
            width={1000}
            height={700} 
          />
        </Grid>
        <Grid className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          <Grid container alignItems="center" className={classes.date}>
            <Typography>{new Date(`${createdAt}`).toDateString().slice(3)}</Typography>
            <Typography className={classes.timeInMin}>
              {' - '}
              {timeToReadInmin}
              {' '}
              mins
            </Typography>
          </Grid>
          <Grid className={classes.details}>
            {ReactHtmlParser(details)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BlogDetails);
