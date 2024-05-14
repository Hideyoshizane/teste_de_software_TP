from flask import Blueprint, request, jsonify
import sys
sys.path.append('./')
print("teste:", sys.path)
from backend.adapters.controllers.controller import AlunoController, ProfessorController

app = Blueprint('routes', __name__)

@app.route('/')
def index():
    return "Teste flask API"

###Pode ser substituito por um único end point mas com diferentes requisições HTML

@app.route("/create/aluno", methods=['POST'])
def create_aluno() -> tuple:
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid data'}), 400
    name = data.get('name')
    born_date = data.get('born_date')
    address = data.get("address")
    tutor_name = data.get("tutor_name")
    tutor_phone = data.get("tutor_phone")
    class_shift = data.get("class_shift")
    
    response = AlunoController().create(name, born_date, address, tutor_name, tutor_phone, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    
    return data, 200

@app.route("/update/aluno", methods=['POST'])
def update_aluno() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'ID not given'}), 400
    
    id = data.get('id')
    name = data.get('name')
    born_date = data.get('born_date')
    address = data.get("address")
    tutor_name = data.get("tutor_name")
    tutor_phone = data.get("tutor_phone")
    class_shift = data.get("class_shift")
    
    response = AlunoController().update(id, name, born_date, address, tutor_name, tutor_phone, class_shift)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200

    return data, 200

@app.route("/delete/aluno", methods=['POST'])
def delete_aluno() -> tuple:
    data = request.get_json()
    if not data.get('id'):
        return jsonify({'error': 'Invalid data'}), 400
    id = data.get('id')
    
    response = AlunoController().remove(id)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    return data, 200


@app.route("/alunos/<name>", methods=['GET'])
def get_alunos(name) -> tuple:
    data = AlunoController().get_alunos_by_name(name)
    if not data:
        return jsonify({"error": "Aluno does not exist"}), 400

    return jsonify(data), 200



"""
Implementação das rotas para os professores
"""

@app.route("/login/<email>/<password>", methods=['GET'])
def login(email, password) -> tuple:
    if not email or not password:
        return jsonify({"error":"Invalid data"}), 400
    
    response = ProfessorController().login(email, password)
    if not response:
        return jsonify({"error":"Invalid credentials"}), 200
    
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