import { NextFunction, Response } from 'express';
import { ObjectId } from 'mongoose';
const ApiError = require('../lib/ApiError');
const Post = require('../models/post');
const Image = require('../lib/Image');
const image = new Image();

class PostController {
  static instance: PostController;

  constructor() {
    if (!PostController.instance) {
      PostController.instance = this;
    }
    return PostController.instance;
  }

  createBlog = async (
    options: {
      title: string;
      details: any;
      userId: ObjectId;
      image: string;
      shortDescription: string;
      metaDescription: string;
      timeToReadInmin: number;
    },
    res: Response | any
  ) => {
    const { title, details, userId, image, shortDescription, metaDescription, timeToReadInmin } = options;
    try {
      const newBlog = await Post.create({
        title,
        details,
        image,
        userId,
        shortDescription,
        metaDescription,
        timeToReadInmin,
      });
      return res.apiSuccess({
        blog: newBlog,
      });
    } catch (err) {
      console.log('#create blog', err);
    }
  };

  getAllBlog = async (res: Response | any) => {
    const blogs = await Post.find({}).sort('-createdAt');
    return res.apiSuccess({
      blogs,
    });
  };

  getBlogBySlug = async (req: Request | any, res: Response | any) => {
    const blog = await Post.findOne({ slug: req.params.slug });
    return res.apiSuccess({
      blog,
    });
  };

  getBlogById = async (req: Request | any, res: Response | any, next: NextFunction) => {
    const blog = await Post.findById(req.params.id);
    if (blog) {
      return res.apiSuccess({
        blog,
      });
    } else {
      return next(new ApiError('Blog is not available', 404));
    }
  };

  updateBlog = async (blogId: ObjectId, data: object | any, res: Response | any, next: NextFunction) => {
    const doc = await Post.findById(blogId);
    if (doc) {
      try {
        doc.set(data);
        await doc.save();
        return res.apiSuccess({
          doc,
        });
      }catch (err: any | undefined) {
        console.log('#update blog', err);
        return next(new ApiError(err.message, 400));
      }
    } else {
      return next(new ApiError('Blog is not available', 404));
    }
  };

  deleteBlog = async (blogId: ObjectId, res: Response | any) => {
    const blog = await Post.findByIdAndDelete(blogId);
    if (!blog) {
      throw new ApiError('Blog is not available', 404);
    }
    if (blog.picture) {
      await image.delete(blog.picture.split('/').pop());
    }
    return res.apiSuccess({
      blogData: null,
    });
  };
}

export default PostController;
