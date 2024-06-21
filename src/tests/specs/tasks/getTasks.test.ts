import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../../database/prisma";
import { request } from "../../setupFiles";
import { Prisma, Category, Task } from "@prisma/client";

describe("get tasks", () => {
  let taskDataList: Prisma.TaskCreateManyInput[];
  let createdCategory: Category;
  let createdTasks: Task[];

  beforeEach(async () => {
    createdCategory = await prisma.category.create({
      data: { name: "Example" },
    });

    taskDataList = [
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
    createdTasks = await prisma.task.findMany();
  });

  it("should be able to list all tasks successfully", async () => {
    const response = await request.get("/tasks");

    const expectedBody = [
      {
        id: createdTasks[0].id,
        title: taskDataList[0].title,
        content: taskDataList[0].content,
        finished: false,
        category: null,
      },
      {
        id: createdTasks[1].id,
        title: taskDataList[1].title,
        content: taskDataList[1].content,
        finished: false,
        category: { id: createdCategory?.id, name: createdCategory?.name },
      },
    ];

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(200);
  });

  it("should be able to get tasks from specific category name query param", async () => {
    const response = await request.get(
      `/tasks?category=${createdCategory?.name}`
    );

    const expectedBody = [
      {
        id: createdTasks[1].id,
        title: taskDataList[1].title,
        content: taskDataList[1].content,
        finished: false,
        category: { id: createdCategory?.id, name: createdCategory?.name },
      },
    ];

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(200);
  });

  it("should be able to get a single task by id", async () => {
    const response = await request.get(`/tasks/${createdTasks[1].id}`);

    const expectedBody = {
      id: createdTasks[1].id,
      title: taskDataList[1].title,
      content: taskDataList[1].content,
      finished: false,
      category: { id: createdCategory?.id, name: createdCategory?.name },
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(200);
  });

  it("should return an error getting a task with non existing id", async () => {
    const response = await request.get("/tasks/99999");

    const expectedBody = {
      message: "Task not found",
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(404);
  });
});
