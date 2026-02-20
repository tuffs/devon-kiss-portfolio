import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectsIndex from "@/Pages/Projects/Index";

describe("Projects - Index View - Flash Messaging Test Suite", () => {
  const defaultProps = {
    projects: [],
    flash: { success: "success: from backend" },
  };

  const cautionProps = {
    projects: [],
    flash: { caution: "caution: from backend" },
  };

  const errorProps = {
    projects: [],
    flash: { error: "error: from backend" },
  };

  const noFlashProvidedProps = {
    projects: [],
    flash: {},
  };

  it("displays success flash message - if it exists", () => {
    render(<ProjectsIndex {...defaultProps} />);

    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("success: from backend")).toBeInTheDocument();
  });

  it("displays a caution flash message - if it exists", () => {
    render(<ProjectsIndex {...cautionProps} />);

    expect(screen.getByText("Caution!")).toBeInTheDocument();
    expect(screen.getByText("caution: from backend"));
  });

  it("displays an error flash message - if it exists", () => {
    render(<ProjectsIndex {...errorProps} />);

    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("error: from backend"));
  });

  it("has no flash message displayed - if none are provided", () => {
    render(<ProjectsIndex {...noFlashProvidedProps} />);

    expect(screen.queryByText("Success!")).not.toBeInTheDocument();
    expect(screen.queryByText("Caution!")).not.toBeInTheDocument();
    expect(screen.queryByText("Error!")).not.toBeInTheDocument();
  });
});
