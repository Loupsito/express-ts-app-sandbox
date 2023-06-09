import { UserApi } from "./infrastructure/api/user.api";
import { UserHelper } from "./domain/helper/user.helper";
import { userRouter } from "./router/user.router";
import { itemsRouter } from "./router/item.router";
import express from "express";
import { HttpService } from "./lib/http.service";

export const appConfigRouter = express.Router();

const httpService = new HttpService();

const userApi = new UserApi(httpService);
const userHelper = new UserHelper();

console.log("instance !");

appConfigRouter.use("/users", userRouter(userApi, userHelper));
appConfigRouter.use("/items", itemsRouter());
