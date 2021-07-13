import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();

router.post(
  '/register',
  (req: Request, res: Response | any, next: NextFunction) => {
    const params = Object.assign({}, req.body);
    userController.registerUser(params, res);
  }
);

router.post(
  '/login',
  (req: Request, res: Response | any, next: NextFunction) => {
    const params = Object.assign({}, req.body);
    userController.loginInUser(params, res);
  }
);

module.exports = router;
