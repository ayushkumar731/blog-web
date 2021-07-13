import { Response } from 'express';

const Contact = require('../models/contact');

class ContactController {
  static instance: ContactController;
  constructor() {
    if (!ContactController.instance) {
      ContactController.instance = this;
    }
    return ContactController.instance;
  }

  createContact = async (
    options: { name: string; email: string; message: string },
    res: Response | any,
  ) => {
    const { name, email, message} = options;
    try {
      const newContact = await Contact.create({
        name,
        email,
        message,
      });
      return res.apiSuccess({
        data: newContact,
      });
    } catch (err) {
      console.log('Create Contact', err);
    }
  };
}

module.exports = ContactController;