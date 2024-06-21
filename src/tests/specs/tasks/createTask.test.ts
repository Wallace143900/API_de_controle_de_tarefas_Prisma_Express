import { describe, it, expect } from "vitest";
import { request } from "../../setupFiles";

describe("create task", () => {
  it("should be able to create a task without category successfully", async () => {
    const task = {
      title: "Lorem ipsum",
      content: "Lorem ipsum",
    };

    const response = await request.post("/tasks").send(task);

    const expectedBody = {
      id: expect.any(Number),
      title: task.title,
      content: task.content,
      finished: false,
      categoryId: null,
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(201);
  });

  it("should return an error when creating a task in a non existing category id", async () => {
    const taskWithInvalidCategory = {
      title: "Lorem ipsum",
      content: "Lorem ipsum",
      categoryId: 1,
    };

    const response = await request.post("/tasks").send(taskWithInvalidCategory);

    const expectedBody = {
      message: "Category not found",
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(404);
  });

  it("should return an error when creating a task with empty body", async () => {
    const response = await request.post("/tasks").send({});

    const expectedBody = {
      errors: [
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["title"],
          message: "Required",
        },
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["content"],
          message: "Required",
        },
      ],
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(400);
  });

  it("should return an error when creating a task with invalid data types", async () => {
    const invalidDataTask = {
      title: 123,
      content: 123,
    };

    const response = await request
      .post("/tasks")
      .send(invalidDataTask)
      .expect(400);

    const expectedBody = {
      errors: [
        {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["title"],
          message: "Expected string, received number",
        },
        {
          code: "invalid_type",
          expected: "string",
          received: "number",
          path: ["content"],
          message: "Expected string, received number",
        },
      ],
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(400);
  });
});
