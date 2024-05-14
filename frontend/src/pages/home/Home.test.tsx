import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import Home from "./Home";

describe("Home", () => {
  it("should render Cadastro de alunos card", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    //asert
    expect(screen.getByText("Cadastro de alunos")).toBeInTheDocument();
  });

  it("should navigate to register student page when Cadastro de alunos card is clicked", () => {
    const mockHistoryPush = jest.fn();
    jest.spyOn(history, "replaceState");
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        replace: mockHistoryPush,
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const cadastroCard = screen.getByText("Cadastro de alunos");
    fireEvent.click(cadastroCard);
    //asert
    expect(mockHistoryPush).toHaveBeenCalledWith("/register-student");
  });

  it("should render Lista de Presença card", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    //asert
    expect(screen.getByText("Lista de Presença")).toBeInTheDocument();
  });

  it("should render Relatório de Presença card", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    //asert
    expect(screen.getByText("Relatório de Presença")).toBeInTheDocument();
  });

  it("should render Lista de alunos card", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    //asert
    expect(screen.getByText("Lista de alunos")).toBeInTheDocument();
  });


  it("should navigate to student-list page when Lista de alunos card is clicked", () => {
    const mockHistoryPush = jest.fn(); // Mock da função de navegação
    jest.spyOn(history, "replaceState"); // Mock da função replaceState do objeto history
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        replace: mockHistoryPush,
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const editarExcluirAlunoCard = screen.getByText("Lista de alunos");
    fireEvent.click(editarExcluirAlunoCard);
    //asert
    expect(mockHistoryPush).toHaveBeenCalledWith("/student-list");
  });

  it("should render Agenda de Eventos card", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    //asert
    expect(screen.getByText("Agenda de Eventos")).toBeInTheDocument();
  });

  it("should navigate to scheduled-events page when Agenda de Eventos card is clicked", () => {
    const mockHistoryPush = jest.fn(); // Mock da função de navegação
    jest.spyOn(history, "replaceState"); // Mock da função replaceState do objeto history
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        replace: mockHistoryPush,
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const agendaEventosCard = screen.getByText("Agenda de Eventos");
    fireEvent.click(agendaEventosCard);
    //asert
    expect(mockHistoryPush).toHaveBeenCalledWith("/scheduled-events");
  });

  
});
