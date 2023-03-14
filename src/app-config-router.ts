import { Container } from "typedi";
import { UserApi } from "./infrastructure/api/user.api";
import { UserHelper } from "./domain/helper/user.helper";
import { userRouter } from "./controller/user.controller";
import { itemsRouter } from "./controller/item.controller";
import express from "express";
import { HttpService } from "./lib/http.service";

export const appConfigRouter = express.Router();

const httpService = Container.get(HttpService);

const userApi = new UserApi(httpService);
const userHelper = Container.get(UserHelper);

appConfigRouter.use("/users", userRouter(userApi, userHelper));
appConfigRouter.use("/items", itemsRouter());
