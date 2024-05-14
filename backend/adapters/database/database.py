"""Database ORM models for SQLAlchemy."""

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Create an engine to connect to a database
# postgresql://<username>:<password>@<host>:<port>/<database_name>
engine = create_engine(
    'postgresql://postgres:postgres@localhost:5450/postgres',
    echo=True)


Base = declarative_base()

class AlunoORM(Base):
    """Aluno ORM class for SQLAlchemy."""
    __tablename__ = 'aluno'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    born_date = Column(Date, nullable=False)
    address = Column(String(200), nullable=False)
    tutor_name = Column(String(100), nullable=False)
    tutor_phone = Column(String(20), nullable=False)
    class_shift = Column(String(20), nullable=False)


class ProfessorORM(Base):
    """Professor ORM class for SQLAlchemy."""
    __tablename__ = 'professor'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)


Base.metadata.create_all(engine)


def create_some_alunos():
    """Creates some Aluno objects and saves them to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    new_aluno = AlunoORM(name='John Doe', born_date='2000-01-01',
                         address='123 Main St', tutor_name='Jane Doe',
                         tutor_phone='555-555-5555', class_shift='Morning')
    session.add(new_aluno)
    session.commit()

    # Insert a new student with a different class shift
    new_aluno = AlunoORM(name='Jane Doe', born_date='2001-02-02',
                         address='456 Elm St', tutor_name='John Doe',
                         tutor_phone='555-555-5555', class_shift='Afternoon')
    session.add(new_aluno)
    session.commit()

    # Insert a new student with a different tutor
    new_aluno = AlunoORM(name='Bob Smith', born_date='2002-03-03',
                         address='789 Oak St', tutor_name='Alice Smith',
                         tutor_phone='555-555-5555', class_shift='Morning')
    session.add(new_aluno)
    session.commit()

    # Insert a new student with a different address
    new_aluno = AlunoORM(name='Samantha Johnson', born_date='2003-04-04',
                         address='321 Pine St', tutor_name='Mike Johnson',
                         tutor_phone='555-555-5555', class_shift='Afternoon')
    session.add(new_aluno)
    session.commit()


def create_a_professor():
    """Creates a Professor object and saves it to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Insert a new professor
    new_professor = ProfessorORM(name='Oscar Smith',
                                 email='oscar.smith@example.com',
                                 password='password123')
    session.add(new_professor)
    session.commit()


def delete_all_alunos():
    """Deletes all Aluno objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all alunos
    session.query(AlunoORM).delete()
    session.commit()


def delete_all_professors():
    """Deletes all Professor objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all professors
    session.query(ProfessorORM).delete()
    session.commit()
