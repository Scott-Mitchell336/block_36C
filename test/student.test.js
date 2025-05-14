const request = require("supertest");
const app = require("../app");

jest.mock("../db", () => ({
  student: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));
const prisma = require("../db");

describe("/student", () => {
  it("should return list of student", async () => {
    prisma.student.findMany.mockResolvedValueOnce([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);
    const res = await request(app).get("/api/student");
    expect(res.statusCode).toBe(200);
    expect(prisma.student.findMany).toHaveBeenCalled();
  });

  it("should create a new student", async () => {
    const newStudent = { id: 1, name: "John Doe", email: "john@example.com" };
    prisma.student.create.mockResolvedValueOnce(newStudent);
    const res = await request(app).post("/api/student").send({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.student.create).toHaveBeenCalledWith({
      data: { name: "John Doe", email: "john@example.com" },
    });
  });
});
