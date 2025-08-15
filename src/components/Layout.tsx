import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export default function Layout({ children, showNavbar = true }: LayoutProps) {
  const router = useRouter();

  const pagesWithoutNavBar = ['/login'];
  const shouldShowNavbar = showNavbar && !pagesWithoutNavBar.includes(router.pathname);

  return (
    <>
      {shouldShowNavbar && (
        <AppBar position="static">
          <Toolbar>
            <Button
              component={Link}
              href="/"
              sx={{
                textDecoration: router.pathname === "/" ? "underline" : "none",
                color: "inherit",
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/budget"
              sx={{
                textDecoration:
                  router.pathname === "/budget" ? "underline" : "none",
                color: "inherit",
              }}
            >
              Budget
            </Button>
            <Button
              component={Link}
              href="/debt"
              sx={{
                textDecoration:
                  router.pathname === "/debt" ? "underline" : "none",
                color: "inherit",
              }}
            >
              Debt
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  );
}