import express, { Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');
import AppConfig, { MONGO_DB } from './config/index';
import httpContext from 'express-http-context';
const ApiError = require('./lib/ApiError');
const Database = require('./service/Database');
const buildContext = require('./analytics/helper/buildContext');
const UserController = require('./controllers/UserController');
const AuthService = require('./service/Authentication');

class App {
  app;
  server: any;
  ready: boolean = false;
  static instance: any;
  constructor() {
    if (!App.instance) {
      App.instance = this;
      this.app = express();
      this.server;
      this.ready = false;

      const dataBase = new Database({
        host: MONGO_DB.HOST,
        port: MONGO_DB.PORT,
        username: MONGO_DB.USER,
        password: MONGO_DB.PASS,
        authSource: MONGO_DB.AUTH_SRC,
        defaultDatabase: MONGO_DB.DEFAULT_DATABASE,
      }).connect();

      this.init();
    }
    return App.instance;
  }

  init = () => {
    const appExpress = this.app;
    appExpress!.disable('etad');

    new ApiError();

    /** Enable CORS */
    appExpress!.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Cache-Control, x-access-token, client-id, url-referer, x-google-token, Accept'
      );
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      next();
    });

    appExpress!.use(this._apiResponse);

    this._configureMiddleware();
    this._loadServices();
    this._loadControllers();
    this._defineRoutes();

    this.start({
      port: AppConfig.BIND_PORT,
    });

    return this;
  };

  _configureMiddleware = () => {
    console.log('Loading middleware...');
    const appExpress = this.app;
    appExpress!.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
    appExpress!.use(bodyParser.json({ limit: '1000mb', extended: true }));
    appExpress!.use(httpContext.middleware);
    appExpress!.use((req: Request, res: Response, next: NextFunction) => {
      httpContext.set('headers', buildContext(req));
      next();
    });
  };

  _apiResponse(req: Request, res: Response | any, next: NextFunction) {
    const threadStart = Date.now();
    const executeTime = () => {
      let threadEnd = Date.now();
      return ((threadEnd - threadStart) / 1000).toFixed(3);
    };
    interface createResponseFunc {
      (a: boolean): Object;
    }
    let createResponse: createResponseFunc;
    createResponse = (isSuccess: boolean) => {
      return {
        success: isSuccess,
        executeTime: executeTime(),
      };
    };
    res.createResponse = createResponse;

    res.apiSuccess = (data: Object, statusCode: number) => {
      const responseStatus = statusCode || 200;
      const responseData: any = createResponse(true);
      responseData.response = data;
      res.status(responseStatus).json(responseData);
    };

    next();
  }

  _loadServices = () => {
    console.log('Loading services...');
    new AuthService();
  };

  _loadControllers = () => {
    console.log('Loading controllers...');
    new UserController();
  };

  _notFoundHandler() {
    const appExpress = this.app;

    appExpress!.use((req, res, next) => {
      let error = new ApiError('Unable to find your api call method.', 404);
      next(error);
    });
  }

  _errorHandler() {
    const appExpress = this.app;

    appExpress!.use((err: any, req: Request, res: Response | any, next: NextFunction) => {
      let responseData = res.createResponse(false),
        errorCode = err.code || 500,
        errorMessage = err.message || 'Service internal issue.';
      responseData.error = {
        code: errorCode,
        message: errorMessage,
      };

      if (errorCode == 500) {
        responseData.error.stack = err.stack.split('\n')[1].trim();
      }
      res.status(errorCode).json(responseData);
    });
  }

  _defineRoutes() {
    console.log('Defining application routes.');

    const appExpress = this.app;
    const applicationRouteList = require('./routes/index');

    appExpress!.get('/', (req: Request, res: Response | any) => {
      res.apiSuccess({
        message: `${AppConfig.NAME} v${AppConfig.VERSION}`,
      });
    });

    applicationRouteList.forEach((route: { path: string; handler: any }) => {
      appExpress!.use(route.path, route.handler);
    });
    this._notFoundHandler();
    this._errorHandler();
  }

  start = (options: { port?: any }) => {
    options = options || {};
    const appExpress = this.app;
    const bindPort = options.port || new Error('Sever listing port need to be defined');

    this.server = appExpress!.listen(bindPort, () => {
      console.log(`Server started, listing on => ${bindPort}`);
    });
    return this;
  };
}

module.exports = App;
