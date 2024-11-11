from flask import Flask
from routes.produto_routes import produto_bp
from routes.pedido_routes import pedido_bp
from routes.vendedor_routes import vendedor_bp
from routes.loja_routes import loja_bp
from routes.estoque_routes import estoque_bp
from routes.usuario_routes import usuario_bp
from routes.produtocarrinho_routes import produtocarrinho_bp
from routes.atualizacoes_routes import atualizacoes_bp
from db import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config) 
print(Config.SQLALCHEMY_DATABASE_URI)
db.init_app(app)

# Registro dos Blueprints
app.register_blueprint(produto_bp)
app.register_blueprint(pedido_bp)
app.register_blueprint(vendedor_bp)
app.register_blueprint(loja_bp)
app.register_blueprint(estoque_bp)
app.register_blueprint(usuario_bp)
app.register_blueprint(produtocarrinho_bp)
app.register_blueprint(atualizacoes_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
