import {
  tblAuthorizedKioskDevices,
  tblDeviceAuthLogKiosk,
} from "@prisma/client";
import { KioskDeviceAuthLog, KioskDeviceLogin } from "../../../shared/types";
import { logAuthenticate } from "../logAuthenticate";
import * as db from "../logAuthenticate.db";

describe("logAuthenticate function", () => {
  it("calls deviceAuthLogKioskInsert with created object", async () => {
    // arrange
    const deviceAuthLogKioskInsert = jest.spyOn(db, "deviceAuthLogKioskInsert");
    deviceAuthLogKioskInsert.mockResolvedValue({} as tblDeviceAuthLogKiosk);

    const deviceId = "abc-123";
    const locationId = 1;
    const createdUpdatedWhen = new Date();
    const log: KioskDeviceLogin = {
      ip: "127.0.0.1",
      hw: "stuff",
      name: "test",
      hid: "stuff",
      v: {
        app: "1",
        os: "osx",
      },
    };

    const expectation: KioskDeviceAuthLog = {
      deviceId: deviceId,
      locationId: locationId,
      ipAddress: log.ip,
      hardware: log.ip,
      version: log.v?.app,
      os: log.v?.os,
      createdUpdatedWhen: new Date(),
      deviceName: log.name,
      originalDeviceHash: log.hid,
      authExpiration: 0,
    };

    // act
    await logAuthenticate(locationId, deviceId, log, createdUpdatedWhen);

    // assert
    expect(deviceAuthLogKioskInsert).toHaveBeenCalledTimes(1);
    expect(deviceAuthLogKioskInsert).toHaveBeenCalledWith(expectation);
  });

  it("calls authorizedKioskDevicesUpdate with created object", async () => {
    // arrange
    const authorizedKioskDevicesUpdate = jest.spyOn(
      db,
      "authorizedKioskDevicesUpdate"
    );
    authorizedKioskDevicesUpdate.mockResolvedValue(
      {} as tblAuthorizedKioskDevices
    );

    const deviceId = "abc-123";
    const locationId = 1;
    const createdUpdatedWhen = new Date();
    const log: KioskDeviceLogin = {
      ip: "127.0.0.1",
      hw: "stuff",
      name: "test",
      hid: "stuff",
      v: {
        app: "1",
        os: "osx",
      },
    };

    const expectation: KioskDeviceAuthLog = {
      deviceId: deviceId,
      locationId: locationId,
      ipAddress: log.ip,
      hardware: log.ip,
      version: log.v?.app,
      os: log.v?.os,
      createdUpdatedWhen: new Date(),
      deviceName: log.name,
      originalDeviceHash: log.hid,
      authExpiration: 0,
    };

    // act
    await logAuthenticate(locationId, deviceId, log, createdUpdatedWhen);

    // assert
    expect(authorizedKioskDevicesUpdate).toHaveBeenCalledTimes(1);
    expect(authorizedKioskDevicesUpdate).toHaveBeenCalledWith(expectation);
  });
});
