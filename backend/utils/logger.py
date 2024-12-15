import logging
import os
from datetime import datetime

if os.path.exists("./logs") == False:
    os.mkdir("./logs")

current_time = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
fileName = f"./logs/app-{current_time}.log"

# Set up logging
logging.basicConfig(filename=fileName, level=logging.INFO, format='%(asctime)s - %(message)s')

def log_action(action_type, details):
    logging.info(f"{action_type}: {details}")
