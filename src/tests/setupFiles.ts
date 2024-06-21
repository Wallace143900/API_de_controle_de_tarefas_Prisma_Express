import supertest from "supertest";
import { beforeEach } from "vitest";
import { app } from "../app";
import { prisma } from "../database/prisma";

export const request = supertest(app);

beforeEach(async () => {
  await prisma.$transaction([
    prisma.category.deleteMany(),
    prisma.task.deleteMany(),
  ]);
});
