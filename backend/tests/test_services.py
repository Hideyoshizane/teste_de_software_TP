"""Testes unitários para os serviços do domínio"""

import pytest
from datetime import datetime

import sys
sys.path.append('../')
print(sys.path)
from backend.tests.database_mock import (
    AlunoRepositoryPostgresMock, ProfessorRepositoryPostgresMock,
    PeriodoLetivoRepositoryPostgresMock
)
from backend.core.domain.services import (
    AlunoService, ProfessorService, PeriodoLetivoService
)

class TestAlunoService():
    """Unit tests for AlunoService. To enable the tests,
    a mock repository is used.
    """

    @pytest.fixture()
    def setup(self):
        aluno_repository = AlunoRepositoryPostgresMock()
        aluno_service = AlunoService(aluno_repository)
        return aluno_service


    def test_create_aluno(self, setup):
        name = "John Doe"
        born_date = datetime.strptime("2000-01-01", "%Y-%m-%d").date()
        address = "123 Main St"
        tutor_name = "Jane Doe"
        tutor_phone = "555-555-5555"
        class_shift = "morning"

        result = setup.create_aluno(name, born_date, address, tutor_name,
                                    tutor_phone, class_shift)

        assert result.name == name
        assert result.born_date == born_date
        assert result.address == address
        assert result.tutor_name == tutor_name
        assert result.tutor_phone == tutor_phone
        assert result.class_shift == class_shift


    def test_update_aluno(self, setup):
        name = "Joao Pedro"
        born_date = datetime.strptime("2000-01-01", "%Y-%m-%d").date()
        address = "123 Main St"
        tutor_name = "Maria Joaquina"
        tutor_phone = "666-333333333"
        class_shift = "morning"

        result = setup.update_aluno(1, name, born_date, address, tutor_name,
                                    tutor_phone, class_shift)

        assert result.name == name
        assert result.born_date == born_date
        assert result.address == address
        assert result.tutor_name == tutor_name
        assert result.tutor_phone == tutor_phone
        assert result.class_shift == class_shift

    def test_remove_aluno(self, setup):
        result = setup.remove_aluno(1)
        assert result == "Removed successfully"

    def test_update_aluno_name(self, setup):
        new_name = "Joao Henrique"
        result = setup.update_aluno(1, name=new_name)
        assert result.name == new_name

    def test_update_aluno_address(self, setup):
        new_address = "Lugar algum"
        result = setup.update_aluno(1, address=new_address)
        assert result.address == new_address

    def test_update_aluno_tutor_name(self, setup):
        new_tutor_name = "Maria Joaquina"
        result = setup.update_aluno(1, tutor_name=new_tutor_name)
        assert result.tutor_name == new_tutor_name

    def test_update_aluno_tutor_phone(self, setup):
        new_tutor_phone = "3188888888"
        result = setup.update_aluno(1, tutor_phone=new_tutor_phone)
        assert result.tutor_phone == new_tutor_phone

    def test_update_aluno_class_shift(self, setup):
        new_class_shift = "afternoon"
        result = setup.update_aluno(1, class_shift=new_class_shift)
        assert result.class_shift == new_class_shift

    def test_get_aluno_by_name(self, setup):
        result = setup.get_alunos_by_name("Joao")
        assert result['Aluno'][0]['name'] == "Joao"

    def test_get_another_aluno_by_name(self, setup):
        result = setup.get_alunos_by_name("Maria")
        assert result['Aluno'][0]['name'] == "Maria"

    def test_get_all_alunos(self, setup):
        result = setup.get_all_alunos()
        assert len(result['Aluno']) == 2

    def test_add_another_aluno_and_get_all_alunos(self, setup):
        setup.create_aluno("Joao", datetime.strptime("2000-01-01",
                                                     "%Y-%m-%d").date(),
                           "123 Main St", "Maria Joaquina", "3188888888",
                           "afternoon")
        result = setup.get_all_alunos()
        assert len(result['Aluno']) == 3

    def test_get_alunos_paginated(self, setup):
        result = setup.get_alunos_paginated(0, 2, 'Joao')
        assert result['Aluno'][0]['name'] == "Joao"


class TestProfessorService():
    """Unit tests for ProfessorService. To enable the tests,
    a mock repository is used."""

    @pytest.fixture()
    def setup(self):
        professor_repository = ProfessorRepositoryPostgresMock()
        professor_service = ProfessorService(professor_repository)
        return professor_service


    def test_create_professor(self, setup):
        name = "Jose"
        email = 'jose@email.com'
        password = '1234'

        result = setup.create_professor(name, email, password)

        assert result.name == name
        assert result.email == email
        assert result.password == password

    def test_update_professor(self, setup):
        new_password = '4321'
        new_email = "maria@mail.com"
        new_name = 'Maria Joaquina'
        result = setup.update_professor(1, name=new_name, email=new_email,
                                        password=new_password)

        assert result.name == new_name
        assert result.email == new_email
        assert result.password == new_password

    def test_remove_professor(self, setup):
        result = setup.remove_professor(1)
        assert result is None

    def test_update_professor_name(self, setup):
        new_name = "Maria Joaquina"
        result = setup.update_professor(1, name=new_name)
        assert result.name == new_name

    def test_update_aluno_password(self, setup):
        new_password = "4321"
        result = setup.update_professor(1, password=new_password)
        assert result.password == new_password

    def test_update_professor_email(self, setup):
        new_email = "maria@mail.com"
        result = setup.update_professor(1, email=new_email)
        assert result.email == new_email

    def test_professor_login_success(self, setup):
        email = 'maria@professora.com'
        password = '1234'
        result = setup.login(email=email, password=password)
        assert result == True

    def test_professor_login_fail_password(self, setup):
        email = 'maria@professora.com'
        password = '123'
        result = setup.login(email=email, password=password)
        assert result == False

    def test_professor_login_fail_email(self, setup):
        email = 'maria@prof.com'
        password = '1234'
        result = setup.login(email=email, password=password)
        print(result)
        assert result == False

    def test_professor_login_fail_email_empty(self, setup):
        email = ''
        password = '1234'
        result = setup.login(email=email, password=password)
        print(result)
        assert result == False

    def test_professor_login_fail_password_empty(self, setup):
        email = 'maria@professora.com'
        password = ''
        result = setup.login(email=email, password=password)
        print(result)
        assert result == False


class TestPeriodoLetivoService():
    """Unit tests for PeriodoLetivoService. To enable the tests,
    a mock repository is used."""

    @pytest.fixture()
    def setup(self):
        periodo_letivo_repository = PeriodoLetivoRepositoryPostgresMock()
        periodo_letivo_service = PeriodoLetivoService(periodo_letivo_repository)
        return periodo_letivo_service

    def test_create_periodo_letivo(self, setup):
        class_shift = "Morning"
        start_date = datetime.strptime("2024-01-01", "%Y-%m-%d").date()
        end_date = datetime.strptime("2024-06-01", "%Y-%m-%d").date()
        result = setup.create_periodo_letivo(start_date, end_date, class_shift)

        assert result.start_date == start_date
        assert result.end_date == end_date
        assert result.class_shift == class_shift

    def test_update_periodo_letivo(self, setup):
        new_class_shift = "Afternoon"
        new_start_date = datetime.strptime("2024-01-01", "%Y-%m-%d").date()
        new_end_date = datetime.strptime("2024-06-01", "%Y-%m-%d").date()
        result = setup.update_periodo_letivo(1, new_start_date, new_end_date,
                                             new_class_shift)

        assert result.start_date == new_start_date
        assert result.end_date == new_end_date
        assert result.class_shift == new_class_shift

    def test_remove_periodo_letivo(self, setup):
        result = setup.remove_periodo_letivo(1)
        assert result == "Removed successfully"

    def test_update_start_date(self, setup):
        new_start_date = datetime.strptime("2024-01-01", "%Y-%m-%d").date()
        result = setup.update_periodo_letivo(1, new_start_date)
        assert result.start_date == new_start_date

    def test_update_end_date(self, setup):
        new_end_date = datetime.strptime("2024-06-01", "%Y-%m-%d").date()
        result = setup.update_periodo_letivo(1, end_date=new_end_date)
        assert result.end_date == new_end_date

    def test_update_class_shift(self, setup):
        new_class_shift = "Afternoon"
        result = setup.update_periodo_letivo(1, class_shift=new_class_shift)
        assert result.class_shift == new_class_shift

    def test_update_same_class_shift(self, setup):
        new_class_shift = "Morning"
        result = setup.update_periodo_letivo(1, class_shift=new_class_shift)
        assert result.class_shift == new_class_shift

    def test_get_all_periodo_letivo(self, setup):
        result = setup.get_all_periodos_letivos()
        assert len(result['PeriodoLetivo']) == 2

    def test_add_another_periodo_letivo_and_get_all_periodo_letivo(self, setup):
        class_shift = "Afternoon"
        start_date = datetime.strptime("2024-01-01", "%Y-%m-%d").date()
        end_date = datetime.strptime("2024-06-01", "%Y-%m-%d").date()
        setup.create_periodo_letivo(start_date, end_date, class_shift)

        result = setup.get_all_periodos_letivos()

        assert len(result['PeriodoLetivo']) == 3

    def test_add_a_periodo_letivo_and_get_all_periodo_letivo(self, setup):
        class_shift = "Afternoon"
        start_date = datetime.strptime("2024-01-01", "%Y-%m-%d").date()
        end_date = datetime.strptime("2024-06-01", "%Y-%m-%d").date()
        setup.create_periodo_letivo(start_date, end_date, class_shift)

        result = setup.get_all_periodos_letivos()

        assert len(result['PeriodoLetivo']) == 3