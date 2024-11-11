from db import db

class Vendedor(db.Model):
    __tablename__ = 'vendedores'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    afiliacao = db.Column(db.String(255), nullable=False)
    loja_id = db.Column(db.Integer, db.ForeignKey('lojas.id'), nullable=False)

    loja = db.relationship('Loja', backref='vendedores', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'afiliacao': self.afiliacao,
            'loja_id': self.loja_id
        }

    def __repr__(self):
        return f'<Vendedor {self.nome}>'
