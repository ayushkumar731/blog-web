import { Document } from 'mongoose';

export default interface UserInterface extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  status: boolean;
  emailVerification: boolean;
}
