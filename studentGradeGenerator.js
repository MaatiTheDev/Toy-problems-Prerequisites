// challenge-1/studentGradeGenerator.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateGrade(marks) {
  if (marks > 79) return 'A';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C';
  if (marks >= 40) return 'D';
  return 'E';
}

function promptMarks() {
  rl.question('Enter student marks (0-100): ', (input) => {
    const marks = parseFloat(input);

    if (isNaN(marks) || marks < 0 || marks > 100) {
      console.log('Invalid input. Please enter a number between 0 and 100.');
      promptMarks();
    } else {
      const grade = generateGrade(marks);
      console.log(`Grade: ${grade}`);
      rl.close();
    }
  });
}

promptMarks();