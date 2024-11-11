from db import db

class ProdutoCarrinho(db.Model):
    __tablename__ = 'produtocarrinho'

    carrinho_id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)

    produto = db.relationship('Produto', backref='produtocarrinho', lazy=True)

    def to_dict(self):
        return {
            'carrinho_id': self.carrinho_id,
            'produto_id': self.produto_id,
            'quantidade': self.quantidade
        }

    def __repr__(self):
        return f'<ProdutoCarrinho {self.carrinho_id}-{self.produto_id}>'
