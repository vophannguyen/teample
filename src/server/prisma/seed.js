const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  await prisma.student.create({
    data: {
      fristName: "Nguyen",
      lastName: "Vo",
      email: "vophannguyen@gmail.com",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      gpa: 3.9,
    },
  });
  await prisma.student.create({
    data: {
      fristName: "Anna",
      lastName: "Waterhouse",
      email: "@gmail.com",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      gpa: 3.9,
    },
  });
  await prisma.student.create({
    data: {
      fristName: "Courtney",
      lastName: "Snyder",
      email: "@gmail.com",
      imageUrl:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      gpa: 3.9,
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
