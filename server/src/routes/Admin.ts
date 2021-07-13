import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
const AdminController = require('../controllers/AdminController');
const adminController = new AdminController();

router.post(
  '/login',
  (req: Request, res: Response | any, next: NextFunction) => {
    const params = Object.assign({}, req.body);
    adminController.adminLogIn(params, res, next);
  }
);

module.exports = router;
