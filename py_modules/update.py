import json
import os
import shutil
import ssl
import stat
import subprocess

import urllib.request

from config import logging
import decky_plugin
from utils import generate_random_string 


def recursive_chmod(path, perms):
    for dirpath, dirnames, filenames in os.walk(path):
        current_perms = os.stat(dirpath).st_mode
        os.chmod(dirpath, current_perms | perms)
        for filename in filenames:
            os.chmod(os.path.join(dirpath, filename), current_perms | perms)


def update_latest():
    downloaded_filepath = download_latest_build()

    if os.path.exists(downloaded_filepath):
        plugin_dir = f"{decky_plugin.DECKY_USER_HOME}/homebrew/plugins/GPD-WinControl"

        try:
            # add write perms to directory
            recursive_chmod(plugin_dir, stat.S_IWUSR)

            # remove old plugin
            shutil.rmtree(plugin_dir)
        except Exception as e:
            logging.error(f"ota error during removal of old plugin: {e}")

        try:
            # extract files to decky plugins dir
            shutil.unpack_archive(
                downloaded_filepath,
                f"{decky_plugin.DECKY_USER_HOME}/homebrew/plugins",
                format="gztar",
            )

            # cleanup downloaded files
            os.remove(downloaded_filepath)
        except Exception as e:
            decky_plugin.logger.error(f"error during ota file extraction {e}")

        cmd = f'echo "systemctl restart plugin_loader.service" | sh'
        result = subprocess.run(
            cmd,
            shell=True,
            check=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        return result


def download_latest_build():
    url = "http://api.github.com/repos/honjow/GPD-WinControl/releases/latest"

    gcontext = ssl.SSLContext()

    response = urllib.request.urlopen(url, context=gcontext)
    json_data = json.load(response)

    download_url = json_data.get("assets")[0].get("browser_download_url")

    logging.info(download_url)

    file_path = f"/tmp/GPD-WinControl.tag.gz"

    with urllib.request.urlopen(download_url, context=gcontext) as response, open(
        file_path, "wb"
    ) as output_file:
        output_file.write(response.read())
        output_file.close()

    return file_path