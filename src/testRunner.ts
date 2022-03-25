import { getLocations } from "./locations";
import { authorize, canAuthorize, logAuthenticate } from "./kiosk";
import { Group, LocationUser } from "./shared/types";
import moment from "moment";
import { getDeviceCountInfo } from "./kiosk/canAuthorize/canAuthorize.db";

(async () => {
  // getLocationsForGlobalRestaurantAdmin with location
  // console.log(
  //   await getLocations(
  //     {
  //       id: 14816,
  //       group_id: 1,
  //       account_id: -8888,
  //       account_admin: true,
  //     },
  //     7200
  //   )
  // );
  // getLocationsForGlobalRestaurantAdmin with location
  // console.log(
  //   await getLocations({
  //     id: 14816,
  //     group_id: 1,
  //     account_id: -8888,
  //     account_admin: true,
  //   })
  // );
  // getLocationsForHeartlandAdmin with locationID
  // console.log(
  //   await getLocations(
  //     {
  //       id: 483,
  //       group_id: 1,
  //       account_id: -9999,
  //       account_admin: true,
  //     },
  //     3242
  //   )
  // );
  // getLocationsForHeartlandAdmin w/o locationID
  // console.log(
  //   await getLocations({
  //     id: 483,
  //     group_id: 1,
  //     account_id: -9999,
  //     account_admin: true,
  //   })
  // );
  // getLocationsForAccountAdminDealer with locationID
  // console.log(
  //   await getLocations(
  //     {
  //       id: 645,
  //       group_id: 4,
  //       account_id: 449,
  //       account_admin: true,
  //     },
  //     1740
  //   )
  // );
  // getLocationsForAccountAdminDealer w/o locationID
  // console.log(
  //   await getLocations({
  //     id: 645,
  //     group_id: 4,
  //     account_id: 449,
  //     account_admin: true,
  //   })
  // );
  // getLocationsForAccountDealer with locationID
  // console.log(
  //   await getLocations(
  //     {
  //       id: 14849,
  //       group_id: 4,
  //       account_id: 5599,
  //       account_admin: false,
  //     },
  //     6573
  //   )
  // );
  // // getLocationsForAccountDealer w/o locationID
  // console.log(
  //   await getLocations(
  //     {
  //       id: 14849,
  //       group_id: 4,
  //       account_id: 5599,
  //       account_admin: false,
  //     },
  //     6573
  //   )
  // );
  // getLocationsForAccountAdminMember with locationID
  // console.log(
  //   await getLocations(
  //     {
  //       id: 14934,
  //       group_id: 2,
  //       account_id: 6502,
  //       account_admin: true,
  //     },
  //     7469
  //   )
  // );
  // getLocationsForAccountAdminMember w/o location
  // console.log(
  //   await getLocations({
  //     id: 14934,
  //     group_id: 2,
  //     account_id: 6502,
  //     account_admin: true,
  //   })
  // );
  // getLocationsForMember with location
  // console.log(
  //   await getLocations(
  //     {
  //       id: 9853,
  //       group_id: 2,
  //       account_id: 2988,
  //       account_admin: false,
  //     },
  //     3695
  //   )
  // );
  // getLocationsForMember with location
  // console.log(
  //   await getLocations({
  //     id: 11418,
  //     group_id: 2,
  //     account_id: 3447,
  //     account_admin: false,
  //   })
  // );
  // else (make stuff up)
  // console.log(
  //   await getLocations({
  //     id: 11418123123,
  //     group_id: 3,
  //     account_id: 344712321,
  //     account_admin: false,
  //   })
  // );
  // Kiosk Authorize
  // console.log(
  //   await authorize(
  //     "ABC-123",
  //     8002,
  //     {
  //       id: 1,
  //       group_id: Group.admin,
  //       account_admin: true,
  //       account_id: -9999,
  //     } as LocationUser,
  //     moment().toDate(),
  //     Date.now()
  //   )
  // );
  // Kiosk CanAuthorize
  // console.log(await canAuthorize("23F19828-1978-41B4-9971-523803DE9301", 1));
  // console.log(
  //   await getDeviceCountInfo("00A8357A-30C1-4B79-AB89-E09ED4383926", 8002)
  // );
  // LogAuthenticate
  // console.log(
  //   await logAuthenticate(
  //     1,
  //     "abc-123",
  //     {
  //       ip: "127.0.0.1",
  //       hw: "IPAD 20th Gen",
  //       name: "UltraPad",
  //       hid: "A+#1",
  //       v: {
  //         app: "myapp",
  //         os: "osxx",
  //       },
  //     },
  //     new Date(),
  //     0
  //   )
  // );
})();
