import { Container, Service } from "typedi";
import { UserDetails } from "../../domain/model/user-detail";
import { HttpService } from "../../lib/http.service";
import "reflect-metadata";
import { useContainer } from "class-validator";

useContainer(Container);

@Service()
export class UserApi {
  constructor(private readonly httpService: HttpService) {}
  async getUserDetails(user: { userId: number }): Promise<UserDetails> {
    const result = await this.httpService.get(
      `https://jsonplaceholder.typicode.com/todos/${user.userId}`
    );
    return result.data;
  }
}
