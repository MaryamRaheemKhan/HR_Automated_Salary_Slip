import logging
from datetime import datetime

# Set up logging
logging.basicConfig(filename='app.log', level=logging.INFO, format='%(asctime)s - %(message)s')

def log_action(action_type, details):
    logging.info(f"{action_type}: {details}")
