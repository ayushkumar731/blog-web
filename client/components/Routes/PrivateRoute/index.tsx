import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import storage from 'store';
import Route from '@/components/Routes/Route';
import parseRouter from '@/utils/parseRouter';
import PreLoader from '@/components/Preloader';

const PrivateRoute = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { router } = props;

  useEffect(() => {
    const { pathname, replace } = parseRouter(router);
    const isAdminPath = pathname.startsWith('/admin');
    const isAuthenticated = storage.get(isAdminPath ? 'adminUser' : 'user');
    const redirect = isAdminPath ? '/admin/signin' : '/sign-in';
    if (!isAuthenticated) {
      replace(`${redirect}?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const { render } = props;

  if (loading || (!loading && !isAuthenticated)) {
    return <PreLoader />;
  }

  if (isAuthenticated) {
    return <Route render={render} />;
  }

  return null;
};

export default withRouter(PrivateRoute);
