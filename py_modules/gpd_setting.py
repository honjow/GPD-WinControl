from wincontrols import hardware
from config import logging
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
    try:
        wc = hardware.WinControls(disableFwCheck=False)
        if wc.loaded:
            try:
                if wc.setConfig(config=cmd):
                    wc.writeConfig()
                    return True
            except Exception as e:
                logging.error(f"Error setting {option}: {e}")
                return False
    except Exception as e:
        logging.error(f"Error setting {option}: {e}")
        return False