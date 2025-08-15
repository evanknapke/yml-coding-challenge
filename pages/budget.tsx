import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, Divider, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import theme from "../src/theme";
import { withRole } from "../src/withRoles";
import { GetServerSideProps } from "next";
import Role from "../src/roles";

interface BudgetData {
  income: string;
  transportation: string | "";
  housing: string;
  food: string;
  utilities: string;
  clothing: string;
  createdAt: string;
}

export const getServerSideProps: GetServerSideProps = withRole(
  async (_context) => {
    return {
      props: { }
    };
  },
  [ Role.USER, Role.ADMIN ]
);

export default function Budget() {
  const [data, setData] = useState<BudgetData[]>([]);

  useEffect(() => {
    const savedData = Cookies.get("budgetData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    /**
     * Store the data as cookies, just for the purpose of this example. Normally this would be stored in a database.
     */
    Cookies.set("budgetData", JSON.stringify(updatedData));
  };

  const formik = useFormik({
    initialValues: {
      income: "",
      transportation: "",
      housing: "",
      food: "",
      utilities: "",
      clothing: "",
    },
    // TODO: Add more input validation.
    validationSchema: Yup.object({
      income: Yup.number().required("Required"),
      transportation: Yup.number().required("Required"),
      housing: Yup.number().required("Required"),
      food: Yup.number().required("Required"),
      utilities: Yup.number().required("Required"),
      clothing: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      const newData = [
        ...data,
        { ...values, createdAt: new Date().toLocaleString() },
      ];
      setData(newData);
      /**
       * Store the data as cookies, just for the purpose of this example. Normally this would be stored in a database.
       */
      Cookies.set("budgetData", JSON.stringify(newData));
    },
  });

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
          Budget Form
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid
            container
            alignItems="stretch"
            //make grid items fill all space
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={8}>
              <TextField
                label="Income"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("income")}
                error={formik.touched.income && Boolean(formik.errors.income)}
                helperText={formik.touched.income && formik.errors.income}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Transportation"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("transportation")}
                error={
                  formik.touched.transportation &&
                  Boolean(formik.errors.transportation)
                }
                helperText={
                  formik.touched.transportation && formik.errors.transportation
                }
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Housing"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("housing")}
                error={formik.touched.housing && Boolean(formik.errors.housing)}
                helperText={formik.touched.housing && formik.errors.housing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Food"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("food")}
                error={formik.touched.food && Boolean(formik.errors.food)}
                helperText={formik.touched.food && formik.errors.food}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Utilities"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("utilities")}
                error={
                  formik.touched.utilities && Boolean(formik.errors.utilities)
                }
                helperText={formik.touched.utilities && formik.errors.utilities}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item md={8} xs={1}>
              <TextField
                label="Clothing"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("clothing")}
                error={
                  formik.touched.clothing && Boolean(formik.errors.clothing)
                }
                helperText={formik.touched.clothing && formik.errors.clothing}
                sx={{ mb: 6 }}
              />
            </Grid>

            <Grid item xs={1} md={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ ":hover": { color: theme.palette.secondary.dark } }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Divider
          sx={{ my: 4, height: 2, width: "100%", opacity: 0.3 }}
          color="secondary"
          orientation="horizontal"
        />

        {data?.map((item, index) => (
          <Card key={index} sx={{ mb: 2, width: "100%" }}>
            <CardContent>
              <Stack direction={"row"}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Budget # {index + 1}
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Typography variant="body1" component="div">
                Income: ${item.income}
              </Typography>
              <Typography variant="body1" component="div">
                Transportation: ${item.transportation}
              </Typography>
              <Typography variant="body1" component="div">
                Housing: ${item.housing}
              </Typography>
              <Typography variant="body1" component="div">
                Food: ${item.food}
              </Typography>
              <Typography variant="body1" component="div">
                Utilities: ${item.utilities}
              </Typography>
              <Typography variant="body1" component="div">
                Clothing: ${item.clothing}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created At {new Date(item.createdAt).toString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
