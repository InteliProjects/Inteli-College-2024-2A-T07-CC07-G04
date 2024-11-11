from flask import Blueprint, jsonify, request, make_response
from models.pedido import Pedido
from db import db

pedido_bp = Blueprint('pedido_bp', __name__)

@pedido_bp.route('/pedidos', methods=['GET'])
def get_pedidos():
    pedidos = Pedido.query.all()
    return jsonify([pedido.to_dict() for pedido in pedidos])

@pedido_bp.route('/pedidos/<int:id>', methods=['GET'])
def get_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        return jsonify(pedido.to_dict())
    else:
        return make_response(jsonify(message="Pedido não encontrado"), 404)

@pedido_bp.route('/pedidos', methods=['POST'])
def create_pedido():
    data = request.json
    pedido = Pedido(**data)
    db.session.add(pedido)
    db.session.commit()
    return jsonify(pedido.to_dict()), 201

@pedido_bp.route('/pedidos/<int:id>', methods=['PATCH'])
def update_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        data = request.json
        for key, value in data.items():
            setattr(pedido, key, value)
        db.session.commit()
        return jsonify(pedido.to_dict())
    else:
        return make_response(jsonify(message="Pedido não encontrado"), 404)

@pedido_bp.route('/pedidos/<int:id>', methods=['DELETE'])
def delete_pedido(id):
    pedido = Pedido.query.get(id)
    if pedido:
        db.session.delete(pedido)
        db.session.commit()
        return jsonify(message="Pedido excluído")
    else:
        return make_response(jsonify(message="Pedido não encontrado"), 404)
