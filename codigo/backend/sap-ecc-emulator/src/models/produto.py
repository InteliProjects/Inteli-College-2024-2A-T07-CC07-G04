from db import db

class Produto(db.Model):
    __tablename__ = 'produtos'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255))
    descricao = db.Column(db.Text)
    especificacao = db.Column(db.Text)
    preco = db.Column(db.Numeric(10, 2))

    def __repr__(self):
        return f'<Produto {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'descricao': self.descricao,
            'especificacao': self.especificacao,
            'preco': str(self.preco)  # Convert to string for JSON serialization
        }
