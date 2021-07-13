import axios from '@/utils/axios';
import Cookies from 'universal-cookie';
import storage from 'store';
import URL from '@/config/url';
const cookie = new Cookies();

export const requestAdminUserLogin = async (data: any) => {
  const response = await axios.post(URL.admin.ADMIN_LOGIN_USER, data);
  if (response.data.success === true) {
    cookie.set('x-access-token', response.data.response.auth_token);
    storage.set('adminUser', response.data.response.user);
    return {
      status: true,
      data: response.data.response.user,
    };
  }

  return {
    status: false,
    data: response.data.error.message,
  };
};

export const logoutAdminUser = () => {
  storage.remove('adminUser');
  cookie.remove('x-access-token');
  return true;
};
