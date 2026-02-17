import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessFlashMessage from "@/Components/SuccessFlashMessage";

test("renders sucess message when message is provided", () => {
  render(<SuccessFlashMessage message="Project saved successfully" />);

  expect(screen.getByText("Success!")).toBeInTheDocument();
  expect(screen.getByText("Project saved successfully")).toBeInTheDocument();
});
