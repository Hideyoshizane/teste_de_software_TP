import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import EventsDescription from "./EventsDescription";


describe("EventsDescription component", () => {
  it("should render the component without errors", () => {
    render(
      <MemoryRouter>
        <EventsDescription />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Eventos de Tecnologia")).toBeInTheDocument();
    expect(screen.getByText("Descrição do evento")).toBeInTheDocument();
  });

  it("should display the event cards", () => {
    render(
      <MemoryRouter>
        <EventsDescription />
      </MemoryRouter>
    );

    // Assert
    const eventCards = screen.getAllByRole("img");
    expect(eventCards.length).toBeGreaterThan(0);
  });

  it("should display the correct number of event images", () => {
    render(
      <MemoryRouter>
        <EventsDescription />
      </MemoryRouter>
    );
  
    const eventImages = screen.getAllByRole("img");
  
    // Assert
    expect(eventImages.length).toBe(6);
  });

  it("should render the 'Adicionar Fotos' button", () => {
    render(
      <MemoryRouter>
        <EventsDescription />
      </MemoryRouter>
    );
    
    const button = screen.getByRole("button", { name: "Adicionar Fotos" });
    // Assert
    expect(button).toBeInTheDocument();
  });

  it("should navigate to the add photos page when the ADD PHOTOS button is clicked", () => {
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
        <EventsDescription />
      </MemoryRouter>
    );
    const agendaEventosCard = screen.getByText("Adicionar Fotos");
    fireEvent.click(agendaEventosCard);
    // Assert
    expect(mockHistoryPush).toHaveBeenCalledWith("/events-add-photos");
  });

});
