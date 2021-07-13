const ApplicationRouteList = [
  {
    path: '/user',
    handler: require('../routes/User'),
  },
  {
    path: '/admin',
    handler: require('../routes/Admin'),
  },
  {
    path: '/blog',
    handler: require('../routes/Post'),
  },
  {
    path: '/contact',
    handler: require('../routes/Contact'),
  },
];

module.exports = ApplicationRouteList;
