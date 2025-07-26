import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "../App";

// Helper function to render App with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("App", () => {
  it("renders without crashing", () => {
    renderWithRouter(<App />);
    expect(document.body).toBeTruthy();
  });

  it("contains main content", () => {
    renderWithRouter(<App />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeTruthy();
  });

  it("displays home page content by default", () => {
    renderWithRouter(<App />);
    expect(screen.getByText("Grupo Naser - Home Page")).toBeTruthy();
  });

  it("contains navigation links", () => {
    renderWithRouter(<App />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Services")).toBeTruthy();
    expect(screen.getByText("Locations")).toBeTruthy();
    expect(screen.getByText("Contact")).toBeTruthy();
  });
});