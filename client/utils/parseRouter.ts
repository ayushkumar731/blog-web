const parseRouter = (router: any) => {
  const { pathname } = router;
  const search = router.asPath;
  let query = `?${search.split('?')[1]}`;
  if (query === '?undefined') {
    query = '';
  }
  let hash = `#${search.split('#')[1]}`;
  if (hash === '#undefined') {
    hash = '';
  }
  let redirect = `/${query.split('F')[1]}`;
  if (redirect === '/undefined') {
    redirect = '';
  }
  const params = new URLSearchParams(query);
  const goBack = router.back;
  const { push, replace } = router;
  return {
    pathname,
    search,
    query,
    hash,
    params,
    goBack,
    push,
    redirect,
    replace,
  };
};

export default parseRouter;
