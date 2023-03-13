import { NextFunction, Request, Response } from "express";

export function logRequestDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ip, method, originalUrl } = req;

  res.on("finish", () => {
    const { statusCode, statusMessage } = res;
    console.log(
      `${ip} - ${method} ${originalUrl} - ${statusCode} - ${statusMessage}`
    );
  });

  next();
}
