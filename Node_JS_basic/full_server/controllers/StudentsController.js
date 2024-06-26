import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2] || './database.csv')
      .then((studentsData) => {
        const responseText = 'This is the list of our students\n'
          + `Number of students in CS: ${studentsData.CS.length}. List: ${studentsData.CS}\n`
          + `Number of students in SWE: ${studentsData.SWE.length}. List: ${studentsData.SWE}\n`;

        response.status(200).send(responseText);
      })
      .catch((error) => {
        console.error('Error processing students data:', error);
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(process.argv[2] || './database.csv')
      .then((studentsData) => {
        const majorStudents = studentsData[major] || [];
        const responseText = `List: ${majorStudents.join(', ')}\n`;

        response.status(200).send(responseText);
      })
      .catch((error) => {
        console.error('Error processing students data:', error);
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
