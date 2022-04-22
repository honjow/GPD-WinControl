// import { useEffect, useState } from "react";

// import { ServerAPI } from "decky-frontend-lib";

export class Settings {
  private static _instance: Settings = new Settings();
  
  private _showMouseMapping: boolean = false;
  public static get showMouseMapping(): boolean {
    return this._instance._showMouseMapping;
  }
  public static set showMouseMapping(value: boolean) {
    this._instance._showMouseMapping = value;
  }
}
