import axios from '@/utils/axios';
import URL from '@/config/url';
import { notify } from 'react-notify-toast';

const sendContactDetails = async (data: any) => {
  const response = await axios.post(URL.contact.SEND_CONTACT_DETAILS, data);
  if (response.data.success === true) {
    notify.show('Send Successfully', 'success', 3000);
    return {
      status: true,
    };
  }
  notify.show(response.data.error.message, 'error', 3000);
  return {
    status: false,
    data: response.data.error.message,
  };
};

export default sendContactDetails;
