import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import { getBlogById } from '@/services/Blog';
import PreLoader from '@/components/Preloader';
import { PrivateRoute } from '@/components/Routes';
import Admin from '@/container/Admin';

const EditBlog = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const { query, push } = parseRouter(router);
    const blogId = query.slice(4);
    async function getblog() {
      const post = await getBlogById(blogId);
      if (post.data.success === false) {
        push('/');
      } else {
        setPost(post.data.response.blog);
      }
    }
    getblog();
  }, [!post]);

  if (!post) return <PreLoader />;

  return (
    <PrivateRoute render={(props: any) => <Admin editData={post} {...props} />} />
  );
};

export default EditBlog;
