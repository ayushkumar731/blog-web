class ApiError extends Error {
  code: number;
  constructor(message: any, code: number = 400) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

module.exports = ApiError;
