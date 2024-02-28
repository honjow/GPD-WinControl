import { useEffect, useState } from "react";
import { Backend } from "../backend";
import { Settings } from ".";

export const useUpdate = () => {
  const [currentVersion, setCurrentVersion] = useState<string>(Settings.currentVersion);
  const [latestVersion, setLatestVersion] = useState<string>(Settings.currentVersion);

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

  return { currentVersion, latestVersion };
};
