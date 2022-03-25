import client from "../../client";
import { LocationUser } from "../../shared/types";

export const getUserById = (userId: number): Promise<LocationUser> =>
  client.$queryRaw`
    SELECT 
	    users.id,
	    users.group_id,
	    meta.account_id,
	    meta.account_admin
    FROM users 
	    INNER JOIN meta
		    ON users.id = meta.user_id
    WHERE users.id = ${userId};
  `;

export const getUserByEmail = (email: string): Promise<LocationUser> =>
  client.$queryRaw`
    SELECT 
	    users.id,
	    users.group_id,
	    meta.account_id,
	    meta.account_admin
    FROM users 
	    INNER JOIN meta
		    ON users.id = meta.user_id
    WHERE users.id = ${email};
  `;
