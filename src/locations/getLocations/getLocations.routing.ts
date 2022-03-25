import {
  Group,
  LocationUser,
  SpecialAccounts,
  Restaurant,
} from "../../shared/types";
import {
  getLocationsForAccountAdminDealer,
  getLocationsForAccountAdminMember,
  getLocationsForDealer,
  getLocationsForGlobalRestaurantAdmin,
  getLocationsForHeartlandAdmin,
  getLocationsForMember,
} from "./getLocations.db";

export const getLocationsByRole = async (
  user: LocationUser,
  locationID: number
): Promise<Array<Restaurant>> => {
  switch (user.group_id) {
    case Group.admin:
      return await getAdminLocations(user, locationID);
    case Group.dealer:
      return await getDealerLocations(user, locationID);
    case Group.members:
      return await getMemberLocations(user, locationID);
    default:
      return Promise.resolve([] as Array<Restaurant>);
  }
};

export const getAdminLocations = (user: LocationUser, location: number) => {
  groupGuard(user.group_id, Group.admin);

  if (user.account_id === SpecialAccounts.GlobalRestaurantAdmin) {
    return getLocationsForGlobalRestaurantAdmin(location);
  } else if (user.account_id === SpecialAccounts.HeartlandAdmin) {
    return getLocationsForHeartlandAdmin(location);
  } else {
    throw new Error(
      "An admin must be a Global Resteraunt Admin or a Heartland Admin"
    );
  }
};

export const getDealerLocations = (user: LocationUser, location: number) => {
  groupGuard(user.group_id, Group.dealer);

  if (user.account_id === SpecialAccounts.GlobalRestaurantAdmin) {
    return getLocationsForGlobalRestaurantAdmin(location);
  } else if (user.account_id === SpecialAccounts.HeartlandAdmin) {
    return getLocationsForHeartlandAdmin(location);
  } else if (Number(user.account_admin) === 1) {
    return getLocationsForAccountAdminDealer(user, location);
  } else {
    return getLocationsForDealer(user, location);
  }
};

export const getMemberLocations = (user: LocationUser, location: number) => {
  groupGuard(user.group_id, Group.members);

  if (Number(user.account_admin) === 1) {
    return getLocationsForAccountAdminMember(user, location);
  } else {
    return getLocationsForMember(user, location);
  }
};

const groupGuard = (userGroup: Group, intendedGroup: Group) => {
  if (userGroup !== intendedGroup) {
    throw new Error(
      `Unauthorized: Passed in user must have ${Group[intendedGroup]} role`
    );
  }
};
