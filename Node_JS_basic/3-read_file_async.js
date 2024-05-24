const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== ''); // Supprimer les lignes vides

        if (lines.length === 0) {
          reject(new Error('Cannot load the database'));
        }

        const students = lines.slice(1); // Exclure l'en-tête
        const numberOfStudents = students.length;

        console.log(`Number of students: ${numberOfStudents}`);

        const fields = {};

        students.forEach((student) => {
          const [firstname, , , field] = student.split(',');

          if (!fields[field]) {
            fields[field] = [];
          }

          fields[field].push(firstname);
        });

        for (const [field, students] of Object.entries(fields)) {
          console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        }

        resolve();
      }
    });
  });
}

module.exports = countStudents;
