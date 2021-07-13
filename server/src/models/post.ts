import mongoose from 'mongoose';
import PostInterface from '../interface/post';
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const PostSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    details: {
      required: true,
      type: Schema.Types.Mixed,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    metaDescription: {
      required: true,
      type: String,
    },
    timeToReadInmin: {
      required: true,
      type: Number,
    },
    slug: {
      type: String,
      slug: ['title'],
      uniqueSlug: true,
      permanent: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<PostInterface>('Post', PostSchema);
module.exports = Post;
