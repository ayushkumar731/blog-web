/* eslint-disable max-len */
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  images: {
    domains: [`${process.env.NODE_ENV === 'production' ? 'prod-blog-image' : 'dev-blog-post'}.s3.ap-south-1.amazonaws.com`],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap_index.xml',
        permanent: true,
      },
    ];
  },
};
