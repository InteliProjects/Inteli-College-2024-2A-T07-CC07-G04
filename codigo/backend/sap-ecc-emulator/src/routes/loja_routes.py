from flask import Blueprint, jsonify, request, make_response
from models.loja import Loja
from db import db

loja_bp = Blueprint('loja_bp', __name__)

@loja_bp.route('/lojas', methods=['GET'])
def get_lojas():
    lojas = Loja.query.all()
    return jsonify([loja.to_dict() for loja in lojas])

@loja_bp.route('/lojas/<int:id>', methods=['GET'])
def get_loja(id):
    loja = Loja.query.get(id)
    if loja:
        return jsonify(loja.to_dict())
    else:
        return make_response(jsonify(message="Loja não encontrada"), 404)

@loja_bp.route('/lojas', methods=['POST'])
def create_loja():
    data = request.json
    loja = Loja(**data)
    db.session.add(loja)
    db.session.commit()
    return jsonify(loja.to_dict()), 201

@loja_bp.route('/lojas/<int:id>', methods=['PATCH'])
def update_loja(id):
    loja = Loja.query.get(id)
    if loja:
        data = request.json
        for key, value in data.items():
            setattr(loja, key, value)
        db.session.commit()
        return jsonify(loja.to_dict())
    else:
        return make_response(jsonify(message="Loja não encontrada"), 404)

@loja_bp.route('/lojas/<int:id>', methods=['DELETE'])
def delete_loja(id):
    loja = Loja.query.get(id)
    if loja:
        db.session.delete(loja)
        db.session.commit()
        return jsonify(message="Loja excluída")
    else:
        return make_response(jsonify(message="Loja não encontrada"), 404)
