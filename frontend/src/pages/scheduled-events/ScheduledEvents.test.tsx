import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ScheduledEvents from "./ScheduledEvents";

describe("ScheduledEvents component", () => {
  it("should render the 'Cadastrar Eventos' card", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );
    const cadastrarEventosCard = screen.getByText("Cadastrar Eventos");
    //assert
    expect(cadastrarEventosCard).toBeInTheDocument();
    expect(cadastrarEventosCard.tagName).toBe("H5");
  });

  it("should render the 'Próximos eventos' subtitle", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );
    const proximosEventosSubtitle = screen.getByText("Próximos eventos");
    //assert
    expect(proximosEventosSubtitle).toBeInTheDocument();
    expect(proximosEventosSubtitle.tagName).toBe("H4");
  });

  it("should render the 'Eventos Antigos' subtitle", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );
    const eventosAntigosSubtitle = screen.getByText("Eventos Antigos");
    //assert
    expect(eventosAntigosSubtitle).toBeInTheDocument();
    expect(eventosAntigosSubtitle.tagName).toBe("H4");
  });

  it("should render images in the cards", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should render dates in the cards", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );

    const dateElements = screen.getAllByTestId("event-date");
    expect(dateElements.length).toBeGreaterThan(0);
  });

});
