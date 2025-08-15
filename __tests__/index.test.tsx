import { expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Index from "../pages/index";

vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    pathname: "/",
    query: {},
    asPath: "/",
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  })),
}));

test("Index Page", () => {
  render(<Index />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: /your money line/i,
  });
  expect(heading).toBeDefined();

  // Check for the Principal input field
  const principalInput = screen.getByLabelText(/principal/i);
  expect(principalInput).toBeDefined();

  // Check for the Interest Rate input field
  const interestRateInput = screen.getByLabelText(/interest rate/i);
  expect(interestRateInput).toBeDefined();

  // Check for the Loan Term input field
  const loanTermInput = screen.getByLabelText(/loan term/i);
  expect(loanTermInput).toBeDefined();

  // Check for the Calculate Mortgage button
  const calculateButton = screen.getByRole("button", {
    name: /calculate mortgage/i,
  });
  expect(calculateButton).toBeDefined();
});
