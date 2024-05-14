import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";


import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  it("should render email and password fields", () => {
    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

    const emailField = screen.getByLabelText("E-mail");
    const passwordField = screen.getByLabelText("Senha");
    
    //assert
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it("should update state when email and password values change", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailField = screen.getByLabelText("E-mail");
    const passwordField = screen.getByLabelText("Senha");

    act(() => {
      userEvent.type(emailField, "test@example.com");
      userEvent.type(passwordField, "password123");
    });
    //assert
    expect(emailField).toHaveValue("test@example.com");
    expect(passwordField).toHaveValue("password123");
  });

  it("should show error if email field is empty", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText("E-mail");
    fireEvent.change(emailInput, { target: { value: "" } });
  
    const enterButton = screen.getByText("Entrar");
    fireEvent.click(enterButton);
    //assert
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obrigatório");
  });

  it("should show error if password field is empty", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Senha");
    fireEvent.change(passwordInput, { target: { value: "" } });

    const enterButton = screen.getByText("Entrar");
    fireEvent.click(enterButton);
    //assert
    expect(screen.getByLabelText("password-helper-text")).toBeInTheDocument();

  });

  it("should navigate to home page if email and password fields are filled", () => {
    const mockNavigate = jest.fn(); // Mock da função de navegação
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Senha");
    const enterButton = screen.getByText("Entrar");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(enterButton);
    //assert
    expect(mockNavigate).toHaveBeenCalledWith("home");
  });
  
});
