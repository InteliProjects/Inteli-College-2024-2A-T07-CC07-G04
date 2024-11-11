from app import app  # ou onde você definiu seu objeto Flask
from db import db

with app.app_context():
    db.create_all()
    print("Tabelas criadas com sucesso.")
