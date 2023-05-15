const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouterMask(path, method), (req, res) => {
          const handler = endpoint[method];
          this.middlewares.forEach((middleware) => middleware(req, res));
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', (chunk) => {
        if (body) {
          req.body = JSON.parse(body);
        }

        const emitted = this.emitter.emit(
          this._getRouterMask(req.url, req.method),
          req,
          res
        );
        if (!emitted) {
          res.end();
        }
      });
    });
  }

  _getRouterMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
