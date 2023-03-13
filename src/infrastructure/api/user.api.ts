import { Container, Service } from "typedi";
import { UserDetails } from "../../domain/model/user-detail";
import { HttpService } from "../../lib/http.service";
import "reflect-metadata";
import { useContainer } from "class-validator";

useContainer(Container);

@Service()
export class UserApi {
  async getUserDetails(user: { userId: number }): Promise<UserDetails> {
    const httpService = Container.get(HttpService);
    const result = await httpService.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return result.data;
  }
}
