"""Database ORM models for SQLAlchemy."""

from sqlalchemy import create_engine, Engine
from sqlalchemy import Column, Integer, String, Date, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship, declarative_base

import sys
sys.path.append('../../../')

from backend.core.domain.models import (
    Aluno, PeriodoLetivo, DiaSemAula, Professor
)

class DatabaseSession:
    """Database session class for SQLAlchemy. It creates a database engine
    and a session. The engine is used to create the database tables and
    the session is used to query the database. The engine and session
    are passed to the repositories.\\
    """
    def __init__(self):
        """Initializes the database engine and session."""
        ips = ['172.20.0.2']
        for ip in ips:
            try:
                # postgresql://<username>:<password>@<host>:<port>/<database_name>
                self.engine = create_engine(
                    f'postgresql://postgres:postgres@{ip}:5432/postgres',
                    echo=True)
                break  # exit loop if connection is successful
            except Exception as error:
                print(f"Error connecting to {ip}: {error}")
        self.db_session = Session(bind=self.engine)

    def get_db_session(self) -> Session:
        """Returns the SQLAlchemy session."""
        return self.db_session

    def close_db_session(self):
        """Closes the database session."""
        self.db_session.close()

    def get_engine(self) -> Engine:
        """Returns the SQLAlchemy engine."""
        return self.engine


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

    @staticmethod
    def from_aluno(aluno):
        """Converts an Aluno object to an AlunoORM object."""
        return AlunoORM(
            name=aluno.name,
            born_date=aluno.born_date,
            address=aluno.address,
            tutor_name=aluno.tutor_name,
            tutor_phone=aluno.tutor_phone,
            class_shift=aluno.class_shift
        )

    @staticmethod
    def to_aluno(aluno_orm):
        """Converts an AlunoORM object to an Aluno object."""
        return Aluno(
            id=aluno_orm.id,
            name=aluno_orm.name,
            born_date=aluno_orm.born_date,
            address=aluno_orm.address,
            tutor_name=aluno_orm.tutor_name,
            tutor_phone=aluno_orm.tutor_phone,
            class_shift=aluno_orm.class_shift
        )


class ProfessorORM(Base):
    """Professor ORM class for SQLAlchemy."""
    __tablename__ = 'professor'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)

    @staticmethod
    def from_professor(professor):
        """Converts a Professor object to a ProfessorORM object."""
        return ProfessorORM(
            name=professor.name,
            email=professor.email,
            password=professor.password
        )

    @staticmethod
    def to_professor(professor_orm):
        """Converts a ProfessorORM object to a Professor object."""
        return Professor(
            id=professor_orm.id,
            name=professor_orm.name,
            email=professor_orm.email,
            password=professor_orm.password
        )


class PeriodoLetivoORM(Base):
    """PeriodoLetivo ORM class for SQLAlchemy."""
    __tablename__ = 'periodo_letivo'

    id = Column(Integer, primary_key=True, autoincrement=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    class_shift = Column(String(100), nullable=False)
    dias_sem_aula = relationship("DiaSemAulaORM", backref="periodo_letivo")

    @staticmethod
    def from_periodo_letivo(periodo_letivo):
        """Converts a PeriodoLetivo object to a PeriodoLetivoORM object."""
        return PeriodoLetivoORM(
            start_date=periodo_letivo.start_date,
            end_date=periodo_letivo.end_date,
            class_shift=periodo_letivo.class_shift
        )

    @staticmethod
    def to_periodo_letivo(periodo_letivo_orm):
        """Converts a PeriodoLetivoORM object to a PeriodoLetivo object."""
        return PeriodoLetivo(
            id=periodo_letivo_orm.id,
            start_date=periodo_letivo_orm.start_date,
            end_date=periodo_letivo_orm.end_date,
            class_shift=periodo_letivo_orm.class_shift
        )


class DiaSemAulaORM(Base):
    """DiaSemAula ORM class for SQLAlchemy."""
    __tablename__ = 'dia_sem_aula'

    id = Column(Integer, primary_key=True, autoincrement=True)
    periodo_letivo_id = Column(Integer, ForeignKey('periodo_letivo.id'), nullable=False)
    date = Column(Date, nullable=False)
    reason = Column(String(100), nullable=False)

    @staticmethod
    def from_dia_sem_aula(dia_sem_aula):
        """Converts a DiaSemAula object to a DiaSemAulaORM object."""
        return DiaSemAulaORM(
            periodo_letivo_id=dia_sem_aula.periodo_letivo_id,
            date=dia_sem_aula.date,
            reason=dia_sem_aula.reason
        )

    @staticmethod
    def to_dia_sem_aula(dia_sem_aula_orm):
        """Converts a DiaSemAulaORM object to a DiaSemAula object."""
        return DiaSemAula(
            id=dia_sem_aula_orm.id,
            periodo_letivo_id=dia_sem_aula_orm.periodo_letivo_id,
            date=dia_sem_aula_orm.date,
            reason=dia_sem_aula_orm.reason
        )


def create_tables(engine: Engine):
    """Creates the database tables."""
    Base.metadata.create_all(engine)


def create_some_alunos(engine: Engine):
    """Creates some Aluno objects and saves them to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    aluno_list = [
        {'name': 'Pedro Souza', 'born_date': '2000-01-01',
        'address': 'Rua Principal, 123', 'tutor_name': 'Ana Souza',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Ana Paula Souza', 'born_date': '2001-02-02',
        'address': 'Rua das Flores, 456', 'tutor_name': 'Pedro Souza',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Lucas Oliveira', 'born_date': '2002-03-03',
        'address': 'Rua dos Pinheiros, 789', 'tutor_name': 'Alice Santos',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Mariana Santos', 'born_date': '2003-04-04',
        'address': 'Rua das Palmeiras, 321', 'tutor_name': 'Miguel Oliveira',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Gustavo Lima', 'born_date': '2004-05-05',
        'address': 'Rua das Acácias, 678', 'tutor_name': 'Juliana Lima',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Juliana Lima', 'born_date': '2005-06-06',
        'address': 'Rua das Orquídeas, 901', 'tutor_name': 'Gustavo Lima',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Rafaela Costa', 'born_date': '2006-07-07',
        'address': 'Rua das Margaridas, 234', 'tutor_name': 'Fernando Costa',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Fernando Costa', 'born_date': '2007-08-08',
        'address': 'Rua das Violetas, 567', 'tutor_name': 'Rafaela Costa',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Larissa Santos', 'born_date': '2008-09-09',
        'address': 'Rua das Begônias, 890', 'tutor_name': 'Rodrigo Santos',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Rodrigo Santos', 'born_date': '2009-10-10',
        'address': 'Rua das Azaleias, 123', 'tutor_name': 'Larissa Santos',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Isabela Oliveira', 'born_date': '2010-11-11',
        'address': 'Rua das Hortênsias, 456', 'tutor_name': 'Thiago Oliveira',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Thiago Oliveira', 'born_date': '2011-12-12',
        'address': 'Rua das Camélias, 789', 'tutor_name': 'Isabela Oliveira',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Gabriel Silva', 'born_date': '2012-01-13',
        'address': 'Rua das Tulipas, 246', 'tutor_name': 'Carla Silva',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Carla Silva', 'born_date': '2013-02-14',
        'address': 'Rua das Margaridas, 802', 'tutor_name': 'Gabriel Silva',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'},
        {'name': 'Luciana Santos', 'born_date': '2014-03-15',
        'address': 'Rua das Orquídeas, 246', 'tutor_name': 'Ricardo Santos',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Manhã'},
        {'name': 'Ricardo Santos', 'born_date': '2015-04-16',
        'address': 'Rua das Violetas, 802', 'tutor_name': 'Luciana Santos',
        'tutor_phone': '(11) 5555-5555', 'class_shift': 'Tarde'}
    ]

    for aluno in aluno_list:
        new_aluno = AlunoORM(name=aluno['name'], born_date=aluno['born_date'],
                             address=aluno['address'], tutor_name=aluno['tutor_name'],
                             tutor_phone=aluno['tutor_phone'], class_shift=aluno['class_shift'])

        existing_aluno = session.query(AlunoORM).filter_by(name=new_aluno.name,
                                                           born_date=new_aluno.born_date).first()
        if existing_aluno: # avoid duplicates and errors for existing data
            continue

        # Insert a new student
        session.add(new_aluno)
        session.commit()


def create_some_professor(engine: Engine):
    """Creates some Professor objects and saves it to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()
    professor_list = [
        {'name': 'Thiago', 'email': 'thiago@bhzconnection.org.br',
        'password': '123senha'}
    ]
    for professor in professor_list:
        new_professor = ProfessorORM(name=professor['name'],
                                     email=professor['email'],
                                     password=professor['password'])

        existing_professor = session.query(ProfessorORM).filter_by(email=new_professor.email).first()
        if existing_professor: # avoid duplicates and errors for existing data
            continue

        # Insert a new professor
        session.add(new_professor)
        session.commit()

def delete_all_alunos(engine: Engine):
    """Deletes all Aluno objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all alunos
    session.query(AlunoORM).delete()
    session.commit()


def delete_all_professors(engine: Engine):
    """Deletes all Professor objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all professors
    session.query(ProfessorORM).delete()
    session.commit()


def create_some_periodos_letivos(engine: Engine):
    """Creates some PeriodoLetivo objects and saves them to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    periodo_letivo_list = [
        {'start_date': '2023-01-01', 'end_date': '2023-06-30', 'class_shift': 'Manhã'},
    ]

    for periodo_letivo in periodo_letivo_list:
        new_periodo_letivo = PeriodoLetivoORM(start_date=periodo_letivo['start_date'],
                                              end_date=periodo_letivo['end_date'],
                                              class_shift=periodo_letivo['class_shift'])

        existing_periodo_letivo = session.query(PeriodoLetivoORM).filter_by(start_date=new_periodo_letivo.start_date, end_date=new_periodo_letivo.end_date).first()
        if existing_periodo_letivo: # avoid duplicates and errors for existing data
            continue

        # Insert a new periodo letivo
        session.add(new_periodo_letivo)
        session.commit()


def create_some_dias_sem_aula(engine: Engine):
    """Creates some DiaSemAula objects and saves them to the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    dia_sem_aula_list = [
        {'periodo_letivo_id': 1, 'date': '2023-01-01', 'reason': 'Feriado'},
        {'periodo_letivo_id': 1, 'date': '2023-01-02', 'reason': 'Feriado'},
        {'periodo_letivo_id': 1, 'date': '2023-01-03', 'reason': 'Feriado'},
    ]

    for dia_sem_aula in dia_sem_aula_list:
        new_dia_sem_aula = DiaSemAulaORM(periodo_letivo_id=dia_sem_aula['periodo_letivo_id'],
                                        date=dia_sem_aula['date'],
                                        reason=dia_sem_aula['reason'])

        existing_dia_sem_aula = session.query(DiaSemAulaORM).filter_by(periodo_letivo_id=new_dia_sem_aula.periodo_letivo_id, date=new_dia_sem_aula.date, reason=new_dia_sem_aula.reason).first()
        if existing_dia_sem_aula: # avoid duplicates and errors for existing data
            continue

        # Insert a new dia sem aula
        session.add(new_dia_sem_aula)
        session.commit()


def delete_all_periodos_letivos(engine: Engine):
    """Deletes all PeriodoLetivo objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all periodos letivos
    session.query(PeriodoLetivoORM).delete()
    session.commit()

def delete_all_dias_sem_aula(engine: Engine):
    """Deletes all DiaSemAula objects from the database."""
    session_maker = sessionmaker(bind=engine)
    session = session_maker()

    # Delete all dias sem aula
    session.query(DiaSemAulaORM).delete()
    session.commit()