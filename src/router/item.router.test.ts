import { CreateItemDto } from "../infrastructure/api/dto/create-item.dto";
import express from "express";
import { itemsRouter } from "./item.router";
import request from "supertest";

describe("Items Router", () => {
  let app: any;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/items", itemsRouter());
  });

  it("should return empty array on GET /items", async () => {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should create a new item on POST /items", async () => {
    const newItem: CreateItemDto = {
      name: "Test Item",
      age: 26,
      nationality: "french",
    };

    const responsePost = await request(app)
      .post("/items")
      .send(newItem)
      .set("Accept", "application/json");

    expect(responsePost.statusCode).toBe(200);
    expect(responsePost.text).toBe("Item added successfully!");

    const responseGet = await request(app).get("/items");
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body).toEqual([newItem]);
  });

  it("should update an existing item on PUT /items/:id", async () => {
    const newItem: CreateItemDto = {
      name: "Test Item updated",
      age: 26,
      nationality: "french",
    };

    const response1 = await request(app).get("/items");
    const id = response1.body[0].id;

    const response2 = await request(app)
      .put(`/items/${id}`)
      .send(newItem)
      .set("Accept", "application/json");

    expect(response2.statusCode).toBe(200);
    expect(response2.text).toBe("Item updated successfully!");

    const responseGet = await request(app).get("/items");
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body).toEqual([newItem]);
  });

  it("should delete an existing item on DELETE /items/:id", async () => {
    // GIVEN
    const newItem: CreateItemDto = {
      name: "Test Item updated",
      age: 26,
      nationality: "french",
    };
    await request(app)
      .post("/items")
      .send(newItem)
      .set("Accept", "application/json");

    // WHEN
    const response1 = await request(app).get("/items");
    const id = response1.body[0].id;
    const response2 = await request(app).delete(`/items/${id}`);

    // THEN
    expect(response2.statusCode).toBe(200);
    expect(response2.text).toBe("Item deleted successfully!");

    const response3 = await request(app).get("/items");
    expect(response3.body).toEqual([]);
  });
});
