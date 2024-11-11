from flask import Blueprint, jsonify, request, make_response
from models.usuario import Usuario
from db import db

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([usuario.to_dict() for usuario in usuarios])

@usuario_bp.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario:
        return jsonify(usuario.to_dict())
    else:
        return make_response(jsonify(message="Usuário não encontrado"), 404)

@usuario_bp.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.json
    usuario = Usuario(**data)
    db.session.add(usuario)
    db.session.commit()
    return jsonify(usuario.to_dict()), 201

@usuario_bp.route('/usuarios/<int:id>', methods=['PATCH'])
def update_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario:
        data = request.json
        for key, value in data.items():
            setattr(usuario, key, value)
        db.session.commit()
        return jsonify(usuario.to_dict())
    else:
        return make_response(jsonify(message="Usuário não encontrado"), 404)

@usuario_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario:
        db.session.delete(usuario)
        db.session.commit()
        return jsonify(message="Usuário excluído")
    else:
        return make_response(jsonify(message="Usuário não encontrado"), 404)
