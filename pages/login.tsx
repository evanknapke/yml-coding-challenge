import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the authenticated cookie is available
    const authStatus = !!Cookies.get("user");
    setIsAuthenticated(authStatus);

    // If authenticated, redirect to the home page
    if (authStatus) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = () => {
    Cookies.set("user", JSON.stringify({ roles: ["user"] }));
    router.push("/");
  };

  if (isAuthenticated === null) {
    // Render nothing while checking authentication
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1619995745882-f4128ac82ad6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your background image path
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={50}
        style={{ zIndex: -1 }}
      />

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          zIndex: 1, // Ensure content is above the background image
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
