import client from "../../client";
import { LocationUser } from "../../shared/types";

export const authorize = async (
  deviceId: string,
  locationId: number,
  user: LocationUser,
  createdWhen: Date,
  authExpiration: number
) => {
  try {
    const createResult = await client.tblAuthorizedKioskDevices.upsert({
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
    });

    return true;
  } catch (e) {
    // Not sure this is the best way to return a false.
    // If the db is down or something we would want
    // that to bubble up. I can't think of an instance
    // where false is what we want but that is what was
    // in the original PHP code this was copied from.
    return false;
  }
};
