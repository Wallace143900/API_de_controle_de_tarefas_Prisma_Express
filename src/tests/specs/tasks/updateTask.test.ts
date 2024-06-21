import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../database/prisma";
import { request } from "../../setupFiles";

describe("update task", () => {
  beforeEach(async () => {
    const createdCategory = await prisma.category.create({
      data: { name: "Example" },
    });

    const taskDataList = [
      {
        title: "Lorem ipsum",
        content: "Lorem ipsum",
      },
      {
        title: "Lorem ipsum",
        content: "Lorem ipsum",
        categoryId: createdCategory?.id,
      },
    ];

    await prisma.task.createMany({ data: taskDataList });
  });

  it("should be able to update a task successfully", async () => {
    const task = await prisma.task.findFirst();

    const updateTask = {
      title: "Updated title",
      content: "Updated content",
      finished: true,
    };

    const response = await request.patch(`/tasks/${task?.id}`).send(updateTask);

    const expectedBody = {
      id: expect.any(Number),
      title: updateTask.title,
      content: updateTask.content,
      finished: updateTask.finished,
      categoryId: null,
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(200);
  });

  it("should return an error updating a task with non existing id", async () => {
    const response = await request.patch("/tasks/99999");

    const expectedBody = {
      message: "Task not found",
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(404);
  });

  it("should return an error updating a task with invalid data types", async () => {
    const invalidDataUpdateTask = {
      title: 123,
      content: 123,
      finished: "testing",
    };

    const task = await prisma.task.findFirst();
    const response = await request
      .patch(`/tasks/${task?.id}`)
      .send(invalidDataUpdateTask);

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
        {
          code: "invalid_type",
          expected: "boolean",
          received: "string",
          path: ["finished"],
          message: "Expected boolean, received string",
        },
      ],
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(400);
  });
});
