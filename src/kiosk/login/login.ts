import { authorize } from "kiosk/authorize/authorize";
import { canAuthorize } from "kiosk/canAuthorize/canAuthorize";
import { logAuthenticate } from "kiosk/logAuthenticate/logAuthenticate";
import { getLocations } from "locations";
import moment from "moment";
import { KioskDeviceLogin, Restaurant } from "shared/types";
import { getUserById } from "users/getUser/getUser";

enum Status {
  Ok = "Okay",
  BadRequest = "Bad Request",
  Unauthorized = "Unauthorized",
}

type KioskLoginResponse = {
  status: Status;
  locations: Array<Restaurant>;
  message?: string;
};

export const login = async (
  userId: number,
  deviceId: string,
  support: boolean,
  loginData: KioskDeviceLogin
): Promise<KioskLoginResponse> => {
  const user = await getUserById(userId);
  const locations = await getLocations(user);

  if (locations.length === 0) {
    return {
      status: Status.BadRequest,
      message: "No locations found",
      locations: new Array<Restaurant>(),
    };
  } else if (locations.length === 1) {
    const locationId = locations[0].RestaurantID;
    const duration = support ? 3600 : 0;
    const authExpiration = duration == 0 ? 0 : moment().unix() + duration;

    if (
      user.group_id > 1 &&
      !support &&
      (await canAuthorize(deviceId, locationId))
    ) {
      return {
        status: Status.Unauthorized,
        locations: locations,
        message:
          "Max Device Limit Reached. Please contact your local reseller to change your billing plan",
      };
    } else if (
      await authorize(deviceId, locationId, user, new Date(), authExpiration)
    ) {
      logAuthenticate(
        locationId,
        deviceId,
        loginData,
        new Date(),
        authExpiration
      );

      return {
        status: Status.Ok,
        locations: locations,
      };
    } else {
      return {
        status: Status.Unauthorized,
        message: "Could not authenticate",
        locations: new Array<Restaurant>(),
      };
    }
  } else {
    return {
      status: Status.Ok,
      locations: locations,
    };
  }
};
