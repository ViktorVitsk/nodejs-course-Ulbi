const Router = require('../framework/Router');

const router = new Router();

const users = [
  {
    id: 1,
    name: 'Vitsk',
  },
  {
    id: 2,
    name: 'Vasya',
  },
  {
    id: 3,
    name: 'Maxim',
  },
];

router.get('/users', (req, res) => {
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify(users));
});

router.post('/users', (req, res) => {
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify(users));
});

module.exports = router;
