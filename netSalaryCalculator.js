// challenge-3/netSalaryCalculator.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculatePayee(annualTaxableIncome) {
  // Implement PAYE calculation based on KRA tax bands
  // This is a simplified version and may need to be updated
  if (annualTaxableIncome <= 288000) return annualTaxableIncome * 0.1;
  if (annualTaxableIncome <= 388000) return 28800 + (annualTaxableIncome - 288000) * 0.25;
  return 53300 + (annualTaxableIncome - 388000) * 0.3;
}

function calculateNHIF(grossPay) {
  // Implement NHIF calculation based on the NHIF rates
  // This is a simplified version and may need to be updated
  if (grossPay <= 5999) return 150;
  if (grossPay <= 7999) return 300;
  // ... add more conditions for other salary ranges
  return 1700; // maximum deduction
}

function calculateNSSF(pensionablePay) {
  // Implement NSSF calculation
  // This is a simplified version and may need to be updated
  const rate = 0.06;
  const maxDeduction = 1080;
  return Math.min(pensionablePay * rate, maxDeduction);
}

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;
  const nssf = calculateNSSF(basicSalary);
  const nhif = calculateNHIF(grossSalary);
  const annualTaxableIncome = (grossSalary - nssf) * 12;
  const payee = calculatePayee(annualTaxableIncome) / 12;

  const netSalary = grossSalary - payee - nhif - nssf;

  return {
    grossSalary,
    payee,
    nhif,
    nssf,
    netSalary
  };
}

function promptSalaryInfo() {
  rl.question('Enter basic salary: ', (basicSalaryInput) => {
    rl.question('Enter benefits: ', (benefitsInput) => {
      const basicSalary = parseFloat(basicSalaryInput);
      const benefits = parseFloat(benefitsInput);

      if (isNaN(basicSalary) || isNaN(benefits) || basicSalary < 0 || benefits < 0) {
        console.log('Invalid input. Please enter positive numbers.');
        promptSalaryInfo();
      } else {
        const result = calculateNetSalary(basicSalary, benefits);
        console.log('Salary Breakdown:');
        console.log(`Gross Salary: ${result.grossSalary.toFixed(2)}`);
        console.log(`PAYEE (Tax): ${result.payee.toFixed(2)}`);
        console.log(`NHIF Deduction: ${result.nhif.toFixed(2)}`);
        console.log(`NSSF Deduction: ${result.nssf.toFixed(2)}`);
        console.log(`Net Salary: ${result.netSalary.toFixed(2)}`);
        rl.close();
      }
    });
  });
}

promptSalaryInfo();