import { Response } from 'express';
const User = require('../models/user');
const ApiError = require('../lib/ApiError');
const AuthService = require('../service/Authentication');
const authService = new AuthService();

class UserController {
  static instance: any;
  name: string | undefined;
  constructor() {
    if (!UserController.instance) {
      UserController.instance = this;
    }
    return UserController.instance;
  }

  registerUser = async (
    options: {
      name: string;
      email: string;
      password: string;
      headers: any;
    },
    res: Response | any
  ) => {
    const { name, email, password } = options;
    const hashingPassword = await authService.generateHashedPassword(password);
    let newUser;
    try {
      const isExistingUser = await User.getUserByEmail(email);
      if (isExistingUser) {
        throw new ApiError('email exists');
      } else {
        newUser = await User.create({
          name,
          email,
          password: hashingPassword,
        });
        newUser.password = undefined;
        const authToken = authService.generateToken({
          userId: newUser.id,
        });
        return res.apiSuccess({
          auth_token: authToken,
          user: newUser,
        });
      }
    } catch (err) {
      console.log('#registerUser', err);
    }
  };

  loginInUser = async (
    options: { email: string; password: string },
    res: Response | any
  ) => {
    const { email, password } = options;

    const user = await User.getUserByEmail(email);
    if (!user) {
      throw new ApiError('The email or password is incorrect', 404);
    }
    if (!authService.verifyPassword(password, user.password)) {
      throw new ApiError('The email or password is incorrect', 404);
    }
    if (user.status === false) {
      throw new ApiError(
        'Your profile is deactivated Email admin@makeownsoftware.com to reactivate it.',
        404
      );
    }

    const authToken = authService.generateToken({
      userId: user.id,
    });
    user.password = undefined;
    return res.apiSuccess({
      auth_token: authToken,
      user: user,
    });
  };
}

module.exports = UserController;
