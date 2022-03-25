import { KioskDeviceAuthLog, KioskDeviceLogin } from "../../shared/types";
import {
  deviceAuthLogKioskInsert,
  authorizedKioskDevicesUpdate,
} from "./logAuthenticate.db";

export const logAuthenticate = async (
  locationId: number,
  deviceId: string,
  loginData: KioskDeviceLogin,
  createdUpdatedWhen: Date,
  authExpiration: number = 0
) => {
  const log: KioskDeviceAuthLog = {
    deviceId: deviceId,
    locationId: locationId,
    ipAddress: loginData.ip ? loginData.ip : "",
    hardware: loginData.hw ? loginData.ip : "",
    version: loginData.v && loginData.v.app ? loginData.v.app : "",
    os: loginData.v && loginData.v.os ? loginData.v.os : "",
    createdUpdatedWhen: createdUpdatedWhen,
    deviceName: loginData.name ? loginData.name : "",
    originalDeviceHash:
      loginData.hid && loginData.hid !== "(null)" ? loginData.hid : "",
    authExpiration: authExpiration,
  };

  await deviceAuthLogKioskInsert(log);
  await authorizedKioskDevicesUpdate(log);
};
