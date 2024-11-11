from db import db

class Loja(db.Model):
    __tablename__ = 'lojas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    endereco = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'endereco': self.endereco
        }

    def __repr__(self):
        return f'<Loja {self.nome}>'
