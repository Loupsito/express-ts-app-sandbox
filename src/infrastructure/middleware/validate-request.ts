import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";

export function validateRequest<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let dto: object = plainToInstance(dtoClass, req.body);

    let errors = await validate(dto, {
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
    });

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    req.body = dto;
    next();
  };
}
