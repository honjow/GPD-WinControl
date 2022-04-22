import logging


try:
    LOG_LOCATION = f"/tmp/GPD-WinControl.log"
    logging.basicConfig(
        level=logging.INFO,
        filename=LOG_LOCATION,
        format="[%(asctime)s | %(filename)s:%(lineno)s:%(funcName)s] %(levelname)s: %(message)s",
        filemode="w",
        force=True,
    )
except Exception as e:
    logging.error(f"exception|{e}")
