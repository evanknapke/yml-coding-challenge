import * as React from "react";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import type { GetServerSideProps } from "next";
import { withRole } from "../src/withRoles";
import Role from "../src/roles";
import theme from "../src/theme";
import { useFormik } from "formik";
import * as Yup from "yup";

interface DebtData {
  principal: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  paydownDate: string;
}

export const getServerSideProps: GetServerSideProps = withRole(
  async (_context) => {
    return {
      props: { }
    };
  },
  [Role.USER]
);

export default function Debt() {
  const [debtData, setDebtData] = useState<DebtData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = Cookies.get("debtData");
    if (savedData) {
      setDebtData(JSON.parse(savedData));
    }
  }, []);

  const calculateDebt = async (values: { principal: string, interestRate: string, loanTerm: string }) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/calculate-debt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          principal: values.principal,
          interestRate: values.interestRate,
          loanTerm: values.loanTerm,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Calculation failed');
        return;
      }

      const result = await response.json();
      setDebtData({
        principal: result.principal,
        interestRate: result.interestRate,
        loanTerm: result.loanTerm,
        monthlyPayment: result.monthlyPayment,
        paydownDate: result.paydownDate,
      });
    } catch (error) {
      setError('Network error occurred');
      console.error('Error calculating debt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      principal: "",
      interestRate: "",
      loanTerm: "",
    },
    validationSchema: Yup.object({
      principal: Yup.number().min(0, "Principal must be at least $0").required("Required"),
      interestRate: Yup.number().min(0, "Interest rate must be at least 0%").max(100, "Interest rate cannot exceed 100%").required("Required"),
      loanTerm: Yup.number().min(1, "Loan term must be at least 1 year").max(50, "Loan term cannot exceed 50 years").required("Required"),
    }),
    onSubmit: (values) => {
      calculateDebt(values);
    },
  });

    // TODO: Move navigation bar to a layout component
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Button
            component={Link}
            href="/"
            sx={{
              textDecoration: router.pathname === "/" ? "underline" : "none",
              color: "grey",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/budget"
            sx={{
              textDecoration: router.pathname === "/budget" ? "underline" : "none",
              color: "grey",
            }}
          >
            Budget
          </Button>
          <Button
            component={Link}
            href="/debt"
            sx={{
              textDecoration: router.pathname === "/debt" ? "underline" : "none",
              color: "grey",
            }}
          >
            Debt
          </Button>
        </Toolbar>
      </AppBar>
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
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
          <TextField
            label="Principal"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("principal")}
            error={formik.touched.principal && Boolean(formik.errors.principal)}
            helperText={formik.touched.principal && formik.errors.principal}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Interest Rate (%)"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("interestRate")}
            error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
            helperText={formik.touched.interestRate && formik.errors.interestRate}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Loan Term (years)"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps("loanTerm")}
            error={formik.touched.loanTerm && Boolean(formik.errors.loanTerm)}
            helperText={formik.touched.loanTerm && formik.errors.loanTerm}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isLoading}
            sx={{ ":hover": { color: theme.palette.secondary.dark } }}
          >
            {isLoading ? "Calculating..." : "Calculate Debt"}
          </Button>
        </Box>
        {error && (
          <Typography variant="h6" component="p" sx={{ mt: 2, color: 'error.main' }}>
            Error: {error}
          </Typography>
        )}
        {debtData?.monthlyPayment && (
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Monthly Payment: ${debtData?.monthlyPayment.toFixed(2)}
          </Typography>
        )}
        {debtData?.paydownDate && (
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Paydown Date: {debtData?.paydownDate}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
