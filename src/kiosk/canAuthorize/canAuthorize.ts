import { SpecialAccounts } from "../../shared/types";
import { BillingTypeInfo } from "../../shared/types/BillingTypeInfo";
import { getBillingTypeInfo, getDeviceCountInfo } from "./canAuthorize.db";

export const canAuthorize = async (
  deviceId: string,
  locationId: number
): Promise<boolean> => {
  const [isAuthorizedAccount, billingTypeInfo] =
    await isAuthorizedByAccountType(locationId);

  if (isAuthorizedAccount) {
    return true;
  } else {
    return await isAuthorizedByKioskCount(
      deviceId,
      locationId,
      billingTypeInfo?.NumTerminalsKiosk ?? 0
    );
  }
};

const isAuthorizedByKioskCount = async (
  deviceId: string,
  locationId: number,
  numKioskTerminals: number
): Promise<boolean> =>
  (await getDeviceCountInfo(deviceId, locationId)) < numKioskTerminals;

const isAuthorizedByAccountType = async (
  locationId: number
): Promise<[boolean, BillingTypeInfo | undefined]> => {
  const billingTypeInfos = await getBillingTypeInfo(locationId);

  if (billingTypeInfos.length !== 1) {
    return [false, undefined];
  } else {
    const {
      AccountID: accountId,
      IsDealer: isDealer,
      IsDemo: isDemo,
    } = billingTypeInfos[0];

    return [
      isAuthorizedAccountType(accountId, isDealer, isDemo),
      billingTypeInfos[0],
    ];
  }
};

const isAuthorizedAccountType = (
  accountId: number,
  isDealer: number,
  isDemo: number
): boolean => isSpecialAccount(accountId) || isDealerOrDemo(isDealer, isDemo);

const isSpecialAccount = (accountId: number): boolean =>
  accountId === SpecialAccounts.HeartlandAdmin ||
  accountId === SpecialAccounts.GlobalRestaurantAdmin ||
  accountId === SpecialAccounts.MobileBytesDemo;

const isDealerOrDemo = (isDealer: number, isDemo: number): boolean =>
  isDealer === 1 || isDemo === 1;
