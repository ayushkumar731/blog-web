import mongoose from 'mongoose';
import { SystemUserRole } from '../enum/SystemUserRole';
import UserInterface from '../interface/user';
import httpContext from 'express-http-context';
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
    status: {
      type: Boolean,
      default: true,
    },
    emailVerification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.isAdmin = () => {
  const self: any = this;
  return self.role === SystemUserRole.ADMIN;
};

UserSchema.statics.getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

UserSchema.pre<UserInterface>('save', function () {
  if (this.isNew) {
    this.role = SystemUserRole.USER;
  }
  this.$locals.headers = httpContext.get('headers');
});

const User = mongoose.model<UserInterface>('User', UserSchema);
module.exports = User;
