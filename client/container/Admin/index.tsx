import React from 'react';
import FormModal from '@/components/CreateNewBlogForm';
import Notifications from 'react-notify-toast';
import storage from 'store';
import Header from '@/components/Header/Admin/index';
import { logoutAdminUser } from '@/services/Admin';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';

const Admin = (props: any) => {
  const router = useRouter();
  const user = storage.get('adminUser');
  const { editData } = props;

  const logoutUser = () => {
    const data = logoutAdminUser();
    if (data === true) {
      const { push } = parseRouter(router);
      push('/');
    }
  };

  return (
    <>
      <Notifications />
      <Header user={user} logoutAdminUser={logoutUser} />
      <FormModal editData={editData} />
    </>
  );
};

export default Admin;
