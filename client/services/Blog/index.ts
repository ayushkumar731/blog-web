import axios from '@/utils/axios';
import URL from '@/config/url';
import { notify } from 'react-notify-toast';

export const creatBlog = async (data: any) => {
  const response = await axios.post(URL.blog.CREATE_NEW_BLOG, data);
  if (response.data.success === true) {
    notify.show('Blog Created Successfully', 'success', 3000);
    return {
      status: true,
      data: response.data,
    };
  }

  notify.show(response.data.error.message, 'error', 3000);

  return {
    status: false,
    data: response.data.error.message,
  };
};

export const updateBlog = async (data: any, id: String) => {
  const response = await axios.patch(`${URL.blog.UPDATE_BLOG_BY_ID}/${id}`, data);
  if (response.data.success === true) {
    notify.show('Blog Updated Successfully', 'success', 3000);
    return {
      status: true,
      data: response.data,
    };
  }

  notify.show(response.data.error.message, 'error', 3000);

  return {
    status: false,
    data: response.data.error.message,
  };
};

export const getAllBlog = async () => {
  const response = await axios.get(URL.blog.GET_ALL_BLOGS);
  return response;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await axios.get(`${URL.blog.GET_BLOG_BY_SLUG}/${slug}`);
  return response;
};

export const getBlogById = async (id: string) => {
  const response = await axios.get(`${URL.blog.GET_BLOG_BY_ID}/${id}`);
  return response;
};

export const ImageUpload = async (data: any) => {
  const payload = {
    image: data,
  };
  const response = await axios.post(URL.blog.IMAGE_UPLOAD, payload);
  if (response.data.success === true) {
    return {
      success: true,
      data: response.data,
    };
  }

  return {
    status: false,
    data: response.data.error.message,
  };
};
