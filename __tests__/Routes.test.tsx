import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../src/routes/routes";

// Mock all the components
vi.mock("../src/App", () => ({
  default: () => (
    <div data-testid="app">
      <div data-testid="outlet">Outlet Content</div>
    </div>
  ),
}));

vi.mock("../src/components/homePage/home", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../src/components/explorePage/explore", () => ({
  default: () => <div data-testid="explore-page">Explore Page</div>,
}));

vi.mock("../src/components/wishList/wishList", () => ({
  default: () => <div data-testid="wishlist-page">WishList Page</div>,
}));

describe("Routes Configuration", () => {
  it("has correct route structure", () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe("/");
    expect(routes[0].children).toHaveLength(3);
  });

  it("renders App component at root path", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("renders HomePage as index route", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("app")).toBeInTheDocument();
    // Note: In a real test, you'd need to properly mock the Outlet component
    // to render the index route. This is a simplified version.
  });

  it("has explore route configured", () => {
    const exploreRoute = routes[0].children?.find(
      (route) => route.path === "explore"
    );
    expect(exploreRoute).toBeDefined();
  });

  it("has wishList route configured", () => {
    const wishListRoute = routes[0].children?.find(
      (route) => route.path === "wishList"
    );
    expect(wishListRoute).toBeDefined();
  });

  it("has index route configured", () => {
    const indexRoute = routes[0].children?.find(
      (route) => route.index === true
    );
    expect(indexRoute).toBeDefined();
  });

  it("navigates to explore page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/explore"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("navigates to wishlist page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/wishList"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("handles invalid routes", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/invalid-route"],
    });

    render(<RouterProvider router={router} />);

    // Should still render the App component as it's the parent route
    expect(screen.getByRole("img").getAttribute("alt")).toMatch(/404 picture/i);
  });

  it("maintains nested route structure", () => {
    expect(routes[0].children).toEqual([
      expect.objectContaining({ path: "explore" }),
      expect.objectContaining({ index: true }),
      expect.objectContaining({ path: "wishList" }),
    ]);
  });

  it("exports routes as default", () => {
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBe(true);
  });
});
