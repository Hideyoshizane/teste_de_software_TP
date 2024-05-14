"""Tests for the controller module."""

import pytest

from backend.adapters.controllers.controller import (
    AlunoController, ProfessorController
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

    def test_get_alunos_by_name(self, setup):
        """Tests get_alunos_by_name() of the AlunoController class."""
        result = setup.get_alunos_by_name('John')
        assert isinstance(result, list)


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
        result = setup.professor.login('professor@gmail.com', '12345678')
        assert result is not False

    def test_professor_cannot_login(self, setup):
        """Tests professor_cannot_login() of the ProfessorController class."""
        result = setup.professor.login('professor@hotmail.com', '12345678')
        assert result is False

    def test_update_professor(self, setup):
        """Tests update_professor() of the ProfessorController class."""
        result = setup.update(1, 'John')
        assert result is not False

    def test_remove_professor(self, setup):
        """Tests remove_professor() of the ProfessorController class."""
        result = setup.remove(1)
        assert result is not False

    def test_get_professors_by_name(self, setup):
        """Tests get_professors_by_name() of the ProfessorController class."""
        result = setup.get_professors_by_name('John')
        assert isinstance(result, list)
