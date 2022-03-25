import { LocationUser } from "../../shared/types";
import { getLocationsByRole } from "./getLocations.routing";

export const getLocations = (user: LocationUser, locationID?: number) =>
  getLocationsByRole(user, Number(locationID));
