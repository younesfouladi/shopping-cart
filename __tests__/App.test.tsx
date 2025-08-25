import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });

  it("render hello world", () => {
    render(<h1>Hello world</h1>);
    expect(screen.getByRole("heading").textContent).toMatch(/hello world/i);
  });
});
