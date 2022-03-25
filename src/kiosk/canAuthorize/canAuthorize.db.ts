import client from "../../client";
import { BillingTypeInfo } from "../../shared/types";

export const getBillingTypeInfo = async (
  locationId: number
): Promise<Array<BillingTypeInfo>> =>
  serializeGetBillingTypeInfo(
    await client.tblLocations.findMany({
      select: {
        NumTerminalsKiosk: true,
        AccountID: true,
        tblAccounts: {
          select: {
            IsDealer: true,
            IsDemo: true,
          },
        },
      },
      where: {
        PKID: locationId,
      },
    })
  );

export const getDeviceCountInfo = async (
  deviceId: string,
  locationId: number
): Promise<number> =>
  (
    await client.tblAuthorizedKioskDevices.aggregate({
      _count: {
        DeviceID: true,
      },
      where: {
        AND: {
          LocationID: locationId,
          GroupID: 1,
          AuthExpiration: 0,
          DeviceID: {
            not: deviceId,
          },
          Disabled: 0,
        },
      },
    })
  )._count.DeviceID;

const serializeGetBillingTypeInfo = (
  billingInfos: Array<{
    NumTerminalsKiosk: number;
    AccountID: number;
    tblAccounts: {
      IsDealer: number;
      IsDemo: number;
    };
  }>
): Array<BillingTypeInfo> =>
  billingInfos.map((bi) => {
    return {
      NumTerminalsKiosk: bi.NumTerminalsKiosk,
      AccountID: bi.AccountID,
      IsDealer: bi.tblAccounts.IsDealer,
      IsDemo: bi.tblAccounts.IsDemo,
    };
  });
