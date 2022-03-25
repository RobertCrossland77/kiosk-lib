import { KioskDeviceAuthLog } from "../../shared/types";
import client from "../../client";

export const deviceAuthLogKioskInsert = (log: KioskDeviceAuthLog) =>
  client.tblDeviceAuthLogKiosk.create({
    data: {
      DeviceID: log.deviceId,
      LocationID: log.locationId,
      IPAddress: log.ipAddress,
      Hardware: log.hardware,
      Version: log.version,
      CreatedWhen: log.createdUpdatedWhen,
      DeviceName: log.deviceName,
      OrigDeviceHash: log.originalDeviceHash,
      AuthExpiration: log.authExpiration,
    },
  });

export const authorizedKioskDevicesUpdate = (kioskDevice: KioskDeviceAuthLog) =>
  client.tblAuthorizedKioskDevices.update({
    where: {
      DeviceID: kioskDevice.deviceId,
    },
    data: {
      IPAddress: kioskDevice.ipAddress,
      Hardware: kioskDevice.hardware,
      Version: kioskDevice.version,
      DeviceName: kioskDevice.deviceName,
      Software: kioskDevice.os,
      UpdatedWhen: kioskDevice.createdUpdatedWhen,
      OrigDeviceHash: kioskDevice.originalDeviceHash,
      AuthExpiration: kioskDevice.authExpiration,
      Disabled: 0,
    },
  });
