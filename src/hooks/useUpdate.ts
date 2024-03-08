import { useEffect, useState } from "react";
import { Backend } from "../backend";
import { Settings } from ".";

export const useUpdate = () => {
  const [currentVersion, setCurrentVersion] = useState<string>(Settings.currentVersion);
  const [latestVersion, setLatestVersion] = useState<string>(Settings.currentVersion);

  const [xfirmware_version, _] = useState<string>(Settings.xfirmware_version);
  const [kfirmware_version, __] = useState<string>(Settings.kfirmware_version);

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

  return { currentVersion, latestVersion, xfirmware_version, kfirmware_version};
};
