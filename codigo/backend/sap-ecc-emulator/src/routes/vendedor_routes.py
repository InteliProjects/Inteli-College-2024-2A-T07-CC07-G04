from flask import Blueprint, jsonify, request, make_response
from models.vendedor import Vendedor
from db import db

vendedor_bp = Blueprint('vendedor_bp', __name__)

@vendedor_bp.route('/vendedores', methods=['GET'])
def get_vendedores():
    vendedores = Vendedor.query.all()
    return jsonify([vendedor.to_dict() for vendedor in vendedores])

@vendedor_bp.route('/vendedores/<int:id>', methods=['GET'])
def get_vendedor(id):
    vendedor = Vendedor.query.get(id)
    if vendedor:
        return jsonify(vendedor.to_dict())
    else:
        return make_response(jsonify(message="Vendedor não encontrado"), 404)

@vendedor_bp.route('/vendedores', methods=['POST'])
def create_vendedor():
    data = request.json
    vendedor = Vendedor(**data)
    db.session.add(vendedor)
    db.session.commit()
    return jsonify(vendedor.to_dict()), 201

@vendedor_bp.route('/vendedores/<int:id>', methods=['PATCH'])
def update_vendedor(id):
    vendedor = Vendedor.query.get(id)
    if vendedor:
        data = request.json
        for key, value in data.items():
            setattr(vendedor, key, value)
        db.session.commit()
        return jsonify(vendedor.to_dict())
    else:
        return make_response(jsonify(message="Vendedor não encontrado"), 404)

@vendedor_bp.route('/vendedores/<int:id>', methods=['DELETE'])
def delete_vendedor(id):
    vendedor = Vendedor.query.get(id)
    if vendedor:
        db.session.delete(vendedor)
        db.session.commit()
        return jsonify(message="Vendedor excluído")
    else:
        return make_response(jsonify(message="Vendedor não encontrado"), 404)
