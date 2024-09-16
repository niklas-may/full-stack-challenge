import { Account,  User} from "@prisma/client";

export type AuthUser = User 
export function requestUser(req: any) {
  return req.user as AuthUser
}
