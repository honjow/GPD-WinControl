import decky_plugin
from wincontrols import hardware
from config import CONFIG_KEY, logging, DEFAULT_MAPPINGS
from wincontrols.config import Setting
from settings import SettingsManager


def disable_firmware_check():
    settings = SettingsManager(
        name="config", settings_directory=decky_plugin.DECKY_PLUGIN_SETTINGS_DIR
    )
    conf = settings.getSetting(CONFIG_KEY)
    if conf is None:
        return False
    return conf.get("disableFirmwareCheck", False)


def get_setting(option: str):
    try:
        disableFwCheck = disable_firmware_check()
        wc = hardware.WinControls(disableFwCheck=disableFwCheck)
        if wc.loaded:
            wc.readConfig()
        setting: Setting = wc.field[option]
        logging.debug(f"{option}: {setting}")
        return setting.get()
    except Exception as e:
        logging.error(f"Error getting {option}: {e}")
        # logging.error(traceback.format_exc())


def set_setting(option: str, value):
    cmd = f"{option}={value}"
    return writeConfig(cmd)


def reset_mappings():
    return writeConfig(DEFAULT_MAPPINGS)


def get_firmware_version():
    try:
        wc = hardware.WinControls(disableFwCheck=True)
        return wc.readFirmwareVersion()
    except Exception as e:
        logging.error(f"Error getting firmware_version: {e}")


def writeConfig(config):
    try:
        disableFwCheck = disable_firmware_check()
        wc = hardware.WinControls(disableFwCheck=disableFwCheck)
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
