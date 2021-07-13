import mongoose from 'mongoose';
import ContactInterface from '../interface/contact';
const Schema = mongoose.Schema;
const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<ContactInterface>('Contact', ContactSchema);
module.exports = Contact;
