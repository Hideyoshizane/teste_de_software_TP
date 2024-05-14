import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventsAddPhotos from "./EventsAddPhotos";

describe("EventsAddPhotos component", () => {
  
  it("should render the 'Nome do evento' text field", () => {
    render(
      <MemoryRouter>
        <EventsAddPhotos />
      </MemoryRouter>
    );

    const nomeEventoField = screen.getByLabelText("Nome do evento");
    
    // Assert
    expect(nomeEventoField).toBeInTheDocument();
    expect(nomeEventoField).toHaveAttribute("type", "text");
  });

  it("should render the 'Tipo do Evento' text field", () => {
    render(
      <MemoryRouter>
        <EventsAddPhotos />
      </MemoryRouter>
    );

    const tipoEventoField = screen.getByLabelText("Tipo do Evento");
    
    // Assert
    expect(tipoEventoField).toBeInTheDocument();
    expect(tipoEventoField).toHaveAttribute("type", "url");
  });

  it("should render the 'Adicionar novas fotos' heading", () => {
    render(
      <MemoryRouter>
        <EventsAddPhotos />
      </MemoryRouter>
    );
  
    const adicionarFotosHeading = screen.getByRole("heading", { name: "Adicionar novas fotos" });
    // Assert
    expect(adicionarFotosHeading).toBeInTheDocument();
    expect(adicionarFotosHeading.tagName).toBe("H5");
  });

  test("should render the 'Salvar fotos na galeria' button", () => {
    render(
      <MemoryRouter>
        <EventsAddPhotos />
      </MemoryRouter>
    );
    
    const button = screen.getByRole("button", { name: "Salvar fotos na galeria" });
    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should navigate to scheduled-events page when Agenda de Eventos card is clicked", () => {
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
        <EventsAddPhotos />
      </MemoryRouter>
    );
    const agendaEventosCard = screen.getByText("Salvar fotos na galeria");
    fireEvent.click(agendaEventosCard);
    // Assert
    expect(mockHistoryPush).toHaveBeenCalledWith("/events-description");
  });

});
