from app import app
from flask import jsonify
from app.sync import sincronizar_bancos

@app.route('/sincronizar', methods=['GET'])
def sincronizar():
    try:
        resultados = sincronizar_bancos()
        return jsonify({
            'status': 'Sucesso',
            'resultados': resultados
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'Erro',
            'mensagem': str(e)
        }), 500
