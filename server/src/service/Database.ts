import AppConfig from '../config';
import mongoose from 'mongoose';

class Database {
  static instance: any;
  mongoUri!: string;
  constructor(options: Object) {
    if (!Database.instance) {
      this.mongoUri = this._generateMongoUri(options);
      Database.instance = this;
    }
    return Database.instance;
  }

  connect = () => {
    const mongoUri = this.mongoUri;
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log('Database is connect successfully');
    });
    return this;
  };

  _generateMongoUri = (options: {
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    defaultDatabase?: string;
  }) => {
    const mongoHost = options.host || '127.0.0.1';
    const mongoPort = options.port || '27017';
    const mongoUser = options.username || null;
    const mongoPassWord = options.password || null;
    const defaultDatabase = options.defaultDatabase || null;

    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    ) {
      return `mongodb+srv://${mongoUser}:${mongoPassWord}@${mongoHost}/${defaultDatabase}?retryWrites=true&w=majority`;
    } else {
      return `mongodb://${mongoHost}:${mongoPort}/${defaultDatabase}?retryWrites=true&w=majority`;
    }
  };
}

module.exports = Database;
