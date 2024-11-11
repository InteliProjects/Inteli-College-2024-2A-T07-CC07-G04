from db import db

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    loja_id = db.Column(db.Integer, db.ForeignKey('lojas.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedores.id'), nullable=False)

    produto = db.relationship('Produto', backref='pedidos', lazy=True)
    loja = db.relationship('Loja', backref='pedidos', lazy=True)
    vendedor = db.relationship('Vendedor', backref='pedidos', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'produto_id': self.produto_id,
            'loja_id': self.loja_id,
            'status': self.status,
            'vendedor_id': self.vendedor_id
        }

    def __repr__(self):
        return f'<Pedido {self.id}>'
