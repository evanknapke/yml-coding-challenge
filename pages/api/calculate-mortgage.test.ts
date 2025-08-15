import { describe, it, expect } from "vitest";
import { createMocks } from "node-mocks-http";
import handler from "./calculate-mortgage";
import { NextApiRequest, NextApiResponse } from "next";

describe("API Route: /api/calculate-mortgage", () => {
  it("should return the correct monthly payment for valid inputs", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        principal: "200000",
        interestRate: "5",
        loanTerm: "30",
      },
    });

    handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.monthlyPayment).toBe("1073.64");
  });

  it("should return a 400 error for invalid inputs", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        principal: "invalid",
        interestRate: "5",
        loanTerm: "30",
      },
    });

    handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe("Invalid input");
  });

  it("should return a 400 error for missing inputs", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        principal: "200000",
        interestRate: "5",
      },
    });

    handler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe("Invalid input");
  });
});
