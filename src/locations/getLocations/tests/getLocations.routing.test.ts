import * as routing from "../getLocations.routing";
import * as db from "../getLocations.db";
import {
  Group,
  LocationUser,
  SpecialAccounts,
  Restaurant,
} from "../../../shared/types";

describe("getLocations.routing module", () => {
  describe("getLocationsByRole function", () => {
    it("routes to getAdminLocations for admins", async () => {
      // arrange
      const getAdminLocations = jest.spyOn(routing, "getAdminLocations");
      getAdminLocations.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 1,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getLocationsByRole(user, locationID);

      // assert
      expect(getAdminLocations).toHaveBeenCalledWith(user, locationID);

      getAdminLocations.mockRestore();
    });

    it("routes to getDealerLocations for dealers", async () => {
      // arrange
      const getDealerLocations = jest.spyOn(routing, "getDealerLocations");
      getDealerLocations.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 1,
        group_id: Group.dealer,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getLocationsByRole(user, locationID);

      // assert
      expect(getDealerLocations).toHaveBeenCalledWith(user, locationID);

      getDealerLocations.mockRestore();
    });

    it("routes to getMemberLocations", async () => {
      // arrange
      const getMemberLocations = jest.spyOn(routing, "getMemberLocations");
      getMemberLocations.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 1,
        group_id: Group.members,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getLocationsByRole(user, locationID);

      // assert
      expect(getMemberLocations).toHaveBeenCalledWith(user, locationID);

      getMemberLocations.mockRestore();
    });

    it("returns empty array otherwise", async () => {
      // arrange
      const user: LocationUser = {
        id: 1,
        group_id: Group.sales,
        account_id: SpecialAccounts.HeartlandDirect,
        account_admin: true,
      };

      const locationID = 1;

      // act
      const result = await routing.getLocationsByRole(user, locationID);

      // assert
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toEqual(0);
    });
  });

  describe("getAdminLocations function", () => {
    it("throws error if user is not an admin", async () => {
      // arrange
      const user: LocationUser = {
        id: 1,
        group_id: Group.members, // not an admin
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      try {
        await routing.getAdminLocations(user, locationID);
      } catch (e) {
        // assert
        expect(e instanceof Error).toBe(true);
        expect((e as Error).message).toEqual(
          "Unauthorized: Passed in user must have admin role"
        );
      }
    });

    it("routes to getLocationsForGlobalRestaurantAdmin if admin is a GlobalRestaurantAdmin", async () => {
      // arrange
      const getLocationsForGlobalRestaurantAdmin = jest.spyOn(
        db,
        "getLocationsForGlobalRestaurantAdmin"
      );
      getLocationsForGlobalRestaurantAdmin.mockResolvedValue(
        new Array<Restaurant>()
      );

      const user: LocationUser = {
        id: 5,
        group_id: Group.admin,
        account_id: SpecialAccounts.GlobalRestaurantAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getAdminLocations(user, locationID);

      // assert
      expect(getLocationsForGlobalRestaurantAdmin).toHaveBeenCalledTimes(1);
      expect(getLocationsForGlobalRestaurantAdmin).toHaveBeenCalledWith(
        locationID
      );

      getLocationsForGlobalRestaurantAdmin.mockRestore();
    });

    it("routes to getLocationsForHeartlandAdmin if admin is a HeartlandAdmin", async () => {
      // arrange
      const getLocationsForHeartlandAdmin = jest.spyOn(
        db,
        "getLocationsForHeartlandAdmin"
      );
      getLocationsForHeartlandAdmin.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 5,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getAdminLocations(user, locationID);

      // assert
      expect(getLocationsForHeartlandAdmin).toHaveBeenCalledTimes(1);
      expect(getLocationsForHeartlandAdmin).toHaveBeenCalledWith(locationID);

      getLocationsForHeartlandAdmin.mockRestore();
    });

    it("throws an error if the admin is not a GlobalRestaurantAdmin or HeartlandAdmin", async () => {
      // arrange
      const user: LocationUser = {
        id: 5,
        group_id: Group.admin,
        account_id: 1, // an id that is not -8888 or -9999
        account_admin: true,
      };

      const locationID = 1;

      // act
      try {
        await routing.getAdminLocations(user, locationID);
      } catch (e) {
        // assert
        expect(e instanceof Error).toBe(true);
        expect((e as Error).message).toEqual(
          "An admin must be a Global Resteraunt Admin or a Heartland Admin"
        );
      }
    });
  });

  describe("getDealerLocations function", () => {
    it("throws error if user is not a dealer", async () => {
      // arrange
      const user: LocationUser = {
        id: 1,
        group_id: Group.admin, // not a dealer
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      try {
        await routing.getDealerLocations(user, locationID);
      } catch (e) {
        // assert
        expect(e instanceof Error).toBe(true);
        expect((e as Error).message).toEqual(
          "Unauthorized: Passed in user must have dealer role"
        );
      }
    });

    it("routes to getLocationsForGlobalRestaurantAdmin if dealer is a GlobalRestaurantAdmin", async () => {
      // arrange
      const getLocationsForGlobalRestaurantAdmin = jest.spyOn(
        db,
        "getLocationsForGlobalRestaurantAdmin"
      );
      getLocationsForGlobalRestaurantAdmin.mockResolvedValue(
        new Array<Restaurant>()
      );

      const user: LocationUser = {
        id: 5,
        group_id: Group.dealer,
        account_id: SpecialAccounts.GlobalRestaurantAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getDealerLocations(user, locationID);

      // assert
      expect(getLocationsForGlobalRestaurantAdmin).toHaveBeenCalledTimes(1);
      expect(getLocationsForGlobalRestaurantAdmin).toHaveBeenCalledWith(
        locationID
      );

      getLocationsForGlobalRestaurantAdmin.mockRestore();
    });

    it("routes to getLocationsForHeartlandAdmin if dealer is a HeartlandAdmin", async () => {
      // arrange
      const getLocationsForHeartlandAdmin = jest.spyOn(
        db,
        "getLocationsForHeartlandAdmin"
      );
      getLocationsForHeartlandAdmin.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 5,
        group_id: Group.dealer,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getDealerLocations(user, locationID);

      // assert
      expect(getLocationsForHeartlandAdmin).toHaveBeenCalledTimes(1);
      expect(getLocationsForHeartlandAdmin).toHaveBeenCalledWith(locationID);

      getLocationsForHeartlandAdmin.mockRestore();
    });

    it("routes to getLocationsForAccountAdminDealer if the dealer is not a HeartlandAdmin or a GlobalRestaurantAdmin but is an account_admin", async () => {
      // arrange
      const getLocationsForAccountAdminDealer = jest.spyOn(
        db,
        "getLocationsForAccountAdminDealer"
      );
      getLocationsForAccountAdminDealer.mockResolvedValue(
        new Array<Restaurant>()
      );

      const user: LocationUser = {
        id: 5,
        group_id: Group.dealer,
        account_id: SpecialAccounts.HeartlandDirect,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getDealerLocations(user, locationID);

      // assert
      expect(getLocationsForAccountAdminDealer).toHaveBeenCalledTimes(1);
      expect(getLocationsForAccountAdminDealer).toHaveBeenCalledWith(
        user,
        locationID
      );

      getLocationsForAccountAdminDealer.mockRestore();
    });

    it("routes to getLocationsForDealer is dealer is not a GlobalResaurantAdmin, not a HeartlandAdmin, and not an account_admin", async () => {
      // arrange
      const getLocationsForDealer = jest.spyOn(db, "getLocationsForDealer");
      getLocationsForDealer.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 5,
        group_id: Group.dealer,
        account_id: SpecialAccounts.HeartlandDirect,
        account_admin: false,
      };

      const locationID = 1;

      // act
      await routing.getDealerLocations(user, locationID);

      // assert
      expect(getLocationsForDealer).toHaveBeenCalledTimes(1);
      expect(getLocationsForDealer).toHaveBeenCalledWith(user, locationID);

      getLocationsForDealer.mockRestore();
    });
  });

  describe("getMemberLocations function", () => {
    it("throws error if user is not a member", async () => {
      // arrange
      const user: LocationUser = {
        id: 1,
        group_id: Group.admin, // not a member
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      const locationID = 1;

      // act
      try {
        await routing.getMemberLocations(user, locationID);
      } catch (e) {
        // assert
        expect(e instanceof Error).toBe(true);
        expect((e as Error).message).toEqual(
          "Unauthorized: Passed in user must have members role"
        );
      }
    });

    it("routes to getLocationsForAccountAdminMember if the member is an account admin", async () => {
      // arrange
      const getLocationsForAccountAdminMember = jest.spyOn(
        db,
        "getLocationsForAccountAdminMember"
      );
      getLocationsForAccountAdminMember.mockResolvedValue(
        new Array<Restaurant>()
      );

      const user: LocationUser = {
        id: 5,
        group_id: Group.members,
        account_id: 100,
        account_admin: true,
      };

      const locationID = 1;

      // act
      await routing.getMemberLocations(user, locationID);

      // assert
      expect(getLocationsForAccountAdminMember).toHaveBeenCalledTimes(1);
      expect(getLocationsForAccountAdminMember).toHaveBeenCalledWith(
        user,
        locationID
      );

      getLocationsForAccountAdminMember.mockRestore();
    });

    it("routes to getLocationsForMember if the member is not an account admin", async () => {
      // arrange
      const getLocationsForMember = jest.spyOn(db, "getLocationsForMember");
      getLocationsForMember.mockResolvedValue(new Array<Restaurant>());

      const user: LocationUser = {
        id: 5,
        group_id: Group.members,
        account_id: 100,
        account_admin: false,
      };

      const locationID = 1;

      // act
      await routing.getMemberLocations(user, locationID);

      // assert
      expect(getLocationsForMember).toHaveBeenCalledTimes(1);
      expect(getLocationsForMember).toHaveBeenCalledWith(user, locationID);

      getLocationsForMember.mockRestore();
    });
  });
});
