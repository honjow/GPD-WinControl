import os

# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code one directory up
# or add the `decky-loader/plugin` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky_plugin
import update
import gpd_setting
from config import (
    logging,
    IS_RGB_SUPPORTED,
    IS_RUMBLE_SUPPORTED,
    IS_STICK_SUPPORTED,
    CONFIG_KEY,
)
import utils
from settings import SettingsManager


class Plugin:
    async def _main(self):
        self.settings = SettingsManager(
            name="config", settings_directory=decky_plugin.DECKY_PLUGIN_SETTINGS_DIR
        )

    async def get_settings(self):
        return self.settings.getSetting(CONFIG_KEY)
    
    async def set_settings(self, settings):
        self.settings.setSetting(CONFIG_KEY, settings)
        logging.info(f"save Settings: {settings}")
        return True

    async def get_rumble(self):
        try:
            return int(gpd_setting.get_setting("rumble"))
        except Exception as e:
            logging.error(f"Error getting rumble: {e}")
            return 1

    async def set_rumble(self, mode: int):
        try:
            return gpd_setting.set_setting("rumble", mode)
        except Exception as e:
            logging.error(f"Error setting rumble: {e}")
            return False

    async def get_config_num(self, option):
        try:
            return int(gpd_setting.get_setting(option))
        except Exception as e:
            logging.error(f"Error getting {option}: {e}")
            return -1

    async def get_config_str(self, option):
        try:
            return str(gpd_setting.get_setting(option))
        except Exception as e:
            logging.error(f"Error getting {option}: {e}")
            return "NONE"

    async def set_config(self, option, value):
        logging.debug(f"Setting {option} to {value}")
        return gpd_setting.set_setting(option, value)

    async def reset_mappings(self):
        logging.debug("Resetting mappings")
        return gpd_setting.reset_mappings()

    async def update_latest(self):
        logging.info("Updating latest")
        return update.update_latest()

    async def get_version(self):
        return f"{decky_plugin.DECKY_PLUGIN_VERSION}"

    async def get_latest_version(self):
        try:
            return update.get_latest_version()
        except Exception as e:
            logging.error(f"Error getting latest version: {e}")
            return ""

    async def get_support_rumble_option(self):
        return IS_RUMBLE_SUPPORTED

    async def get_support_rgb_option(self):
        return IS_RGB_SUPPORTED

    async def get_support_stick_option(self):
        return IS_STICK_SUPPORTED
    
    async def get_Xfirmware_version(self):
        try:
            xfirmware, _ = gpd_setting.get_firmware_version()
            return xfirmware
        except Exception as e:
            logging.error(f"Error getting Xfirmware version: {e}")
            return "UNKNOWN"
        
    async def get_Kfirmware_version(self):
        try:
            _, kfirmware = gpd_setting.get_firmware_version()
            return kfirmware
        except Exception as e:
            logging.error(f"Error getting Kfirmware version: {e}")
            return "UNKNOWN"

    async def get_rgb(self):
        try:
            rebHex = gpd_setting.get_setting("colour")
            logging.info(f"Getting RGB: {rebHex}")
            # Convert  RR GG BB to decimal
            r = int(rebHex[0:2], 16)
            g = int(rebHex[2:4], 16)
            b = int(rebHex[4:6], 16)
            logging.info(f"RGB: {r}, {g}, {b}")
            return [r, g, b]
        except Exception as e:
            logging.error(f"Error getting RGB: {e}")
            return [0, 0, 0]

    async def set_rgb(self, r: int, g: int, b: int):
        try:
            logging.info(f"Setting RGB to {r}, {g}, {b}")
            if r is None or g is None or b is None:
                return False
            # Convert to hex
            hexColour = "{:02x}{:02x}{:02x}".format(r, g, b)
            logging.info(f"Setting RGB to {hexColour}")
            return gpd_setting.set_setting("colour", hexColour)
        except Exception as e:
            logging.error(f"Error setting RGB: {e}")
            return False
        
    async def get_language(self):
        logging.info("Getting language")
        # return "schinese"
        try:
            language = utils.get_language()
            logging.info(f"Getting language: {language}")
            return language
        except Exception as e:
            logging.error(e)
            return "english"

    async def log_debug(self, message: str):
        logging.debug(message)

    async def log_info(self, message: str):
        logging.info(message)

    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        decky_plugin.logger.info("Goodbye World!")
        pass

    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        decky_plugin.logger.info("Migrating")
        # Here's a migration example for logs:
        # - `~/.config/decky-template/template.log` will be migrated to `decky_plugin.DECKY_PLUGIN_LOG_DIR/template.log`
        decky_plugin.migrate_logs(
            os.path.join(
                decky_plugin.DECKY_USER_HOME,
                ".config",
                "decky-template",
                "template.log",
            )
        )
        # Here's a migration example for settings:
        # - `~/homebrew/settings/template.json` is migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/template.json`
        # - `~/.config/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/`
        decky_plugin.migrate_settings(
            os.path.join(decky_plugin.DECKY_HOME, "settings", "template.json"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".config", "decky-template"),
        )
        # Here's a migration example for runtime data:
        # - `~/homebrew/template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        # - `~/.local/share/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        decky_plugin.migrate_runtime(
            os.path.join(decky_plugin.DECKY_HOME, "template"),
            os.path.join(
                decky_plugin.DECKY_USER_HOME, ".local", "share", "decky-template"
            ),
        )
