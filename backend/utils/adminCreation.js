import { prisma } from "../utils/prisma.ts";
import bcrypt from "bcrypt";

async function createApprovedAdmin() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  const admin = await prisma.user.create({
    data: {
      role: "admin",
      approved: true,
      firstName: "Admin",
      lastName: "User",
      phoneNumber: "555-0199",
      address: "123 Server Lane",
      dateOfBirth: new Date("1990-01-01"),
      login: {
        create: {
          email: "admin@gmail.com",
          password: hashedPassword,
        },
      },
    },
    include: {
      login: true,
    },
  });

  console.log("Created Admin User:", admin);
}

createApprovedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
