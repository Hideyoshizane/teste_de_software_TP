import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import EventsRegister from "./EventsRegister";

describe("EventsRegister", () => {
  it("should render event name field", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Nome do evento")).toBeInTheDocument();
  });
    
  it("should render date of birth field", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Data de Nascimento")).toBeInTheDocument();
  });
    
  it("should render event type field", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Tipo do Evento")).toBeInTheDocument();
  });
    
  it("should render event description field", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Descrição do Evento")).toBeInTheDocument();
  });
    
  it("should render add cover photos button", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: "Adicionar fotos de capa" })).toBeInTheDocument();
  });
    
  it("should render save event button", () => {
    render(
      <MemoryRouter>
        <EventsRegister />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: "Salvar Evento" })).toBeInTheDocument();
  });

  it("should navigate to scheduled-events page when Salvar Evento button is clicked", () => {
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
        <EventsRegister />
      </MemoryRouter>
    );

    const agendaEventosCard = screen.getByText("Salvar Evento");
    fireEvent.click(agendaEventosCard);
    expect(mockHistoryPush).toHaveBeenCalledWith("/scheduled-events");
  });

});
