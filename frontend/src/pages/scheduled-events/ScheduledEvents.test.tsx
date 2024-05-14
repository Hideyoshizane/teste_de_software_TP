import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ScheduledEvents from "./ScheduledEvents";

describe("ScheduledEvents component", () => {
  it("should render the 'Próximos Eventos' card", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );
    const proximosEventosCard = screen.getByText("Próximos Eventos");
    //assert
    expect(proximosEventosCard).toBeInTheDocument();
    expect(proximosEventosCard.tagName).toBe("H5");
  });

  it("should render the 'Próximos Anteriores' card", () => {
    render(
      <MemoryRouter>
        <ScheduledEvents />
      </MemoryRouter>
    );
    const proximosAnterioresCard = screen.getByText("Próximos Anteriores");
    //assert
    expect(proximosAnterioresCard).toBeInTheDocument();
    expect(proximosAnterioresCard.tagName).toBe("H5");
  });

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
});
