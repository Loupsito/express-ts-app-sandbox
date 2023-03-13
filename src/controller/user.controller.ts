import express, { Request, Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { useContainer } from "class-validator";

import { UserHelper } from "../domain/helper/user.helper";
import { UserApi } from "../infrastructure/api/user.api";

useContainer(Container);

export const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Users Page!");
});

usersRouter.get("/profile/:username", (req: Request, res: Response) => {
  const username = req.params.username;
  res.send(`Welcome to ${username}'s profile page!`);
});

usersRouter.get(
  "/profile/:username/details",
  async (req: Request, res: Response) => {
    const userApi = Container.get(UserApi);
    const userHelper = Container.get(UserHelper);

    const userDetails = await userApi.getUserDetails({ userId: 1 });
    const titleLength = userHelper.getTitleLength(userDetails);

    res.send({ userDetails, titleLength });
  }
);
