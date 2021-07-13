import { NextFunction, Response } from 'express';
import { SystemUserRole } from '../enum/SystemUserRole';
const User = require('../models/user');
const ApiError = require('../lib/ApiError');
const AuthService = require('../service/Authentication');
const authService = new AuthService();

class AdminController {
  static instance: AdminController;
  constructor() {
    if (!AdminController.instance) {
      AdminController.instance = this;
    }
    return AdminController.instance;
  }

  adminLogIn = async (
    options: { email: string; password: string },
    res: Response | any,
    next: NextFunction
  ) => {
    const { email, password } = options;
    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        return next(new ApiError('The email or password is incorrect', 404));
      }

      if (user.role !== SystemUserRole.ADMIN) {
        return next(new ApiError('Unauthorized User', 404));
      }

      if (!authService.verifyPassword(password, user.password)) {
        return next(new ApiError('The email or password is incorrect', 404));
      }

      const authToken = authService.generateToken({
        userId: user.id,
        role: SystemUserRole.ADMIN,
      });

      user.password = undefined;
      return res.apiSuccess({
        auth_token: authToken,
        user: user,
      });
    } catch (err) {
      console.log('Admin Login', err);
    }
  };
}

module.exports = AdminController;
