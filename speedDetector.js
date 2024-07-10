
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateDemeritPoints(speed) {
  const speedLimit = 70;
  const kmPerDemeritPoint = 5;

  if (speed <= speedLimit) {
    return "Ok";
  }

  const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint);

  if (demeritPoints > 12) {
    return "License suspended";
  }

  return `Points: ${demeritPoints}`;
}

function promptSpeed() {
  rl.question('Enter the car speed: ', (input) => {
    const speed = parseFloat(input);

    if (isNaN(speed) || speed < 0) {
      console.log('Invalid input. Please enter a positive number.');
      promptSpeed();
    } else {
      const result = calculateDemeritPoints(speed);
      console.log(result);
      rl.close();
    }
  });
}

promptSpeed();