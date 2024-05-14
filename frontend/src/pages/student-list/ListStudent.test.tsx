import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ListStudent from "./ListStudent";

describe("ListStudent component", () => {
  it("renders the search input", () => {
    render(
      <MemoryRouter>
        <ListStudent />
      </MemoryRouter>
    );
    const searchInput = screen.getByLabelText("Busca por aluno");
    //assert
    expect(searchInput).toBeInTheDocument();
  });

  it("filters students based on search input", async () => {
    render(
      <MemoryRouter>
        <ListStudent />
      </MemoryRouter>
    );
  
    const searchInput = screen.getByLabelText("Busca por aluno");
    await act(async () => {
      userEvent.type(searchInput, "Aline");
    });
    //assert
    expect(screen.getByText("Aline de Morão")).toBeInTheDocument();
  });

  it("displays student information correctly", () => {
    render(
      <MemoryRouter>
        <ListStudent />
      </MemoryRouter>
    );
  
    const studentName = screen.getByText("Aline de Morão");
    const studentClass = screen.getByText("Turma de inglês I1");
    const studentInfo = screen.getByText("Inglês básico");
    //assert
    expect(studentName).toBeInTheDocument();
    expect(studentClass).toBeInTheDocument();
    expect(studentInfo).toBeInTheDocument();
  });

  it("displays the correct number of students in the list", () => {
    render(
      <MemoryRouter>
        <ListStudent />
      </MemoryRouter>
    );
  
    const students = screen.getAllByTestId("student-row");
    //assert
    expect(students).toHaveLength(4);
  });

  
});
