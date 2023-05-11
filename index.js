const { json } = require('express');
const EventEmitter = require('events');
const http = require('http');

const emitter = new EventEmitter();

const PORT = process.env.PORT || 5000;

class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = 'GET', path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    // /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`[${method}] по адресу ${path} уже существует`);
    }

    endpoint[method] = handler;

    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }
}

const server = http.createServer((req, res) => {
  res.end(req.url);
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
