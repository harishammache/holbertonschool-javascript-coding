import fs from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const groupedByField = data
        .split('\n')
        .filter(Boolean)
        .slice(1)
        .reduce((acc, line) => {
          const [firstname, lastname, age, field] = line.split(',');
          acc[field] = [...(acc[field] || []), firstname];
          return acc;
        }, {});
      resolve(groupedByField);
    });
  });
}

module.exports = readDatabase;
