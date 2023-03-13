import { UserDetails } from "../model/user-detail";
import { Service } from "typedi";

@Service()
export class UserHelper {
  getTitleLength(user: UserDetails) {
    return user.title.length;
  }
}
