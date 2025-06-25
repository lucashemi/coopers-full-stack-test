import request from "supertest";
import knex from "../src/config/knexfile";
import { app } from "../src/app";

beforeEach(async () => {
  await knex.migrate.latest();
  await knex("tasks").del();
});

afterAll(async () => {
  await knex.destroy();
});

describe("Complex task flow", () => {
  it("should handle creation and done status correctly", async () => {
    // Create 3 tasks
    const taskA = await request(app)
      .post("/api/tasks")
      .send({ name: "task A" });
    const taskB = await request(app)
      .post("/api/tasks")
      .send({ name: "task B" });
    const taskC = await request(app)
      .post("/api/tasks")
      .send({ name: "task C" });

    // Mark second task (taskB) as done
    const updatedTask = await request(app)
      .patch(`/api/tasks/${taskB.body.id}`)
      .send({ done: true });

    expect(!!updatedTask.body.done).toBe(true);

    // Get all tasks
    const allTasks = await request(app).get("/api/tasks");

    // Separate by status
    const todoTasks = allTasks.body.filter((t: any) => !t.done);
    const doneTasks = allTasks.body.filter((t: any) => !!t.done === true);

    // Verifiy length
    expect(todoTasks).toHaveLength(2);
    expect(doneTasks).toHaveLength(1);

    // Verify names
    expect(todoTasks.map((t: any) => t.name)).toEqual(
      expect.arrayContaining(["task A", "task C"])
    );
    expect(doneTasks[0].name).toBe("task B");

    // Verify positions in to-do tasks
    const todoPositions = todoTasks.map((t: any) => t.position);
    expect(new Set(todoPositions).size).toBe(todoPositions.length);
  });
});
