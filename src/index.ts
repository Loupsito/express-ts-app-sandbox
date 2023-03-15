import express from "express";
import bodyParser from "body-parser";
import { logRequestDetails } from "./infrastructure/middleware/http-logger.helper";
import errorHandler from "./infrastructure/middleware/http-error-handler";
import { appConfigRouter } from "./app-config-router";

const app = express();
app.use(bodyParser.json());
app.use(logRequestDetails);
app.use(errorHandler);
app.use(appConfigRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
