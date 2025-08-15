import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { principal, interestRate, loanTerm } = req.query;
  const P = parseFloat(principal as string);
  const r = parseFloat(interestRate as string) / 100 / 12;
  const n = parseFloat(loanTerm as string) * 12;

  if (isNaN(P) || isNaN(r) || isNaN(n)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  res.json({ monthlyPayment: M.toFixed(2) });
}
