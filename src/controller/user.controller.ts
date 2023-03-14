import express, { Request, Response } from "express";
import "reflect-metadata";
import { Container } from "typedi";
import { useContainer } from "class-validator";

import { UserHelper } from "../domain/helper/user.helper";
import { UserApi } from "../infrastructure/api/user.api";

useContainer(Container);

export function userRouter(userApi: UserApi, userHelper: UserHelper) {
  const router = express.Router();

  router.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Users Page!");
  });

  router.get("/profile/:username", (req: Request, res: Response) => {
    const username = req.params.username;
    res.send(`Welcome to ${username}'s profile page!`);
  });

  router.get(
    "/profile/:username/details",
    async (req: Request, res: Response) => {
      const userDetails = await userApi.getUserDetails({ userId: 1 });
      const titleLength = userHelper.getTitleLength(userDetails);
      res.send({ userDetails, titleLength });
    }
  );

  return router;
}
