const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((studentsData) => {
      const responseText = 'This is the list of our students\n'
      + `Number of students: ${studentsData.total}\n`
      + `Number of students in CS: ${studentsData.cs.length}. List: ${studentsData.cs}\n`
      + `Number of students in SWE: ${studentsData.swe.length}. List: ${studentsData.swe}\n`;
      res.send(responseText);
    })
    .catch((error) => {
      console.error('Error processing students data:', error);
      res.send('Error processing students data.');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
