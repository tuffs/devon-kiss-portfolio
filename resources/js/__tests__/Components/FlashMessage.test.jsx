import React from "react";
import { render, screen } from "@testing-library/react";
import FlashMessage from "@/Components/FlashMessage";

describe("flash messages test suite", () => {
  it("success flash message", () => {
    render(
      <FlashMessage
        messageType="success"
        message="Project saved successfully"
      />,
    );

    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Project saved successfully")).toBeInTheDocument();
  });
});
