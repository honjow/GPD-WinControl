import { useEffect, useState } from "react";
import { Backend } from "../backend";
import { Settings } from ".";

export const useMore = () => {
  const [currentVersion, setCurrentVersion] = useState<string>(Settings.currentVersion);
  const [latestVersion, setLatestVersion] = useState<string>(Settings.latestVersion);

  const [xfirmwareVersion, _] = useState<string>(Settings.xfirmwareVersion);
  const [kfirmwareVersion, __] = useState<string>(Settings.kfirmwareVersion);

  const [disableFirmwareCheck, setDisableFirmwareCheck] = useState<boolean>(Settings.disableFirmwareCheck);

  useEffect(() => {
    const getData = async () => {
      const latestVersion = await Backend.getLatestVersion();
      setLatestVersion(latestVersion);
      Settings.latestVersion = latestVersion;
    };
    getData();
  });

  useEffect(() => {
    const getData = async () => {
      const version = await Backend.getVersion();
      setCurrentVersion(version);
      Settings.currentVersion = version;
    };
    getData();
  });

  useEffect(() => {
    Settings.disableFirmwareCheck = disableFirmwareCheck;
  }, [disableFirmwareCheck]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const xfirmware_version = await Backend.getXFirmwareVersion();
  //     const kfirmware_version = await Backend.getKFirmwareVersion();
  //     setXfirmware_version(xfirmware_version);
  //     setKfirmware_version(kfirmware_version);
  //     Settings.xfirmware_version = xfirmware_version;
  //     Settings.kfirmware_version = kfirmware_version;
  //   };
  //   getData();
  // });

  return {
    currentVersion,
    latestVersion,
    xfirmwareVersion,
    kfirmwareVersion,
    disableFirmwareCheck,
    setDisableFirmwareCheck,
  };
};
