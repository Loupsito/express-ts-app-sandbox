import express from "express";
import bodyParser from "body-parser";
import { logRequestDetails } from "./infrastructure/middleware/http-logger.helper";
import errorHandler from "./infrastructure/middleware/http-error-handler";
import { usersRouter } from "./controller/user.controller";
import { itemsRouter } from "./controller/item.controller";
import { useContainer as useClassValidatorContainer } from "class-validator";
import { Container } from "typedi";

const app = express();

useClassValidatorContainer(Container, {
  fallback: true,
  fallbackOnErrors: true,
});

app.use(bodyParser.json());
app.use(logRequestDetails);
app.use(errorHandler);

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});