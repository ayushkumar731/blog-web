import { Request } from 'express';

const path = (url: any) => {
  if (!url) return undefined;
  const obj = new URL(url);
  return obj.pathname;
};

const buildContext = (req: Request) => {
  if (!Object.prototype.hasOwnProperty.call(req, 'headers')) return {};
  return {
    user_agent: req.headers['user-agent'],
    clientId: req.headers['client-id'],
    ip: req.headers['x-forwarded-for'],
    page: {
      url: req.headers['url-referer'],
      path: path(req.headers['url-referer']),
    },
  };
};

module.exports = buildContext;
