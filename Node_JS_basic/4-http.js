const http = require('http');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

const port = 1245;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

module.exports = app;
