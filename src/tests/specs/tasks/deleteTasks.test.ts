import { beforeEach, describe, it, expect } from "vitest";
import { prisma } from "../../../database/prisma";
import { request } from "../../setupFiles";

describe("delete task", () => {
  beforeEach(async () => {
    const task = {
      title: "Lorem ipsum",
      content: "Lorem ipsum",
    };
    await prisma.task.create({ data: task });
  });

  it("should be able to delete a task successfully", async () => {
    const task = await prisma.task.findFirst();
    await request.delete(`/tasks/${task?.id}`).expect(204);
  });

  it("should return an error when deleting a task with non existing id", async () => {
    const response = await request.delete(`/tasks/99999`);

    const expectedBody = {
      message: "Task not found",
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(404);
  });
});
