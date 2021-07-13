import { Request, Response, NextFunction } from 'express';
const ApiError = require('../lib/ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { SECRET_CODE } from '../config';

class Authentication {
  static instance: Authentication;
  constructor() {
    if (!Authentication.instance) {
      Authentication.instance = this;
    }

    return Authentication.instance;
  }

  generateHashedPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  verifyPassword(plainPassword: string, encryptedPassword: string) {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  }

  generateToken(options: any) {
    const params: any = { id: options.userId || '' };
    if (options.role) params.role = options.role;

    // create a token
    const authSecret = SECRET_CODE.AUTHENTICATION_SECRET;
    const expiresIn =
      options.expiresIn || 86400; /** Expires in 86400 = 24 hours */
    const accessToken = jwt.sign(params, authSecret, { expiresIn });

    return accessToken;
  }

  verifyUserAuthentication(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    const authSecret = SECRET_CODE.AUTHENTICATION_SECRET;
    const accessToken = req.headers['x-access-token'];

    if (!accessToken) {
      next(new ApiError('No access token provided.', 403));
    }

    jwt.verify(accessToken, authSecret, (err: Error, decoded: any) => {
      if (err) {
        next(
          new ApiError(err.message || 'Failed to process authentication token.')
        );
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }

  verifyAdminAuthentication(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    const authSecret = SECRET_CODE.AUTHENTICATION_SECRET;
    const accessToken = req.headers['x-access-token'] || req.query.token;

    if (!accessToken) {
      next(new ApiError('No access token provided.', 403));
    }

    jwt.verify(accessToken, authSecret, (err: Error, decoded: any) => {
      if (err) {
        next(
          new ApiError(err.message || 'Failed to process authentication token.')
        );
      } else if (decoded.role === 'ADMIN') {
        req.userId = decoded.id;
        next();
      } else {
        next(new ApiError('unauthorized'));
      }
    });
  }
}

module.exports = Authentication;
