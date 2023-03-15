import { UserDetails } from "../../domain/model/user-detail";
import { HttpService } from "../../lib/http.service";
import "reflect-metadata";

export class UserApi {
  constructor(private readonly httpService: HttpService) {}
  async getUserDetails(user: { userId: number }): Promise<UserDetails> {
    const result = await this.httpService.get(
      `https://jsonplaceholder.typicode.com/todos/${user.userId}`
    );
    return result.data;
  }
}
