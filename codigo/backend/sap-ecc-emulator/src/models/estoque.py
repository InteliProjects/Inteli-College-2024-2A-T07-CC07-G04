from db import db

class Estoque(db.Model):
    __tablename__ = 'estoques'

    loja_id = db.Column(db.Integer, db.ForeignKey('lojas.id'), primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)
    preco = db.Column(db.Numeric(10, 2), nullable=False)

    loja = db.relationship('Loja', backref='estoques', lazy=True)
    produto = db.relationship('Produto', backref='estoques', lazy=True)

    def to_dict(self):
        return {
            'loja_id': self.loja_id,
            'produto_id': self.produto_id,
            'quantidade': self.quantidade,
            'preco': float(self.preco)  # Convert Numeric to float for JSON serialization
        }

    def __repr__(self):
        return f'<Estoque {self.loja_id}-{self.produto_id}>'
