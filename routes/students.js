const express = require("express");
const router = express.Router();
const prisma = require("../db");

router.get("/student", async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

router.post("/student", async (req, res) => {
  const { name, email } = req.body;
  const student = await prisma.student.create({
    data: {
      name,
      email,
    },
  });
  res.json(student);
});

module.exports = router;
