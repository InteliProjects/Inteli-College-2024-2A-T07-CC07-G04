from flask import Blueprint, jsonify, request, make_response
from models.produto import Produto
from db import db

produto_bp = Blueprint('produto_bp', __name__)

@produto_bp.route('/produtos', methods=['GET'])
def get_produtos():
    produtos = Produto.query.all()
    return jsonify([produto.to_dict() for produto in produtos])

@produto_bp.route('/produtos/<int:id>', methods=['GET'])
def get_produto(id):
    produto = Produto.query.get(id)
    if produto:
        return jsonify(produto.to_dict())
    else:
        return make_response(jsonify(message="Produto não encontrado"), 404)

@produto_bp.route('/produtos', methods=['POST'])
def create_produto():
    data = request.json
    produto = Produto(**data)
    db.session.add(produto)
    db.session.commit()
    return jsonify(produto.to_dict()), 201

@produto_bp.route('/produtos/<int:id>', methods=['PATCH'])
def update_produto(id):
    produto = Produto.query.get(id)
    if produto:
        data = request.json
        for key, value in data.items():
            setattr(produto, key, value)
        db.session.commit()
        return jsonify(produto.to_dict())
    else:
        return make_response(jsonify(message="Produto não encontrado"), 404)

@produto_bp.route('/produtos/<int:id>', methods=['DELETE'])
def delete_produto(id):
    produto = Produto.query.get(id)
    if produto:
        db.session.delete(produto)
        db.session.commit()
        return jsonify(message="Produto excluído")
    else:
        return make_response(jsonify(message="Produto não encontrado"), 404)
