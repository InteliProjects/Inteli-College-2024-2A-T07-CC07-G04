import sys
import logging
import psycopg2
import json
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)
# Create the database connection outside of the handler to allow connections to be re-used by subsequent function invocations.
try:
    print(os.getenv('db_user'))
    print(os.getenv('db_password'))

    conn = psycopg2.connect(host=os.getenv('db_host'), user=os.getenv('db_user'), password=os.getenv('db_password'), dbname=os.getenv('db_name'), port=os.getenv('db_port'))
except psycopg2.Error as e:
    logger.error("ERROR: Unexpected error: Could not connect to Postgres instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS Postgres instance succeeded")

def lambda_handler(event, context):
    '''
    This function gets items from an existing RDS database
    '''
    items = []
    item_count = 0
    with conn.cursor() as cur:
        cur.execute("SELECT * from atualizacoes")
        logger.info("The following items have been found in the db:")
        for row in cur.fetchall():
            item_count += 1
            logger.info(row)
            items.append(row)
        conn.commit()
    
    logger.info(f"Found {item_count} items from RDS Postgres table")
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
