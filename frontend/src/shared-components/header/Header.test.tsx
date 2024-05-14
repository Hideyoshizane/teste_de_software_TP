import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import Header from "./Header";

describe("Header component", () => {
  it("renders title correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const titleElement = screen.getByText("Sistema de");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders subtitle correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const subtitleElement = screen.getByText("gestão escolar");
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders navigation buttons correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeButton = screen.getByText("Home");
    const presencaButton = screen.getByText("Presenca");
    const relatoriosButton = screen.getByText("Relatorio");
    const eventosButton = screen.getByText("Eventos");
    expect(homeButton).toBeInTheDocument();
    expect(presencaButton).toBeInTheDocument();
    expect(relatoriosButton).toBeInTheDocument();
    expect(eventosButton).toBeInTheDocument();
  });
});
