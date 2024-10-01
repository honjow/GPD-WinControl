import os
import random
import string

from config import logging
from helpers import get_home_path


def generate_random_string(length):
    letters = string.ascii_letters
    result_str = "".join(random.choice(letters) for i in range(length))
    return result_str


def get_language():
    _language = "english"
    try:
        lang_path = f"{get_home_path()}/.steam/registry.vdf"
        if os.path.exists(lang_path):
            with open(lang_path, "r") as f:
                for line in f.readlines():
                    if "language" in line:
                        _language = line.split('"')[3]
                        break
        else:
            logging.error(f"{lang_path} not found, using default language english")
        logging.info(f"get_language {_language} path={lang_path}")
        return _language
    except Exception as e:
        logging.error(e)
        return _language
