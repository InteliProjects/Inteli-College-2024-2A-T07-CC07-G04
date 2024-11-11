from flask import Blueprint, jsonify, make_response
from models.atualizacao import Atualizacao
from db import db
from datetime import datetime

atualizacoes_bp = Blueprint('atualizacoes_bp', __name__)

@atualizacoes_bp.route('/atualizacoes', methods=['GET'])
def get_atualizacoes():
    atualizacoes = Atualizacao.query.all()
    return jsonify([atualizacao.to_dict() for atualizacao in atualizacoes])

@atualizacoes_bp.route('/atualizacoes/<int:id>', methods=['GET'])
def get_atualizacao(id):
    atualizacao = Atualizacao.query.get(id)
    if atualizacao:
        return jsonify(atualizacao.to_dict())
    else:
        return make_response(jsonify(message="Atualização não encontrada"), 404)

@atualizacoes_bp.route('/atualizacoes', methods=['POST'])
def create_atualizacao():
    try:
        # Captura a data e hora atuais automaticamente
        nova_atualizacao = Atualizacao(
            data=datetime.now().date(),
            hora=datetime.now().time()
        )
        db.session.add(nova_atualizacao)
        db.session.commit()
        return jsonify(nova_atualizacao.to_dict()), 201
    except Exception as e:
        return make_response(jsonify(message="Erro ao criar atualização", error=str(e)), 400)

@atualizacoes_bp.route('/atualizacoes/<int:id>', methods=['PATCH'])
def update_atualizacao(id):
    atualizacao = Atualizacao.query.get(id)
    if atualizacao:
        data = request.json
        if 'data' in data:
            atualizacao.data = datetime.strptime(data['data'], '%Y-%m-%d').date()
        if 'hora' in data:
            atualizacao.hora = datetime.strptime(data['hora'], '%H:%M:%S').time()
        db.session.commit()
        return jsonify(atualizacao.to_dict())
    else:
        return make_response(jsonify(message="Atualização não encontrada"), 404)

@atualizacoes_bp.route('/atualizacoes/<int:id>', methods=['DELETE'])
def delete_atualizacao(id):
    atualizacao = Atualizacao.query.get(id)
    if atualizacao:
        db.session.delete(atualizacao)
        db.session.commit()
        return jsonify(message="Atualização excluída")
    else:
        return make_response(jsonify(message="Atualização não encontrada"), 404)
