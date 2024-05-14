"""Domain layer services module. It follows hexagonal architecture principles.

- O serviço está desacoplado de qualquer implementação específica,
  tal como DB ou ORM
"""

from backend.core.domain.models import Aluno, Professor, PeriodoLetivo, DiaSemAula
from backend.core.interfaces.repositories import (
    AlunoRepository, PeriodoLetivoRepository, DiaSemAulaRepository
)


class ProfessorService:
    """Professor service class for domain layer. It provides methods for
    verifying professor login credentials. It takes a professor_repository
    object as a dependency."""

    def __init__(self, professor_repository):
        """Initializes the service with a ProfessorRepository object."""
        self.professor_repository = professor_repository

    def login(self, email, password):
        """Verifies professor login credentials."""
        login = self.professor_repository.verify_login(email, password)
        return login

    def create_professor(self, name, email, password):
        """Creates a new Professor object and saves it to the repository.
        When creating a new Professor object, the ID does not need to be
        provided, as it is generated automatically by the repository."""
        professor = Professor(
            id=None,
            name=name,
            email=email,
            password=password
        )
        self.professor_repository.save(professor)
        if professor is not None:
            return professor
        return False

    def update_professor(self, professor_id, name=None, email=None,
                        password=None):
        """Updates an existing Professor object and saves it to the repository."""
        professor = self.professor_repository.get_by_id(professor_id)
        if isinstance(professor, str): # if professor is not found
            return professor

        if name is not None:
            professor.name = name
        if email is not None:
            professor.email = email
        if password is not None:
            professor.password = password
        professor_result = self.professor_repository.save(professor)
        if isinstance(professor_result, str): # if professor is not updated
            return professor_result
        return professor_result

    def remove_professor(self, professor_id):
        """Removes an existing Professor object from the repository."""
        professor = self.professor_repository.get_by_id(professor_id)
        self.professor_repository.delete(professor)

    def get_professor_by_name(self, professor_name):
        """Retrieves an existing Professor object from the repository."""
        professors = self.professor_repository.get_by_name(professor_name)

        # get all professors and change it to a dictionary of professors
        professor_dict = {'Professor': []} # {'Professor': [{'id': 1, name: 'joao',...}, professor2, ...]}
        for professor in professors:
            professor_dict['Professor'].append(professor.__dict__)

        return professor_dict


class AlunoService:
    """Aluno service class for domain layer. It provides methods for
    creating, updating, and removing Aluno objects. It takes an
    aluno_repository object as a dependency."""

    def __init__(self, aluno_repository: AlunoRepository):
        """Initializes the service with an AlunoRepository object."""
        self.aluno_repository = aluno_repository

    def create_aluno(self, name, born_date, address, tutor_name,
                    tutor_phone, class_shift):
        """Creates a new Aluno object and saves it to the repository.
        When creating a new Aluno object, the ID does not need to be
        specified, since it is generated automatically by the database.
        """
        aluno = Aluno(
            id=None,
            name=name,
            born_date=born_date,
            address=address,
            tutor_name=tutor_name,
            tutor_phone=tutor_phone,
            class_shift=class_shift
        )
        aluno_result = self.aluno_repository.save(aluno)
        print("\n\nopa\n\n", flush=True)
        if isinstance(aluno_result, str): # if aluno is not created
            return aluno_result
        return aluno_result


    def update_aluno(self, aluno_id, name=None, born_date=None,
                        address=None, tutor_name=None, tutor_phone=None,
                        class_shift=None):
        """Updates an existing Aluno object and saves it to the repository."""
        aluno = self.aluno_repository.get_by_id(aluno_id)
        if isinstance(aluno, str): # if aluno is not found
            return aluno

        if name is not None:
            aluno.name = name
        if born_date is not None:
            aluno.born_date = born_date
        if address is not None:
            aluno.address = address
        if tutor_name is not None:
            aluno.tutor_name = tutor_name
        if tutor_phone is not None:
            aluno.tutor_phone = tutor_phone
        if class_shift is not None:
            aluno.class_shift = class_shift
        aluno_result = self.aluno_repository.save(aluno)
        if isinstance(aluno_result, str): # if aluno is not updated
            return aluno_result
        return aluno_result


    def remove_aluno(self, aluno_id):
        """Removes an existing Aluno object from the repository."""
        aluno = self.aluno_repository.get_by_id(aluno_id)
        message = self.aluno_repository.delete(aluno)
        return message


    def get_alunos_by_name(self, aluno_name: str) -> dict:
        """Retrieves one or more existing Aluno object from the repository.
        Returns a dictionary of alunos, where every aluno object is a
        dictionary itself.\\
        Args:
            aluno_name (str): The name of the aluno to be retrieved.
        Returns:
            alunos_dict (dict): A dictionary of alunos.
        """
        alunos = self.aluno_repository.get_by_name(aluno_name)

        # get all alunos and change it to a dictionary of alunos
        alunos_dict = {'Aluno': []} # {'Aluno': [{'id': 1, name: 'joao',...}, aluno2, ...]}
        for aluno in alunos:
            alunos_dict['Aluno'].append(aluno.__dict__)

        return alunos_dict

    def get_all_alunos(self) -> dict:
        """Retrieves all existing Aluno objects from the repository.
        Returns a dictionary of alunos, where every aluno object is a
        dictionary itself.\\
        Returns:
            alunos_dict (dict): A dictionary of alunos.
        """
        alunos = self.aluno_repository.get_all_alunos()

        # get all alunos and change it to a dictionary of alunos
        alunos_dict = {'Aluno': []}
        for aluno in alunos:
            alunos_dict['Aluno'].append(aluno.__dict__)

        return alunos_dict

    def get_alunos_paginated(self, offset, limit, name_like):
        """Retrieves a paginated list of existing Aluno objects from the
        repository. Returns a dictionary of alunos, where every aluno object
        is a dictionary itself.\\
        Args:
            offset (int): The offset of the query.
            limit (int): The limit of the query.
            name_like (str): A string to be used in the query to search for
                alunos with a similar name.
        Returns:
            alunos_dict (dict): A dictionary of alunos.
        """
        alunos = self.aluno_repository.get_alunos_paginated(offset, limit, name_like)

        # get all alunos and change it to a dictionary of alunos
        alunos_dict = {'Aluno': []}
        if alunos is not None:
            for aluno in alunos:
                alunos_dict['Aluno'].append(aluno.__dict__)

        return alunos_dict


class PeriodoLetivoService:
    """PeriodoLetivo service class for domain layer. It provides methods for
    creating, updating, and removing PeriodoLetivo objects. It takes an
    periodo_letivo_repository object as a dependency."""

    def __init__(self, periodo_letivo_repository: PeriodoLetivoRepository):
        """Initializes the service with an PeriodoLetivoRepository object."""
        self.periodo_letivo_repository = periodo_letivo_repository

    def create_periodo_letivo(self, start_date, end_date, class_shift):
        """Creates a new PeriodoLetivo object and saves it to the repository.
        When creating a new PeriodoLetivo object, the ID does not need to be
        specified, since it is generated automatically by the database.
        """
        periodo_letivo = PeriodoLetivo(
            id=None,
            start_date=start_date,
            end_date=end_date,
            class_shift=class_shift
        )
        periodo_letivo = self.periodo_letivo_repository.save(periodo_letivo)
        if isinstance(periodo_letivo, str): # if periodo_letivo is not found
            return periodo_letivo
        return periodo_letivo


    def update_periodo_letivo(self, periodo_letivo_id, start_date=None,
                              end_date=None, class_shift=None):
        """Updates an existing PeriodoLetivo object and saves it to the repository."""
        periodo_letivo = self.periodo_letivo_repository.get_by_id(periodo_letivo_id)
        if isinstance(periodo_letivo, str): # if periodo_letivo is not found
            return periodo_letivo

        if start_date is not None:
            periodo_letivo.start_date = start_date
        if end_date is not None:
            periodo_letivo.end_date = end_date
        if class_shift is not None:
            periodo_letivo.class_shift = class_shift
        self.periodo_letivo_repository.save(periodo_letivo)
        return periodo_letivo


    def remove_periodo_letivo(self, periodo_letivo_id):
        """Removes an existing PeriodoLetivo object from the repository."""
        periodo_letivo = self.periodo_letivo_repository.get_by_id(periodo_letivo_id)
        message = self.periodo_letivo_repository.delete(periodo_letivo)
        return message


    def get_all_periodos_letivos(self) -> dict:
        """Retrieves all existing PeriodoLetivo objects from the repository.
        Returns a dictionary of periodos_letivos, where every periodo_letivo object is a
        dictionary itself.\\
        Returns:
            periodos_letivos_dict (dict): A dictionary of periodos_letivos.
        """
        periodos_letivos = self.periodo_letivo_repository.get_all_periodos_letivos()

        # get all periodos_letivos and change it to a dictionary of periodos_letivos
        periodos_letivos_dict = {'PeriodoLetivo': []}
        for periodo_letivo in periodos_letivos:
            periodos_letivos_dict['PeriodoLetivo'].append(periodo_letivo.__dict__)

        return periodos_letivos_dict


class DiaSemAulaService:
    def __init__(self, dia_sem_aula_repository: DiaSemAulaRepository):
        self.dia_sem_aula_repository = dia_sem_aula_repository

    def create_dia_sem_aula(self, periodo_letivo_id, date, reason):
        """Creates a new DiaSemAula object and saves it to the repository.
        When creating a new DiaSemAula object, the ID does not need to be
        specified, since it is generated automatically by the database.
        """
        dia_sem_aula = DiaSemAula(
            id=None,
            periodo_letivo_id=periodo_letivo_id,
            date=date,
            reason=reason
        )
        dia_sem_aula = self.dia_sem_aula_repository.save(dia_sem_aula)
        if isinstance(dia_sem_aula, str):
            return dia_sem_aula
        return dia_sem_aula


    def update_dia_sem_aula(self, dia_sem_aula_id, date=None, reason=None):
        """Updates an existing DiaSemAula object and saves it to the repository."""
        dia_sem_aula = self.dia_sem_aula_repository.get_by_id(dia_sem_aula_id)
        if isinstance(dia_sem_aula, str):
            return dia_sem_aula

        if date is not None:
            dia_sem_aula.date = date
        if reason is not None:
            dia_sem_aula.reason = reason
        self.dia_sem_aula_repository.save(dia_sem_aula)
        return dia_sem_aula


    def remove_dia_sem_aula(self, dia_sem_aula_id):
        """Removes an existing DiaSemAula object from the repository."""
        dia_sem_aula = self.dia_sem_aula_repository.get_by_id(dia_sem_aula_id)
        message = self.dia_sem_aula_repository.delete(dia_sem_aula)
        return message


    def get_all_dias_sem_aula(self) -> dict:
        """Retrieves all existing DiaSemAula objects from the repository."""
        dias_sem_aula = self.dia_sem_aula_repository.get_all_dias_sem_aula()

        dias_sem_aula_dict = {'DiaSemAula': []}
        for dia in dias_sem_aula:
            dias_sem_aula_dict['DiaSemAula'].append(dia.__dict__)

        return dias_sem_aula_dict