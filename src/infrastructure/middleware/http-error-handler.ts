import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ip, method, originalUrl } = req;
  const errorStatus = 500;

  console.error(
    `${ip} - ${method} ${originalUrl} - ${errorStatus} - message: ${err}`
  );
  res.status(errorStatus).send("Something went wrong!");
}
