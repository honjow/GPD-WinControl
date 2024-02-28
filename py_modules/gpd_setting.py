from wincontrols import hardware
from config import logging, DEFAULT_MAPPINGS
from wincontrols.config import Setting

def get_setting(option: str):
    try:
        wc = hardware.WinControls(disableFwCheck=False)
        if wc.loaded:
            wc.readConfig()
        setting : Setting = wc.field[option]
        logging.debug(f"{option}: {setting}")
        return setting.get()
    except Exception as e:
        logging.error(f"Error getting {option}: {e}")    
    
def set_setting(option: str, value):
    cmd = f"{option}={value}"
    return writeConfig(cmd)
    
def reset_mappings():
    return writeConfig(DEFAULT_MAPPINGS)
    
def writeConfig(config):
    try:
        wc = hardware.WinControls(disableFwCheck=False)
        if wc.loaded:
            try:
                if wc.setConfig(config=config):
                    wc.writeConfig()
                    return True
            except Exception as e:
                logging.error(f"Error writing config: {e}")
                return False
        else:
            logging.error("Error writing config: WinControls not loaded")
            return False
    except Exception as e:
        logging.error(f"Error writing config: {e}")
        return False