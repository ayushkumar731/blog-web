import { Router, Request, Response, NextFunction } from 'express';
import PostController from '../controllers/PostController';
const router = Router();
const Image = require('../lib/Image');
const image = new Image();
const AuthService = require('../service/Authentication');
const authService = new AuthService();
const postController = new PostController();

router.post(
  '/create-blog',
  authService.verifyAdminAuthentication,
  async (req: Request | any, res: Response | any, next: NextFunction) => {
    const options = Object.assign({}, req.body, { userId: req.userId });
    postController.createBlog(options, res);
  }
);

router.get('/all', (req: Request, res: Response) => {
  postController.getAllBlog(res);
});

router.get('/:slug', (req: Request, res: Response) => {
  postController.getBlogBySlug(req, res);
});

router.get('/id/:id', (req: Request, res: Response, next: NextFunction) => {
  postController.getBlogById(req, res, next);
});

router.post(
  '/image',
  authService.verifyAdminAuthentication,
  (req: Request, res: Response | any, next: NextFunction) => {
    image
      .upload(req.body.image)
      .then((fileData: any) => {
        res.apiSuccess(fileData);
      })
      .catch(next);
  }
);

router.patch('/:id', authService.verifyAdminAuthentication, (req: Request | any, res: Response, next: NextFunction) => {
  const data = Object.assign({}, req.body);
  postController.updateBlog(req.params.id, data, res, next);
});

router.delete('/:id', authService.verifyAdminAuthentication, (req: Request | any, res: Response) => {
  postController.deleteBlog(req.params.id, res);
});
module.exports = router;
