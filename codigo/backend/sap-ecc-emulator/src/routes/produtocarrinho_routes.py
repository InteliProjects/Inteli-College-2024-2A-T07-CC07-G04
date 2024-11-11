from flask import Blueprint, jsonify, request, make_response
from models.produtocarrinho import ProdutoCarrinho
from db import db

produtocarrinho_bp = Blueprint('produtocarrinho_bp', __name__)

@produtocarrinho_bp.route('/produtos_carrinho', methods=['GET'])
def get_produtos_carrinho():
    produtos_carrinho = ProdutoCarrinho.query.all()
    return jsonify([produto_carrinho.to_dict() for produto_carrinho in produtos_carrinho])

@produtocarrinho_bp.route('/produtos_carrinho/<int:carrinho_id>/<int:produto_id>', methods=['GET'])
def get_produto_carrinho(carrinho_id, produto_id):
    produto_carrinho = ProdutoCarrinho.query.filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
    if produto_carrinho:
        return jsonify(produto_carrinho.to_dict())
    else:
        return make_response(jsonify(message="Produto no carrinho não encontrado"), 404)

@produtocarrinho_bp.route('/produtos_carrinho', methods=['POST'])
def create_produto_carrinho():
    data = request.json
    produto_carrinho = ProdutoCarrinho(**data)
    db.session.add(produto_carrinho)
    db.session.commit()
    return jsonify(produto_carrinho.to_dict()), 201

@produtocarrinho_bp.route('/produtos_carrinho/<int:carrinho_id>/<int:produto_id>', methods=['PATCH'])
def update_produto_carrinho(carrinho_id, produto_id):
    produto_carrinho = ProdutoCarrinho.query.filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
    if produto_carrinho:
        data = request.json
        for key, value in data.items():
            setattr(produto_carrinho, key, value)
        db.session.commit()
        return jsonify(produto_carrinho.to_dict())
    else:
        return make_response(jsonify(message="Produto no carrinho não encontrado"), 404)

@produtocarrinho_bp.route('/produtos_carrinho/<int:carrinho_id>/<int:produto_id>', methods=['DELETE'])
def delete_produto_carrinho(carrinho_id, produto_id):
    produto_carrinho = ProdutoCarrinho.query.filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
    if produto_carrinho:
        db.session.delete(produto_carrinho)
        db.session.commit()
        return jsonify(message="Produto no carrinho excluído")
    else:
        return make_response(jsonify(message="Produto no carrinho não encontrado"), 404)
