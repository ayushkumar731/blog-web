import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
const ContactController = require('../controllers/ContactController');
const contactController = new ContactController();

router.post(
  '/create',
  (req: Request, res: Response | any) => {
    const params = Object.assign({}, req.body);
    contactController.createContact(params, res);
  }
);

module.exports = router;
