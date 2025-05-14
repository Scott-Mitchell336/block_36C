const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // Create sample students
  const students = [
    {
      name: "John Doe",
      email: "john@example.com",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  ];

  console.log("Starting to seed the database...");

  for (const student of students) {
    const createdStudent = await prisma.student.create({
      data: student,
    });
    console.log(`Created student with id: ${createdStudent.id}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
