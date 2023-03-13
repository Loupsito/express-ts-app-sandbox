import express, { Request, Response } from "express";
import { validateRequest } from "../infrastructure/middleware/validate-request";
import {CreateItemDto} from "../infrastructure/api/dto/create-item.dto";

export const itemsRouter = express.Router();

let data: any[] = [];

itemsRouter.post(
  "/",
  validateRequest(CreateItemDto),
  (req: Request, res: Response) => {
    const newItem = req.body;
    data.push(newItem);
    res.send("Item added successfully!");
  }
);

itemsRouter.get("/", (req: Request, res: Response) => {
  res.json(data);
});

itemsRouter.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  data[id] = req.body;
  res.send("Item updated successfully!");
});

itemsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  data.splice(id, 1);
  res.send("Item deleted successfully!");
});
