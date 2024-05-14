"""Tests for the controller module."""

import pytest

from backend.adapters.controllers.controller import (
    AlunoController, ProfessorController, PeriodoLetivoController,
    DiaSemAulaController
)


class TestAlunoController:
    """Tests for the AlunoController class."""

    @pytest.fixture()
    def setup(self):
        """Sets up the test fixture."""
        controller = AlunoController()
        return controller

    def test_create_aluno(self, setup):
        """Tests create_aluno() of the AlunoController class."""
        result = setup.create('John', '2000-01-01', 'Rua 1', 'John Doe',
                                   '12345678', 'Manhã')
        assert result is not False

    def test_update_aluno(self, setup):
        """Tests update_aluno() of the AlunoController class."""
        result = setup.update(1, 'John', '2000-01-01', 'Rua 1', 'John Doe',
                                   '12345678', 'Manhã')
        assert result is not False

    def test_remove_aluno(self, setup):
        """Tests remove_aluno() of the AlunoController class."""
        result = setup.remove(1)
        assert result is not False

    def test_get_aluno_by_name(self, setup):
        """Tests get_alunos_by_name() of the AlunoController class."""
        result = setup.get_alunos_by_name('Ana Paula Souza')
        assert result['Aluno'][0]['name'] == "Ana Paula Souza"

    def test_get_another_aluno_by_name(self, setup):
        """Tests get_alunos_by_name() of the AlunoController class."""
        result = setup.get_alunos_by_name('Gustavo Lima')
        assert result['Aluno'][0]['name'] == "Gustavo Lima"

    def test_get_one_more_aluno_by_name(self, setup):
        """Tests get_alunos_by_name() of the AlunoController class."""
        result = setup.get_alunos_by_name('Mariana Santos')
        assert result['Aluno'][0]['name'] == "Mariana Santos"

    def test_get_alunos_paginated(self, setup):
        """Tests get_alunos_paginated() of the AlunoController class."""
        result = setup.get_alunos_paginated(0, 5, 'Ana')
        assert result['Aluno'][0]['name'] == "Ana Paula Souza"

    def test_get_another_alunos_paginated(self, setup):
        """Tests get_alunos_paginated() of the AlunoController class."""
        result = setup.get_alunos_paginated(0, 5, 'Mariana')
        assert result['Aluno'][0]['name'] == "Mariana Santos"

class TestProfessorController:
    """Tests for the ProfessorController class."""

    @pytest.fixture()
    def setup(self):
        """Sets up the test fixture."""
        controller = ProfessorController()
        return controller

    def test_create_professor(self, setup):
        """Tests create_professor() of the ProfessorController class."""
        result = setup.create('John', 'professor@gmail.com', '12345678')
        assert result is not False

    def test_professor_can_login(self, setup):
        """Tests professor_can_login() of the ProfessorController class."""
        result = setup.login('professor@gmail.com', '12345678')
        assert result is not False

    def test_professor_cannot_login(self, setup):
        """Tests professor_cannot_login() of the ProfessorController class."""
        result = setup.login('professor@hotmail.com', '12345678')
        assert result is False

    def test_update_professor(self, setup):
        """Tests update_professor() of the ProfessorController class."""
        result = setup.update(2, 'Johny')
        assert result is not False

    def test_remove_professor(self, setup):
        """Tests remove_professor() of the ProfessorController class."""
        result = setup.remove(2)
        assert result is not False

    # def test_get_professors_by_name(self, setup):
    #     """Tests get_professors_by_name() of the ProfessorController class."""
    #     result = setup.get_professor_by_name('William')
    #     assert result['Professor'][0]['name'] == "William"


class TestPeriodoLetivoController:
    """Tests for the PeriodoLetivoController class."""

    @pytest.fixture()
    def setup(self):
        """Sets up the test fixture."""
        controller = PeriodoLetivoController()
        return controller

    def test_create_periodo_letivo(self, setup):
        """Tests create_periodo_letivo() of the PeriodoLetivoController class."""
        result = setup.create('2019-01-01', '2019-06-30', 'Afternoon')
        assert result is not False

    def create_another_periodo_letivo(self, setup):
        """Tests create_periodo_letivo() of the PeriodoLetivoController class."""
        result = setup.create('2019-07-01', '2019-12-31', 'Morning')
        assert result is not False

    def test_update_periodo_letivo(self, setup):
        """Tests update_periodo_letivo() of the PeriodoLetivoController class."""
        result = setup.update(1, '2019-01-01', '2019-06-30')
        assert result is not False

    def test_remove_periodo_letivo(self, setup):
        """Tests remove_periodo_letivo() of the PeriodoLetivoController class."""
        result = setup.remove(1)
        assert result is not False


class TestDiaSemAula:
    """Tests for the DiaSemAula class."""

    @pytest.fixture()
    def setup(self):
        """Sets up the test fixture."""
        controller = DiaSemAulaController()
        return controller

    def test_create_dia_sem_aula(self, setup):
        """Tests create_dia_sem_aula() of the DiaSemAulaController class."""
        result = setup.create('2019-01-01', '2019-06-30', 'Holiday')
        assert result is not False

    def create_another_dia_sem_aula(self, setup):
        """Tests create_dia_sem_aula() of the DiaSemAulaController class."""
        result = setup.create('2019-07-01', '2019-12-31', 'Holiday')
        assert result is not False

    def test_update_dia_sem_aula(self, setup):
        """Tests update_dia_sem_aula() of the DiaSemAulaController class."""
        result = setup.update(1, '2019-01-01', '2019-06-30')
        assert result is not False

    def test_remove_dia_sem_aula(self, setup):
        """Tests remove_dia_sem_aula() of the DiaSemAulaController class."""
        result = setup.remove(1)
        assert result is not False
