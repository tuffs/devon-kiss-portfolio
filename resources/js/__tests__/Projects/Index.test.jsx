import React from "react";

import { render, screen } from "@testing-library/react";
import ProjectsIndex from "@/Pages/Projects/Index";

/*
 * IMPORTANT:
 * Create a different props object when you have received projects to test!
 */

const defaultProps = {
  projects: [],
  flash: { message: "Test flash from backend" },
};

const noFlashProvidedProps = {
  projects: [],
  flash: {},
};

test("displays flash success message when flash.success exists", () => {
  render(<ProjectsIndex {...defaultProps} />);

  expect(screen.getByText("Success!")).toBeInTheDocument();
  expect(screen.getByText("Test flash from backend")).toBeInTheDocument();
});

test("does not show flash component when no success message is provided", () => {
  render(<ProjectsIndex {...noFlashProvidedProps} />);

  expect(screen.queryByText("Success!")).not.toBeInTheDocument();
});
