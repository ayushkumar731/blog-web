import { Document, ObjectId } from 'mongoose';

export default interface PostInterface extends Document {
  title: string;
  picture: string;
  details: any;
  isPublic: boolean;
  userId: ObjectId;
  find: any;
  slug: string;
}
