import React from 'react';
import { getBlogBySlug, getAllBlog } from '@/services/Blog';
import BlogDetails from '@/components/BlogDetails';
import PreLoader from '@/components/Preloader';
import { NextSeo } from 'next-seo';

interface Iprops {
   post: {
    title: string;
    image: string;
    createdAt: Date;
    timeToReadInmin: number;
    details: string;
    metaDescription: string;
    slug: string;
  };
}

const Blog = (props: Iprops) => {
  const { post } = props;

  const SEO = {
    title: `${post?.title}`,
    description: `${post?.metaDescription}`,
    openGraph: {
      url: `http://localhost:3000/blog/${post?.slug}`,
      title: `${post?.title} - makeownsoftware`,
      description: `${post?.metaDescription}`,
      images: [
        {
          url: `${post?.image}`,
          width: 800,
          height: 600,
          alt: 'image',
        },
        {
          url: `${post?.image}`,
          width: 900,
          height: 800,
          alt: 'image',
        },
        { url: `${post?.image}` },
      ],
    },
  };

  if (!post) return <PreLoader />;

  return (
    <>
      <NextSeo {...SEO} />
      <BlogDetails post={post} />
    </>
  );
};

export async function getStaticProps(context: any) {
  const { params } = context;
  const { slug } = params;

  const blog = await getBlogBySlug(slug);
  return {
    props: {
      post: blog.data.response.blog,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await getAllBlog();
  const { blogs } = res.data.response;

  const paths = blogs.map((blog: { slug: string }) => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: true };
}

export default Blog;
