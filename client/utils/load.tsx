import dynamic from 'next/dynamic';

import Preloader from '@/components/Preloader';

const loadable = (importFunc: any, opts: any) => {
  const { fallback = null, ssr } = opts;
  return dynamic(importFunc, { loading: fallback || Preloader, ssr });
};

export default loadable;
