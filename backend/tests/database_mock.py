from datetime import datetime

from backend.core.interfaces.repositories import(
    ProfessorRepository, AlunoRepository, PeriodoLetivoRepository,
    DiaSemAulaRepository
    )
from backend.core.domain.models import (
    Aluno, Professor, PeriodoLetivo, DiaSemAula
)

class AlunoRepositoryPostgresMock(AlunoRepository):
    """Mock repository for AlunoRepository. This class is used to
    test the AlunoService class.
    """
    def __init__(self):
        """Initializes the mock database with some data. Note that the
        database here is just a list of Aluno objects.
        """
        self.database = [
            Aluno(1, 'Joao', datetime.strptime("2001-01-01", "%Y-%m-%d").date(),
                  'Algum lugar', 'Maria', '3199999999', 'morning'),
            Aluno(2, 'Maria', datetime.strptime("2001-01-02", "%Y-%m-%d").date(),
                  'Lugar algum', 'Maria', '3199999998', 'morning'),
            ]

    def save(self, aluno: Aluno) -> Aluno | str:
        """Saves an Aluno object to the database. If the save fails, an error
        message is returned.\\"""

        # Verify if the aluno already exists
        if aluno.id is None:
            aluno.id = len(self.database) + 1
            self.database.append(aluno)
            return aluno

        for aluno_database in self.database:
            if aluno_database.id == aluno.id:
                aluno_database = aluno
                return aluno


    def get_by_id(self, aluno_id: int) -> Aluno | str:
        for aluno in self.database:
            if aluno.id == aluno_id:
                return aluno
        return f"Aluno with ID {aluno_id} not found"


    def delete(self, aluno_id: int) -> str:
        for aluno_database in self.database:
            if aluno_database.id == aluno_id:
                self.database.remove(aluno_database)
        return "Removed successfully"


    def get_by_name(self, aluno_name: str) -> list[Aluno]:
        results = []
        for aluno in self.database:
            if aluno.name == aluno_name:
                results.append(aluno)
        return results


    def get_all_alunos(self) -> list[Aluno]:
        return self.database


    def get_alunos_paginated(self, offset, limit, name_like) -> list[Aluno]:
        results = []
        for aluno in self.database:
            if name_like in aluno.name:
                results.append(aluno)
        return results[offset:offset+limit]


class ProfessorRepositoryPostgresMock(ProfessorRepository):
    """Mock repository for ProfessorRepository. This class is used to
    test the ProfessorService class.
    """
    def __init__(self):
        """Initializes the mock database with some data. Note that the
        database here is just a list of Professor objects.
        """
        self.database = [Professor(1, 'Maria', 'maria@professora.com', '1234')]

    def verify_login(self, email, password) -> bool:
        for professor_database in self.database:
            if email == professor_database.email and password == professor_database.password:
                return True
        return False

    def save(self, professor: Professor) -> Professor | str:
        """Saves an Professor object to the database. If the save fails, an error
        message is returned.\\"""

        # Verify if the professor already exists
        if professor.id is None:
            professor.id = len(self.database) + 1
            self.database.append(professor)
            return professor

        for professor_database in self.database:
            if professor_database.id == professor.id:
                professor_database = professor
                return professor


    def get_by_id(self, professor_id: int) -> Professor | str:
        for professor in self.database:
            if professor.id == professor_id:
                return professor
        return f"Professor with ID {professor_id} not found"

    def login(self, email, password):
        for professor in self.database:
            if professor.email == email and professor.password == password:
                return True
        return False

    def delete(self, professor_id: int) -> str:
        for professor_database in self.database:
            if professor_database.id == professor_id:
                self.database.remove(professor_database)
        return "Removed successfully"

    def get_by_name(self, professor_name: str) -> list[Professor]:
        results = []
        for professor in self.database:
            if professor.name == professor_name:
                results.append(professor)
        return results


class PeriodoLetivoRepositoryPostgresMock(PeriodoLetivoRepository):
    """Mock repository for PeriodoLetivoRepository. This class is used to
    test the PeriodoLetivoService class.
    """
    def __init__(self):
        """Initializes the mock database with some data. Note that the
        database here is just a list of PeriodoLetivo objects.
        """
        self.database = [
            PeriodoLetivo(1, datetime.strptime("2023-01-01", "%Y-%m-%d").date(),
                          datetime.strptime("2023-06-30", "%Y-%m-%d").date(),
                          'Morning'),
            PeriodoLetivo(2, datetime.strptime("2023-07-01", "%Y-%m-%d").date(),
                          datetime.strptime("2023-12-31", "%Y-%m-%d").date(),
                          'Afternoon')
            ]

    def save(self, periodo_letivo: PeriodoLetivo) -> PeriodoLetivo | str:
        # Verify if the periodo_letivo already exists
        if periodo_letivo.id is None:
            periodo_letivo.id = len(self.database) + 1
            self.database.append(periodo_letivo)
            return periodo_letivo

        for periodo_letivo_database in self.database:
            if periodo_letivo_database.id == periodo_letivo.id:
                periodo_letivo_database = periodo_letivo
                return periodo_letivo


    def get_by_id(self, periodo_letivo_id: int) -> PeriodoLetivo | str:
        for periodo_letivo in self.database:
            if periodo_letivo.id == periodo_letivo_id:
                return periodo_letivo
        return f"PeriodoLetivo with ID {periodo_letivo_id} not found"


    def delete(self, periodo_letivo: int) -> str:
        for periodo_letivo_database in self.database:
            if periodo_letivo_database.id == periodo_letivo:
                self.database.remove(periodo_letivo_database)
        return "Removed successfully"

    def get_all_periodos_letivos(self) -> list[PeriodoLetivo]:
        return self.database


class DiaSemAulaRepositoryPostgresMock(DiaSemAulaRepository):
    """Mock repository for DiaSemAulaRepository. This class is used to
    test the DiaSemAulaService class.
    """
    def __init__(self):
        """Initializes the mock database with some data. Note that the
        database here is just a list of DiaSemAula objects.
        """
        self.database = [
            DiaSemAula(1, 1, datetime.strptime("2024-01-01", "%Y-%m-%d").date(),
                       'Holiday'),
            DiaSemAula(2, 1, datetime.strptime("2024-04-01", "%Y-%m-%d").date(),
                       'Holiday')
            ]

    def save(self, dia_sem_aula: DiaSemAula) -> DiaSemAula | str:
        # Verify if the dia_sem_aula already exists
        if dia_sem_aula.id is None:
            dia_sem_aula.id = len(self.database) + 1
            self.database.append(dia_sem_aula)
            return dia_sem_aula

        for dia_sem_aula_database in self.database:
            if dia_sem_aula_database.id == dia_sem_aula.id:
                dia_sem_aula_database = dia_sem_aula
                return dia_sem_aula


    def get_by_id(self, dia_sem_aula_id: int) -> DiaSemAula | str:
        for dia_sem_aula in self.database:
            if dia_sem_aula.id == dia_sem_aula_id:
                return dia_sem_aula
        return f"DiaSemAula with ID {dia_sem_aula_id} not found"


    def delete(self, dia_sem_aula: int) -> str:
        for dia_sem_aula_database in self.database:
            if dia_sem_aula_database.id == dia_sem_aula:
                self.database.remove(dia_sem_aula_database)
        return "Removed successfully"

    def get_all_dias_sem_aula(self) -> list[DiaSemAula]:
        return self.database
