const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
  baseUrl: 'http://localhost:3000',
  ignoredPaths: ['admin'],
  pagesDirectory: path.resolve(__dirname, '../.next/server/pages'),
  targetDirectory: 'public/',
  sitemapFilename: 'sitemap_index.xml',
  nextConfigPath: path.resolve(__dirname, '../next.config.js'),
});
