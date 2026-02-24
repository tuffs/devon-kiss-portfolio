import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "@/Pages/Auth/Login";

describe("Auth: Login UI Tests", () => {
  beforeEach(() => {
    render(<Login status={200} />);
  });

  it("can be accessed and provides status code: 200", () => {
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("displays the text Admin Login", () => {
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
  });

  it("displays the Admin Login w/ class `text-indigo-800/90`", () => {
    const adminLoginHeaderText = screen.getByRole("heading", {
      level: 1,
      name: "Admin Login",
    });
    expect(adminLoginHeaderText).toHaveAttribute(
      "class",
      expect.stringContaining("text-indigo-800/90"),
    );
  });

  it("has an Email Address, type of text, input field w/ an empty value", () => {
    const emailInputField = document.getElementById("email");
    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute("type")).toBe("email");
    expect(emailInputField).toHaveAttribute(
      "value",
      expect.stringContaining(""),
    );
  });

  it("has a Password, type of password, input field w/ an empty value", () => {
    const passwordInputField = document.getElementById("password");
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute("type")).toBe("password");
    expect(passwordInputField).toHaveAttribute(
      "value",
      expect.stringContaining(""),
    );
  });

  it("has a Login button", () => {
    const loginButton = screen.getByRole("button", {
      name: "Log in",
    });
    expect(loginButton).toBeInTheDocument();
  });
});
