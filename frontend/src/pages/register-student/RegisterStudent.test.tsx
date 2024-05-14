import "@testing-library/jest-dom/extend-expect";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter} from "react-router-dom";
import { render, screen} from "@testing-library/react";

import RegisterStudent from "./RegisterStudent";

describe("RegisterStudent component", () => {
    it("should render the register form with initial values", () => {
      render(
        <MemoryRouter>
          <RegisterStudent />
        </MemoryRouter>
      );
      //assert
      expect(screen.getByLabelText("Nome completo")).toHaveValue("");
      expect(screen.getByLabelText("Data de Nascimento")).toHaveValue("");
      expect(screen.getByLabelText("Endereço")).toHaveValue("");
      expect(screen.getByLabelText("Nome do tutor responsável")).toHaveValue("");
      expect(screen.getByLabelText("Telefone do tutor responsável")).toHaveValue("");
      expect(screen.getByLabelText("Turno de aula")).not.toBeNull();
    });
    
    it("should render input fields", () => {
      render(
        <MemoryRouter>
          <RegisterStudent />
        </MemoryRouter>
      );
  
      const fullNameField = screen.getByLabelText("Nome completo");
      const dataNascimentoField = screen.getByLabelText("Data de Nascimento");
      const addressField = screen.getByLabelText("Endereço");
      const responsibleTeacherField = screen.getByLabelText(
        "Nome do tutor responsável"
      );
      const phoneResponsibleTeacherField = screen.getByLabelText(
        "Telefone do tutor responsável"
      );
      const shiftField = screen.getByTestId("shift-select");
      //assert
      expect(fullNameField).toBeInTheDocument();
      expect(dataNascimentoField).toBeInTheDocument();
      expect(addressField).toBeInTheDocument();
      expect(responsibleTeacherField).toBeInTheDocument();
      expect(phoneResponsibleTeacherField).toBeInTheDocument();
      expect(shiftField).toBeInTheDocument();
    });
      
  });