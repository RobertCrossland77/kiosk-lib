import {
  Group,
  LocationUser,
  SpecialAccounts,
  Restaurant,
} from "../../../shared/types";
import { getLocations } from "../getLocations";
import * as routing from "../getLocations.routing";

describe("getLocations module", () => {
  describe("getLocations method", () => {
    it("calls getLocationByRole to route to proper query for role", () => {
      // arrange
      const getLocationsByRole = jest.spyOn(routing, "getLocationsByRole");
      getLocationsByRole.mockResolvedValue(new Array<Restaurant>());

      const mockUser: LocationUser = {
        id: 1,
        group_id: Group.admin,
        account_id: SpecialAccounts.HeartlandAdmin,
        account_admin: true,
      };

      // act
      getLocations(mockUser, 1);

      // assert
      expect(getLocationsByRole).toHaveBeenCalledWith(mockUser, 1);

      getLocationsByRole.mockRestore();
    });
  });
});
