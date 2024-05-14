from flask import Blueprint, request, jsonify
import sys
sys.path.append('../../../')

from backend.adapters.controllers.controller import (
    AlunoController, ProfessorController, PeriodoLetivoController,
    DiaSemAulaController
)

app = Blueprint('routes', __name__)

@app.route('/')
def index():
    return "Teste flask API"

####                                              ####
#       Implementação das rotas para os alunos       #
####                                              ####

@app.route("/create/aluno", methods=['POST'])
def create_aluno() -> tuple:
    data = request.get_json()

    # Check if all required fields are present in the request data
    required_fields = ["name", "born_date", "address", "tutor_name", "tutor_phone", "class_shift"]
    if not data or not all(key in data for key in required_fields):
        # Return an error response if any required field is missing
        error_response = {'error':'Invalid data'}
        return jsonify(error_response), 400

    name = data["name"]
    born_date = data["born_date"]
    address = data["address"]
    tutor_name = data["tutor_name"]
    tutor_phone = data["tutor_phone"]
    class_shift = data["class_shift"]

    response = AlunoController().create(name, born_date, address, tutor_name, tutor_phone, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 400

    return jsonify(data), 200

@app.route("/update/aluno", methods=['POST'])
def update_aluno() -> tuple:
    """Update an existing aluno.\\
    Returns:
        A tuple containing the updated data and a status code.
    """
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'ID not given'}), 400

    aluno_id = data.get('id')
    name = data.get('name')
    born_date = data.get('born_date')
    address = data.get("address")
    tutor_name = data.get("tutor_name")
    tutor_phone = data.get("tutor_phone")
    class_shift = data.get("class_shift")

    response = AlunoController().update(aluno_id, name, born_date, address,
                                        tutor_name, tutor_phone, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 400

    return data, 200

@app.route("/delete/aluno", methods=['POST'])
def delete_aluno() -> tuple:
    """Delete an existing aluno.\\
    Returns:
        A tuple containing the deleted data and a status code.
    """
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'Invalid data'}), 400
    aluno_id = data.get('id')

    response = AlunoController().remove(aluno_id)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 400
    return data, 200


@app.route("/alunos/<name>", methods=['GET'])
def get_alunos(name) -> tuple:
    data = AlunoController().get_alunos_by_name(name)
    if not data:
        return jsonify({"error": "Aluno does not exist"}), 400

    return jsonify(data), 200


@app.route("/all_alunos/", methods=['GET'])
def get_all_alunos() -> tuple:
    """Get all alunos from the database.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = AlunoController().get_all_alunos()
    if not data:
        return jsonify({"error": "There are no alunos in the database"}), 400

    return jsonify(data), 200


@app.route('/aluno', methods=['GET'])
def get_aluno_paginated() -> tuple:
    """Get alunos from the database paginated.\\
    Returns:
        A tuple containing the data and a status code.
    """
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('_limit', 10, type=int)
    name_like = request.args.get('name_like', '', type=str)
    offset = (page - 1) * limit

    alunos = AlunoController().get_alunos_paginated(offset, limit, name_like)

    if not alunos:
        return jsonify({"error": "There are no alunos in the database"}), 400

    return jsonify(alunos), 200


####                                                   ####
#       Implementação das rotas para os professores       #
####                                                   ####

@app.route("/login", methods=['POST'])
def login() -> tuple:
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(f'recebido no flask: {email}, {password}') # TODO: remove this
    if not email or not password:
        return jsonify({"error":"Invalid data"}), 400

    response = ProfessorController().login(email, password)
    if not response:
        return jsonify({"error":"Invalid email or password"}), 401

    return jsonify(response), 200

app.route("/create/professor", methods=['POST'])
def create_professor() -> tuple:
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400
    
    name = data.get('name')
    email = data.get('email')
    password = data.get("password")
    
    response = ProfessorController().create(name, email, password)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    
    return data, 200

@app.route("/update/professor", methods=['POST'])
def update_professor() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'ID not given'}), 400
    
    id = data.get('id')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    response = ProfessorController().update(id, name, email, password)
    if not response:
        return jsonify({"error": "Invalid ID"}), 200
    return data, 200

@app.route("/delete/professor", methods=['POST'])
def delete_professor() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'Invalid data'}), 400
    
    id = data.get('id')

    response = ProfessorController().remove(id)
    if not response:
        return jsonify({"error": "Invalid ID"}), 200
    return data, 200


####                                                   ####
#       Implementação das rotas para Período Letivo       #
####                                                   ####

@app.route("/create_periodo_letivo", methods=['POST'])
def create_periodo_letivo() -> tuple:
    """Create a new periodo letivo.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    start_date = data.get('start_date')
    end_date = data.get("end_date")
    class_shift = data.get("class_shift")

    response = PeriodoLetivoController().create(start_date, end_date, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200

    return data, 200


@app.route("/update_periodo_letivo", methods=['POST'])
def update_periodo_letivo() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'ID not given'}), 400

    periodo_letivo_id = data.get('id')
    start_date = data.get('start_date')
    end_date = data.get("end_date")
    class_shift = data.get("class_shift")

    response = PeriodoLetivoController().update(periodo_letivo_id, start_date,
                                                end_date, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    return data, 200


@app.route("/delete_periodo_letivo", methods=['POST'])
def delete_periodo_letivo() -> tuple:
    """Delete a periodo letivo.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'Invalid data'}), 400

    periodo_letivo_id = data.get('id')

    response = PeriodoLetivoController().remove(periodo_letivo_id)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    return data, 200


@app.route("/all_periodo_letivos", methods=['GET'])
def get_all_periodo_letivos() -> tuple:
    """Get all periodo letivos from the database.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = PeriodoLetivoController().get_all_periodo_letivos()
    if not data:
        return jsonify({"error": "There are no periodo letivos in the database"}), 400

    return jsonify(data), 200


####                                                   ####
#       Implementação das rotas para Período Letivo       #
####                                                   ####

@app.route("/create_dia_sem_aula", methods=['POST'])
def create_dia_sem_aula() -> tuple:
    """Create a new dia sem aula.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    periodo_letivo_id = data.get('periodo_letivo_id')
    date = data.get('date')
    description = data.get("reason")

    response = DiaSemAulaController().create(periodo_letivo_id, date, description)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200

    return data, 200

@app.route("/update_dia_sem_aula", methods=['POST'])
def update_dia_sem_aula() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'ID not given'}), 400

    dia_sem_aula_id = data.get('id')
    date = data.get('date')
    description = data.get("reason")

    response = DiaSemAulaController().update(dia_sem_aula_id, date, description)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    return data, 200


@app.route("/delete_dia_sem_aula", methods=['POST'])
def delete_dia_sem_aula() -> tuple:
    """Delete a dia sem aula.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'Invalid data'}), 400

    dia_sem_aula_id = data.get('id')

    response = DiaSemAulaController().remove(dia_sem_aula_id)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    return data, 200


@app.route("/all_dias_sem_aula", methods=['GET'])
def get_all_dias_sem_aula() -> tuple:
    """Get all dias sem aula from the database.\\
    Returns:
        A tuple containing the data and a status code.
    """
    data = DiaSemAulaController().get_all_dias_sem_aula()
    if not data:
        return jsonify({"error": "There are no dias sem aula in the database"}), 400

    return jsonify(data), 200