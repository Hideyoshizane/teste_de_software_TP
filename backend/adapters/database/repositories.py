"""Database repositories module.

- Implementa as operações necessárias para o domínio salvar os dados
- Implementa a interface para salvar e recuperar dados do DB
- Aqui, pode ser usado qualquer tecnologia
"""

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import column, Engine

from backend.core.domain.models import (
    Professor, Aluno
)
from backend.core.interfaces.repositories import(
    ProfessorRepository, AlunoRepository
    )


class ProfessorRepositoryPostgres(ProfessorRepository):
    """Professor repository class for PostgreSQL implementation."""

    def __init__(self, db: Session):
        """Initializes the repository with a database session."""
        self.database = db


    def verify_login(self, professor_email: str, professor_password: str) -> bool:
        """Verifies professor login credentials. It queries the database for
        a professor with the given email and checks if the password matches.\\
        Args:
            email (str): Professor's email.
            password (str): Professor's password.
        Returns:
            bool: `True` if the credentials are valid. Otherwise, returns `False`.
        """
        professor = self.database.query(Professor).filter_by(email=professor_email).first()
        if professor is None:
            return False
        return professor.password == professor_password


    def save(self, professor: Professor) -> Professor | str:
        """Saves a Professor object to the database. If the save fails,
        an exception is raised and the error message is returned.\\
        Args:
            professor (Professor): Professor object to be saved.
        Returns:
            Professor | str: Professor object if the save is successful.
                Otherwise, returns an error message.
        """
        try:
            self.database.add(professor)
            self.database.commit()
            self.database.refresh(professor)
        except SQLAlchemyError as exception:
            error_message = f"An error occurred: {exception}"
            print(error_message) # TODO: Remove later
            return error_message
        return professor


    def delete(self, professor: Professor) -> str:
        """Deletes a Professor object from the database.  If the deletion fails,
        an exception is raised and the error message is returned.\\
        Args:
            professor (Professor): Professor object to be deleted.
        Returns:
            str: Error message if the deletion fails. Otherwise,
                returns a success message.
        """
        try:
            self.database.delete(professor)
            self.database.commit()
        except SQLAlchemyError as exception:
            error_message = f"An error occurred: {exception}"
            print(error_message) # TODO: Remove later
            return error_message
        return "Removed successfully"


    def get_by_id(self, professor_id: int) -> Professor | str:
        """Retrieves a Professor object from the database by its ID. If the
        retrieval fails, an error message is returned.\\
        Args:
            professor_id (int): Professor's ID.
        Returns:
            Professor | str: Professor object if the retrieval is successful.
                Otherwise, returns an error message.
        """
        professor = self.database.query(Professor).filter_by(id=professor_id).first()
        if professor is None:
            return f"Professor with ID {professor_id} not found"
        return professor


    def get_by_name(self, professor_name: str) -> list[Professor]:
        """Retrieves one or more Professor object from the database by its name.\\
        Args:
            professor_name (str): Professor name.
        Returns:
            list[Professor]: List of Professor objects.
        """
        professors = self.database.query(Professor).filter(column('name') == professor_name).all()
        if professors is None:
            return []
        return professors


class AlunoRepositoryPostgres(AlunoRepository):
    """Aluno repository class for PostgreSQL implementation."""

    def __init__(self, db: Session):
        """Initializes the repository with a database session."""
        self.database = db


    def save(self, aluno: Aluno) -> Aluno | str:
        """Saves an Aluno object to the database. If the save fails,
        an exception is raised and the error message is returned.\\
        Args:
            aluno (Aluno): Aluno object to be saved.
        Returns:
            Aluno | str: Aluno object if the save is successful. Otherwise,
                returns an error message.
        """
        try:
            self.database.add(aluno)
            self.database.commit()
            self.database.refresh(aluno)
        except SQLAlchemyError as exception:
            error_message = f"An error occurred: {exception}"
            print(error_message) # TODO: Remove later
            return error_message
        return aluno


    def get_by_id(self, aluno_id: int) -> Aluno | str:
        """Retrieves an Aluno object from the database by its ID. If the
        retrieval fails, an error message is returned.\\
        Args:
            aluno_id (int): Aluno's ID.
        Returns:
            Aluno | str: Aluno object if the retrieval is successful. Otherwise,
                returns an error message.
        """
        aluno = self.database.query(Aluno).filter_by(id=aluno_id).first()
        if aluno is None:
            return f"Aluno with ID {aluno_id} not found"
        return aluno


    def delete(self, aluno: Aluno) -> str:
        """Deletes an Aluno object from the database. If the deletion fails,
        an exception is raised and the error message is returned.\\
        Args:
            aluno (Aluno): Aluno object to be deleted.
        Returns:
            str: Error message if the deletion fails. Otherwise,
                returns a success message.
        """
        try:
            self.database.delete(aluno)
            self.database.commit()
        except SQLAlchemyError as exception:
            error_message = f"An error occurred: {exception}"
            print(error_message) # TODO: Remove later
            return error_message
        return "Removed successfully"


    def get_by_name(self, aluno_name: str) -> list[Aluno]:
        """Retrieves one or more Aluno object from the database by its name.\\
        Args:
            aluno_name (str): Aluno name.
        Returns:
            list[Aluno]: List of Aluno objects.
        """
        alunos = self.database.query(Aluno).filter(column('name') == aluno_name).all()
        if alunos is None:
            return []
        return alunos


class SQLAlchemySession:
    """SQLAlchemy session class."""

    def __init__(self, engine: Engine):
        """Initializes the SQLAlchemy session."""
        self.db_session = Session(bind=engine)

    def get_db_session(self) -> Session:
        """Returns the SQLAlchemy session."""
        return self.db_session

    def close_db_session(self):
        """Closes the database session."""
        self.db_session.close()
