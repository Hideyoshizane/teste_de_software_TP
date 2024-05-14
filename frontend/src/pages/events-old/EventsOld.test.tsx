import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import EventsOld from "./EventsOld";

describe("EventsOld component", () => {
  it("should render the component without errors", () => {
    render(
      <MemoryRouter>
        <EventsOld />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Eventos Antigos")).toBeInTheDocument();
  });

  it("should render images", () => {
    render(
      <MemoryRouter>
        <EventsOld />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should render buttons", () => {
    render(
      <MemoryRouter>
        <EventsOld />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should render images", () => {
    render(
      <MemoryRouter>
        <EventsOld />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(9);
  });

  test("should navigate to events-description page when 'Eventos de Tecnologia' card is clicked", () => {
    const mockReplace = jest.fn();
    Object.defineProperty(window, "location", {
      value: {
        replace: mockReplace,
      },
      writable: true,
    });

    render(
      <MemoryRouter>
        <EventsOld />
      </MemoryRouter>
    );

    const eventosTecnologiaCard = screen.getByTestId("eventos-tecnologia-card");
    fireEvent.click(eventosTecnologiaCard);

    expect(mockReplace).toHaveBeenCalledWith("/events-description");
  });

});
