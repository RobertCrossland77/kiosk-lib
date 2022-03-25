import { Group, LocationUser, SpecialAccounts } from "../../../shared/types";
import { authorize } from "../authorize";
import { prismaMock } from "../../../singleton";
import { tblAuthorizedKioskDevices } from "@prisma/client";

describe("kiosk/authorize module", () => {
  describe("authorize function", () => {
    it("calls tblAuthorizedKioskDevices.upsert with provided data", async () => {
      // arrange
      const deviceId = "123-ABC";
      const locationId = 1;
      const user: LocationUser = {
        id: 1,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };
      const createdWhen = new Date();
      const authExpiration = Date.now();

      const expected = {
        where: {
          DeviceID: deviceId,
        },
        create: {
          DeviceID: deviceId,
          LocationID: locationId,
          CreatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
          TimeZone: "CST",
          SetupVersion: 0,
        },
        update: {
          LocationID: locationId,
          UpdatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
        },
      };

      // act
      await authorize(deviceId, locationId, user, createdWhen, authExpiration);

      // assert
      // @ts-ignore
      expect(prismaMock.tblAuthorizedKioskDevices.upsert).toHaveBeenCalledTimes(
        1
      );
      expect(prismaMock.tblAuthorizedKioskDevices.upsert).toHaveBeenCalledWith(
        expected
      );
    });

    it("returns true if the data upsert returns data", async () => {
      // arrange
      const deviceId = "123-ABC";
      const locationId = 1;
      const user: LocationUser = {
        id: 1,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };
      const createdWhen = new Date();
      const authExpiration = Date.now();

      prismaMock.tblAuthorizedKioskDevices.upsert.mockResolvedValue({
        DeviceID: deviceId,
        LocationID: locationId,
        CreatedWhen: createdWhen,
        UserID: user.id,
        GroupID: user.group_id,
      } as tblAuthorizedKioskDevices);

      const expected = {
        where: {
          DeviceID: deviceId,
        },
        create: {
          DeviceID: deviceId,
          LocationID: locationId,
          CreatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
          TimeZone: "CST",
          SetupVersion: 0,
        },
        update: {
          LocationID: locationId,
          UpdatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
        },
      };

      // act
      const result = await authorize(
        deviceId,
        locationId,
        user,
        createdWhen,
        authExpiration
      );

      // assert
      expect(result).toBe(true);
    });

    it("returns false if the data upsert returns null or undefined", async () => {
      // arrange
      const deviceId = "123-ABC";
      const locationId = 1;
      const user: LocationUser = {
        id: 1,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };
      const createdWhen = new Date();
      const authExpiration = Date.now();

      prismaMock.tblAuthorizedKioskDevices.upsert.mockRejectedValue(
        new Error("borked")
      );

      const expected = {
        where: {
          DeviceID: deviceId,
        },
        create: {
          DeviceID: deviceId,
          LocationID: locationId,
          CreatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
          TimeZone: "CST",
          SetupVersion: 0,
        },
        update: {
          LocationID: locationId,
          UpdatedWhen: createdWhen,
          UserID: user.id,
          GroupID: user.group_id,
          AuthExpiration: authExpiration,
        },
      };

      // act
      const result = await authorize(
        deviceId,
        locationId,
        user,
        createdWhen,
        authExpiration
      );

      // assert
      expect(result).toBe(false);
    });
  });
});
