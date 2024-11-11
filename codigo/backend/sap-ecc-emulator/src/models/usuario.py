from db import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    endereco = db.Column(db.String(255), nullable=False)
    tipouser = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    senha = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'endereco': self.endereco,
            'tipouser': self.tipouser,
            'email': self.email,
            'senha': self.senha
        }

    def __repr__(self):
        return f'<Usuario {self.email}>'
