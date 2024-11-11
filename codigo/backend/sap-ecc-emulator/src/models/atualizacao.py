from db import db
from datetime import datetime

class Atualizacao(db.Model):
    __tablename__ = 'atualizacoes'

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Date, nullable=False, default=datetime.utcnow().date())
    hora = db.Column(db.Time, nullable=False, default=datetime.utcnow().time())

    def to_dict(self):
        return {
            'id': self.id,
            'data': self.data.isoformat(),
            'hora': self.hora.isoformat()
        }

    def __repr__(self):
        return f'<Atualizacao {self.id} - {self.data} {self.hora}>'
