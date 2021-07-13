import React from 'react';
import styles from '@/components/BlogCard/Cards/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import { withStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const SecondAndThirdCard = (props: any) => {
  const router = useRouter();
  const { push } = parseRouter(router);
  const {
    post: {
      title,
      shortDescription,
      createdAt,
      timeToReadInmin,
      slug,
      image,
    },
    classes,
  } = props;

  return (
    <Grid item xs={12} lg={6} className={classes.root}>
      <Grid
        item
        xs={12}
        className={classes.image}
        onClick={() => {
          push(`/blog/${slug}`);
        }}
      >
        <Image 
          src={image} 
          alt={title} 
          className={classes.img} 
          width={500}
          height={300}
        />
      </Grid>
      <Grid
        onClick={() => {
          push(`/blog/${slug}`);
        }}
      >
        <h2 className={classes.title}>{title}</h2>
      </Grid>
      <Grid container alignItems="center" className={classes.date}>
        <Typography>{new Date(`${createdAt}`).toDateString().slice(3)}</Typography>
        <Typography className={classes.timeInMin}>
          {' - '}
          {timeToReadInmin}
          {' '}
          mins
        </Typography>
      </Grid>
      <Grid className={classes.shortDescription}>{shortDescription}</Grid>
      <Grid container justify="space-between" alignItems="center" className={classes.buttonsContainer}>
        <Button
          className={classes.continueButton}
          onClick={() => {
            push(`/blog/${slug}`);
          }}
        >
          Read More
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SecondAndThirdCard);
