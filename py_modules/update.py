import subprocess
from config import logging

def update_latest():
    command = "curl -L https://raw.githubusercontent.com/honjow/GPD-WinControl/main/install.sh | sh"
    try:
        subprocess.Popen(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        logging.error(f"Error updating: {e}")
        return e.returncode