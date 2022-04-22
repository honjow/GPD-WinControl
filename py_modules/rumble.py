from wincontrols import hardware
from config import logging
from wincontrols.config import Setting

def get_rumble():
    try:
        wc = hardware.WinControls(disableFwCheck=False)
        if wc.loaded:
            wc.readConfig()
        rumble : Setting = wc.field["rumble"]
        logging.info(f"rumble: {rumble}")
        return rumble.get()
    except Exception as e:
        logging.error(f"Error getting rumble: {e}")
        return -1

def set_rumble(rumble):
    try:
        wc = hardware.WinControls(disableFwCheck=False)
        cmd=f"rumble={rumble}"
        if wc.loaded:
            try:
                if wc.setConfig(config=cmd):
                    wc.writeConfig()
                    return True
            except Exception as e:
                logging.error(f"Error setting rumble: {e}")
                return False
    except Exception as e:
        logging.error(f"Error setting rumble: {e}")
        return False

