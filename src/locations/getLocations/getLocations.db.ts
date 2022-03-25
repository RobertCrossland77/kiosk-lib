import client from "../../client";
import { LocationUser, Restaurant } from "../../shared/types";

export const getLocationsForGlobalRestaurantAdmin = (
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
      INNER JOIN tblAccounts dealer
        ON acc.DealerID = dealer.PKID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND (
        acc.DealerID = -8888 OR dealer.DealerID = -8888
      )
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    ORDER BY loc.Name
  `;

export const getLocationsForHeartlandAdmin = (
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    ORDER BY loc.Name
  `;

export const getLocationsForAccountAdminDealer = (
  user: LocationUser,
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM
      tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND (
        acc.PKID = ${user.account_id} 
        OR acc.DealerID = ${user.account_id}
      )
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    UNION ALL
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress 
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
      INNER JOIN tblDealerSupportAccess dsa
        ON acc.DealerID = dsa.SupportDealerID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND dsa.DealerID = ${user.account_id}
      AND acc.IsDemo = 0
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    ORDER BY RestaurantName
  `;

export const getLocationsForDealer = (
  user: LocationUser,
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
      INNER JOIN tblResellerPermissions rp 
        ON acc.PKID = rp.AccountID
          AND rp.UserID = ${user.id}
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1 
      AND (
        acc.PKID = ${user.account_id} 
        OR acc.DealerID = ${user.account_id}
      )
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    UNION ALL
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
      INNER JOIN tblDealerSupportAccess dsa
        ON acc.DealerID = dsa.SupportDealerID
      INNER JOIN tblResellerPermissions rp
        ON acc.PKID = rp.AccountID
          AND rp.UserID = ${user.id}
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND dsa.DealerID = ${user.account_id}
      AND acc.IsDemo = 0
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    ORDER BY RestaurantName
  `;

export const getLocationsForAccountAdminMember = (
  user: LocationUser,
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1
      AND loc.AccountID = ${user.account_id}
      AND (
        loc.PKID = ${locationID}
        OR ${locationID} IS NULL
      )
    ORDER BY loc.Name
  `;

export const getLocationsForMember = (
  user: LocationUser,
  locationID: number
): Promise<Array<Restaurant>> =>
  client.$queryRaw`
    SELECT
      loc.PKID AS RestaurantID,
      loc.Name as RestaurantName,
      CONCAT(
        loc.Address,
        ' ',
        loc.City,
        ', ',
        loc.State,
        ' ',
        loc.PostalCode
      ) AS RestaurantAddress
    FROM tblLocations loc
      INNER JOIN tblAccounts acc
        ON loc.AccountID = acc.PKID
      INNER JOIN tblUserPermissions_V2 up
        ON loc.PKID = up.LocationID
    WHERE
      loc.IsActive = 1
      AND loc.PosActive = 1 
      AND loc.AccountID = ${user.account_id}
      AND up.UserID = ${user.id}
      AND (
        loc.PKID = ${locationID} 
        OR ${locationID} IS NULL
      )
    ORDER BY loc.Name
  `;
