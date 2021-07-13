import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import styles from '@/components/BlogCard/FirstCard/styles';
import Image from 'next/image';

const FirstCard = (props: any) => {
  const router = useRouter();
  const { push } = parseRouter(router);
  const { post, classes } = props;
  return (
    <Grid container className={classes.root} direction="column">
      <Grid
        className={classes.image}
        onClick={() => {
          push(`/blog/${post.slug}`);
        }}
      >
        <Image 
          src={post.image}
          alt={post.title}
          className={classes.img}
          width={1000}
          height={700}
        />
      </Grid>
      <Grid
        onClick={() => {
          push(`/blog/${post.slug}`);
        }}
      >
        <h2 className={classes.title}>{post.title}</h2>
      </Grid>
      <Grid container alignItems="center" className={classes.date}>
        <Typography>{new Date(`${post.createdAt}`).toDateString().slice(3)}</Typography>
        <Typography className={classes.timeInMin}>
          {' - '}
          {post.timeToReadInmin}
          {' '}
          mins
        </Typography>
      </Grid>
      <Grid className={classes.shortDescription}>{post.shortDescription}</Grid>
      <Grid container justify="space-between" alignItems="center" className={classes.buttonsContainer}>
        <Button
          className={classes.continueButton}
          onClick={() => {
            push(`/blog/${post.slug}`);
          }}
        >
          Continue Reading
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FirstCard);
