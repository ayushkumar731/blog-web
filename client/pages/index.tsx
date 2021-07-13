import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getAllBlog } from '@/services/Blog';
import FirstCard from '@/components/BlogCard/FirstCard';
import Card from '@/components/BlogCard/Cards';
import storage from 'store';
import styles from '@/styles/localStyle/homepage';

const Home = (props: any) => {
  const { blogs, classes } = props;
  const [filterBlog, setFilterBlog] = useState([]);

  useEffect(() => {
    let data = blogs;
    const user = storage.get('adminUser');
    if (!user) {
      data = blogs.filter((obj: any) => obj.isPublic === true);
    }
    setFilterBlog(data);
  }, []);

  const blogsCard = (post: Object | any, i: number) => {
    if (i === 0) return <FirstCard post={post} key={post.slug} />;
    return <Card post={post} key={post.slug} />;
  };

  const allCards = (post: Object | any) => <Card post={post} key={post.slug} />;

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={7} className={classes.root}>
        {filterBlog.map((post: Object, i: number) => {
          if (i === 0) {
            return (blogsCard(post, i));
          }
          return (
            <Grid container>
              {allCards(post)}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const res = await getAllBlog();
  const { blogs } = res.data.response;
  return {
    props: { blogs },
    revalidate: 10,
  };
}

export default withStyles(styles)(Home);
