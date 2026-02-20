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

  it("has an Email Address, type of text, input field.", () => {
    const emailInputField = document.getElementById("email");
    expect(emailInputField).toBeInTheDocument();
    expect(emailInputField.getAttribute("type")).toBe("email");
  });

  it("has a Password, type of password, input field", () => {
    const passwordInputField = document.getElementById("password");
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordInputField.getAttribute("type")).toBe("password");
  });
});
