import { UserDetails } from "../model/user-detail";

export class UserHelper {
  getTitleLength(user: UserDetails) {
    return user.title.length;
  }
}
