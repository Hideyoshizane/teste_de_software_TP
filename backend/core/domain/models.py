"""Domain models for the school management system. It follows hexagonal
architecture principles."""

from dataclasses import dataclass
from datetime import date


@dataclass
class Aluno:
    """Aluno model class for domain layer."""
    id: int | None
    name: str
    born_date: date
    address: str
    tutor_name: str
    tutor_phone: str
    class_shift: str


@dataclass
class Presenca:
    """Presenca model class for domain layer."""
    id: int | None
    aluno_id: int
    status: str
    document: str
    reason_missing_class: str


@dataclass
class Professor:
    """Professor model class for domain layer."""
    id: int | None
    name: str
    email: str # must be unique
    password: str

@dataclass
class PeriodoLetivo:
    """PeriodoLetivo model class for domain layer."""
    id: int | None
    start_date: date
    end_date: date
    class_shift: str

@dataclass
class DiaSemAula:
    """DiaSemAula model class for domain layer."""
    id: int | None
    periodo_letivo_id: int
    date: date
    reason: str