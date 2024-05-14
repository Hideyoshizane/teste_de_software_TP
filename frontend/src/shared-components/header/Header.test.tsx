import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Header from "./Header";


jest.mock("react-router-dom");

describe("Header component", () => {

  it("renders title correctly", () => {
    render(<Header />);
    const titleElement = screen.getByText("Sistema de");
    //assert
    expect(titleElement).toBeInTheDocument();
  });

  it("renders subtitle correctly", () => {
    render(<Header />);
    const subtitleElement = screen.getByText("gestão escolar");
    //assert
    expect(subtitleElement).toBeInTheDocument();
  });
  

  it("renders navigation buttons correctly", () => {
    render(<Header />);
    const homeButton = screen.getByText("Home");
    const presencaButton = screen.getByText("Presença");
    const relatoriosButton = screen.getByText("Relatórios");
    const eventosButton = screen.getByText("Eventos");
    //assert
    expect(homeButton).toBeInTheDocument();
    expect(presencaButton).toBeInTheDocument();
    expect(relatoriosButton).toBeInTheDocument();
    expect(eventosButton).toBeInTheDocument();
  });

});
