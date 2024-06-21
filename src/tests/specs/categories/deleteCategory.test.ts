import { beforeEach, describe, it, expect } from "vitest";
import { prisma } from "../../../database/prisma";
import { request } from "../../setupFiles";

describe("delete category", () => {
  beforeEach(async () => {
    await prisma.category.create({ data: { name: "Example" } });
  });

  it("should be able to delete a category successfully", async () => {
    const category = await prisma.category.findFirst();
    await request.delete(`/categories/${category?.id}`).expect(204);
  });

  it("should return an error when deleting a category with non existing id", async () => {
    const response = await request.delete("/categories/99999");

    const expectedBody = {
      message: "Category not found",
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.statusCode).toBe(404);
  });
});
