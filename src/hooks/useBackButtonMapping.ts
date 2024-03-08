import { useEffect, useState } from "react";
import {
  BackButtonMapping,
  BackDelay,
  Backend,
} from "../backend";
import { Settings } from ".";

export const useBackButtonMapping = () => {
  const _backButtonMappings = Settings.backButtonMappings;
  const _backDelays = Settings.backDelays;

  const [backButtonMappings, setBackButtonMappings] =
    useState<BackButtonMapping[]>(_backButtonMappings);
  const [backDelays, setBackDelays] =
    useState<BackDelay[]>(_backDelays);

  useEffect(() => {
    const getData = async () => {
      const _setBackButtonMappings: BackButtonMapping[] = await Backend.getBackMappings();
      const _setBackDelays: BackDelay[] = await Backend.getBackDelays();

      setBackButtonMappings(_setBackButtonMappings);
      setBackDelays(_setBackDelays);
      Settings.backButtonMappings = _setBackButtonMappings;
      Settings.backDelays = _setBackDelays;
    };
    getData();
  }, []);

  const updateBackButtonMappings = (id: string, value: string) => {
    Backend.setConfig(id, value);
    const _backButtonMappings = backButtonMappings.map((item) => {
      if (item.id === id) {
        item.name = value;
      }
      return item;
    });
    setBackButtonMappings(_backButtonMappings);
    Settings.backButtonMappings = _backButtonMappings;
  };

  const updateBackDelays = (id: string, value: number) => {
    Backend.setConfig(id, value);
    const _backDelays = backDelays.map((item) => {
      if (item.id === id) {
        item.delay = value;
      }
      return item;
    });
    setBackDelays(_backDelays);
    Settings.backDelays = _backDelays;
  };

  return {
    backButtonMappings,
    backDelays,
    updateBackButtonMappings,
    updateBackDelays,
  };
};
