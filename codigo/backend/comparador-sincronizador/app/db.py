import psycopg2
import os

def conectar_sap():
    return psycopg2.connect(
        host=os.getenv('DB_SAP_HOST'),
        user=os.getenv('DB_SAP_USER'),
        password=os.getenv('DB_SAP_PASSWORD'),
        dbname=os.getenv('DB_SAP_NAME')
    )

def conectar_ecomm():
    return psycopg2.connect(
        host=os.getenv('DB_ECOMM_HOST'),
        user=os.getenv('DB_ECOMM_USER'),
        password=os.getenv('DB_ECOMM_PASSWORD'),
        dbname=os.getenv('DB_ECOMM_NAME')
    )
