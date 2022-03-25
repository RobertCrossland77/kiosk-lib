import { SpecialAccounts } from "../../../shared/types";
import { canAuthorize } from "../canAuthorize";
import * as db from "../canAuthorize.db";

describe("canAuthorize function", () => {
  it("returns true if location attached account type is Heartland Admin", async () => {
    // arrange
    const getBillingTypeInfo = jest.spyOn(db, "getBillingTypeInfo");
    getBillingTypeInfo.mockResolvedValue([
      {
        NumTerminalsKiosk: 0,
        AccountID: SpecialAccounts.HeartlandAdmin,
        IsDealer: 0,
        IsDemo: 0,
      },
    ]);
    const locationId = 1;
    const deviceId = "abc-123";

    // act
    const result = await canAuthorize(deviceId, locationId);

    // assert
    expect(result).toBe(true);
  });

  it("returns true if location attached account type is Global Restaurant Admin", async () => {
    // arrange
    const getBillingTypeInfo = jest.spyOn(db, "getBillingTypeInfo");
    getBillingTypeInfo.mockResolvedValue([
      {
        NumTerminalsKiosk: 0,
        AccountID: SpecialAccounts.GlobalRestaurantAdmin,
        IsDealer: 0,
        IsDemo: 0,
      },
    ]);
    const locationId = 1;
    const deviceId = "abc-123";

    // act
    const result = await canAuthorize(deviceId, locationId);

    // assert
    expect(result).toBe(true);
  });

  it("returns true if location attached account type is Mobile Bytes Demo", async () => {
    // arrange
    const getBillingTypeInfo = jest.spyOn(db, "getBillingTypeInfo");
    getBillingTypeInfo.mockResolvedValue([
      {
        NumTerminalsKiosk: 0,
        AccountID: SpecialAccounts.MobileBytesDemo,
        IsDealer: 0,
        IsDemo: 0,
      },
    ]);
    const locationId = 1;
    const deviceId = "abc-123";

    // act
    const result = await canAuthorize(deviceId, locationId);

    // assert
    expect(result).toBe(true);
  });

  it("returns true if location devices are less than the number of terminals they are permitted", async () => {
    // arrange
    const getBillingTypeInfo = jest.spyOn(db, "getBillingTypeInfo");
    getBillingTypeInfo.mockResolvedValue([
      {
        NumTerminalsKiosk: 2,
        AccountID: 65432, // not a special account id
        IsDealer: 0,
        IsDemo: 0,
      },
    ]);

    const getDeviceCountInfo = jest.spyOn(db, "getDeviceCountInfo");
    getDeviceCountInfo.mockResolvedValue(1); // less than 2 which we set for NumTerminalsKiosk
    const locationId = 1;
    const deviceId = "abc-123";

    // act
    const result = await canAuthorize(deviceId, locationId);

    // assert
    expect(result).toBe(true);
  });

  it("if user attached account is not Heartland Admin, Global Restaurant Admin, Mobile Bytes Demo and the user has no devices left permitted return false", async () => {
    // arrange
    const getBillingTypeInfo = jest.spyOn(db, "getBillingTypeInfo");
    getBillingTypeInfo.mockResolvedValue([
      {
        NumTerminalsKiosk: 2,
        AccountID: 65432, // not a special account id
        IsDealer: 0,
        IsDemo: 0,
      },
    ]);

    const getDeviceCountInfo = jest.spyOn(db, "getDeviceCountInfo");
    getDeviceCountInfo.mockResolvedValue(3); // more than 2 which we set for NumTerminalsKiosk
    const locationId = 1;
    const deviceId = "abc-123";

    // act
    const result = await canAuthorize(deviceId, locationId);

    // assert
    expect(result).toBe(false);
  });
});
