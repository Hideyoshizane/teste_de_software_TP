import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import EventsNext from "./EventsNext";

describe("EventsNext component", () => {
    it("should render the component without errors", () => {
      render(
        <MemoryRouter>
          <EventsNext />
        </MemoryRouter>
      );
  
      // Assert
      expect(screen.getByText("Próximos Eventos")).toBeInTheDocument();
    });
  
    it("should render all event cards", () => {
      render(
        <MemoryRouter>
          <EventsNext />
        </MemoryRouter>
      );
  
      // Assert
      const eventCards = screen.getAllByRole("img");
      expect(eventCards.length).toBe(8);
    });

    it("should display the 'Cadastrar Novos Eventos' button", () => {
      render(
        <MemoryRouter>
          <EventsNext />
        </MemoryRouter>
      );
  
      // Assert
      const button = screen.getByRole("button", { name: "Cadastrar Novos Eventos" });
      expect(button).toBeInTheDocument();
    });

    it("should display images", () => {
      render(
        <MemoryRouter>
          <EventsNext />
        </MemoryRouter>
      );
  
      // Assert
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });
  });