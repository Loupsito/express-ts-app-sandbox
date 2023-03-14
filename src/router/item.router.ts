import express, { Request, Response } from "express";
import { validateRequest } from "../infrastructure/middleware/validate-request";
import { CreateItemDto } from "../infrastructure/api/dto/create-item.dto";

export function itemsRouter() {
  const router = express.Router();

  let data: any[] = [];

  router.post(
    "/",
    validateRequest(CreateItemDto),
    (req: Request, res: Response) => {
      const newItem = req.body;
      data.push(newItem);
      res.send("Item added successfully!");
    }
  );

  router.get("/", (req: Request, res: Response) => {
    res.json(data);
  });

  router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    data[id] = req.body;
    res.send("Item updated successfully!");
  });

  router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    data.splice(id, 1);
    res.send("Item deleted successfully!");
  });

  return router;
}
