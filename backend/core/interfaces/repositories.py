"""Repository interface for domain layer.

- A Interface define as operações que o domínio precisa.
- A implementação das operações é feita fora, no adaptador.
- Domínio está desacoplado de qualquer implementação específica
"""

from abc import ABC, abstractmethod
from backend.core.domain.models import (
    Aluno, Professor, PeriodoLetivo, DiaSemAula
)


class ProfessorRepository(ABC):
    """Professor repository interface for domain layer. It defines the methods
    for veryfing professor login credentials."""

    @abstractmethod
    def verify_login(self, professor_email: str, professor_password: str) -> bool | str:
        """Verifies professor login credentials."""
        pass

    @abstractmethod
    def save(self, professor: Professor) -> Professor:
        """Saves a Professor object to the repository."""
        pass

    @abstractmethod
    def delete(self, professor: Professor) -> None:
        """Deletes a Professor object from the repository."""
        pass

    @abstractmethod
    def get_by_id(self, professor_id: int) -> Professor:
        """Retrieves a Professor object from the repository by its ID."""
        pass

    @abstractmethod
    def get_by_name(self, professor_name: str) -> Professor:
        """Retrieves a Professor object from the repository by its name."""
        pass


class AlunoRepository(ABC):
    """Aluno repository interface for domain layer. It defines the methods
    for saving, retrieving, and deleting Aluno objects."""

    @abstractmethod
    def save(self, aluno: Aluno) -> Aluno:
        """Saves an Aluno object to the repository."""
        pass

    @abstractmethod
    def get_by_id(self, aluno_id: int) -> Aluno:
        """Retrieves an Aluno object from the repository by its ID."""
        pass

    @abstractmethod
    def delete(self, aluno: Aluno) -> None:
        """Deletes an Aluno object from the repository."""
        pass

    @abstractmethod
    def get_by_name(self, aluno_name: str) -> list[Aluno]:
        """Retrieves an Aluno object from the repository by its name."""
        pass

    @abstractmethod
    def get_all_alunos(self) -> list[Aluno]:
        """Retrieves all Aluno objects from the repository."""
        pass

    @abstractmethod
    def get_alunos_paginated(self, offset, limit, name_like) -> list[Aluno]:
        """Retrieves a paginated list of Aluno objects from the repository."""
        pass


class PeriodoLetivoRepository(ABC):
    """PeriodoLetivo repository interface for domain layer. It defines the methods
    for saving, retrieving, and deleting PeriodoLetivo objects."""

    @abstractmethod
    def save(self, periodo_letivo) -> PeriodoLetivo:
        """Saves a PeriodoLetivo object to the repository."""
        pass

    @abstractmethod
    def get_by_id(self, periodo_letivo_id: int) -> PeriodoLetivo | str:
        """Retrieves a PeriodoLetivo object from the repository by its ID."""
        pass

    @abstractmethod
    def delete(self, periodo_letivo) -> None:
        """Deletes a PeriodoLetivo object from the repository."""
        pass

    @abstractmethod
    def get_all_periodos_letivos(self) -> list[PeriodoLetivo]:
        """Retrieves all PeriodoLetivo objects from the repository."""
        pass


class DiaSemAulaRepository(ABC):
    """DiaSemAula repository interface for domain layer. It defines the methods
    for saving, retrieving, and deleting DiaSemAula objects."""

    @abstractmethod
    def save(self, dia_sem_aula):
        """Saves a DiaSemAula object to the repository."""
        pass

    @abstractmethod
    def get_by_id(self, dia_sem_aula_id: int) -> DiaSemAula:
        """Retrieves a DiaSemAula object from the repository by its ID."""
        pass

    @abstractmethod
    def delete(self, dia_sem_aula):
        """Deletes a DiaSemAula object from the repository."""
        pass

    @abstractmethod
    def get_all_dias_sem_aula(self) -> list[DiaSemAula]:
        """Retrieves all DiaSemAula objects from the repository."""
        pass