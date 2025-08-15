import type { NextApiRequest, NextApiResponse } from "next";

function calculatePaydownDate(months: number): string {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate.toLocaleDateString();
}

function monthlyPayment(p: number, n: number, i: number) {
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function calculateMonthsToPayOff(
  principal: number,
  monthlyPayment: number,
  monthlyInterestRate: number
): number {
  let months = 0;
  let balance = principal;

  while (balance > 0) {
    balance = balance * (1 + monthlyInterestRate) - monthlyPayment;
    months++;
  }

  return months;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { principal, interestRate, loanTerm } = req.body;

  // Validate inputs
  if (!principal || !interestRate || !loanTerm) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const P = parseFloat(principal);
  const r = parseFloat(interestRate) / 100 / 12;
  const n = parseFloat(loanTerm) * 12;

  if (isNaN(P) || isNaN(r) || isNaN(n)) {
    return res.status(400).json({ error: "Invalid input values" });
  }

  if (P <= 0 || parseFloat(interestRate) <= 0 || parseFloat(loanTerm) <= 0) {
    return res.status(400).json({ error: "Values must be positive" });
  }

  try {
    const monthlyPaymentAmount = monthlyPayment(P, n, r);
    const monthsToPayOff = calculateMonthsToPayOff(P, monthlyPaymentAmount, r);
    const paydownDate = calculatePaydownDate(monthsToPayOff);

    res.json({
      principal: P,
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTerm),
      monthlyPayment: monthlyPaymentAmount,
      paydownDate: paydownDate,
      monthsToPayOff: monthsToPayOff
    });
  } catch (error) {
    res.status(500).json({ error: "Calculation failed" });
  }
} 