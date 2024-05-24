const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }

  if (req.url === '/students') {
    countStudents(process.argv[2])
      .then((studentsData) => {
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${studentsData.total}\n`);
        res.write(`Number of students in CS: ${studentsData.cs.length}. List: ${studentsData.cs}\n`);
        res.write(`Number of students in SWE: ${studentsData.swe.length}. List: ${studentsData.swe}\n`);
      })
      .catch((error) => {
        console.error('Error processing students data:', error);
        res.write('Error processing students data.');
      })
      .finally(() => {
        res.end();
      });
  }
});

const port = 1245;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

module.exports = app;
