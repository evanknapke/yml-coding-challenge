import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Role from "../src/roles";
import type { GetServerSideProps } from "next";
import { withRole } from "../src/withRoles";

export const getServerSideProps: GetServerSideProps = withRole(
  async (_context) => {
    return {
      props: { }
    };
  },
  [ Role.USER, Role.ADMIN ]
);

// TODO: This needs renamed to  "Mortgage"
export default function Debt() {
  const [Principal, setPrincipal] = useState(""); // TODO: Rename `Principal` to `principal`
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  const calculateMortgage = async () => {
    // TODO: POST would be more appropriate here.
    const response = await fetch(
      `/api/calculate-mortgage?principal=${Principal}&interestRate=${interestRate}&loanTerm=${loanTerm}`
    );

    try {
      const data = await response.json();
      setMonthlyPayment(data.monthlyPayment);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: This is an unused duplicate of calculateMortgage(), remove it.
  const calculateAdjustableMortgage = async () => {
    const response = await fetch(
      `/api/calculate-mortgage?principal=${Principal}&interestRate=${interestRate}&loanTerm=${loanTerm}`
    );

    try {
      const data = await response.json();
      setMonthlyPayment(data.monthlyPayment);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Move navigation bar to a layout component
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Your Money Line
        </Typography>
        <TextField
          label="Principal"
          variant="outlined"
          value={Principal}
          onChange={(e) => setPrincipal(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Interest Rate (%)"
          variant="outlined"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Loan Term (years)"
          variant="outlined"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={calculateMortgage}
          >
            Calculate Mortgage
          </Button>
          {monthlyPayment && (
            <Typography variant="h6" component="p" sx={{ mt: 2 }}>
              Monthly Payment: ${monthlyPayment}
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
