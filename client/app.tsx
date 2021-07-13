import React from 'react';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import Header from '@/components/Header/MainHeader';
import Footer from '@/components/Footer/';

const App = (props: any) => {
  const router = useRouter();
  const { pathname } = parseRouter(router);
  const { children }: any = props;
  const isNoHeaderRoutes = pathname.includes('/admin');
  const showHeader = !isNoHeaderRoutes;
  return (
    <>
      {showHeader && (<Header />)}
      {children}
      <Footer />
    </>
  );
};

export default App;
