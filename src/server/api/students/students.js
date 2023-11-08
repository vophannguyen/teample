const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
const { emit } = require("nodemon");
module.exports = router;

//get all student
router.get("/", async (req, res, next) => {
  try {
    const studentData = await prisma.student.findMany();
    if (studentData) {
      res.json({
        message: "successful",
        data: studentData,
      });
    }
    res.status(402).json({ error: "Some wrong" });
  } catch (err) {
    console.error(err);
  }
});
////create new student
router.post("/create", async (req, res, next) => {
  try {
    if (!req.body.imageUrl) {
      imageUrl =
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    } else {
      imageUrl = req.body.imageUrl;
    }
    if (!req.body.email) {
      res.json({ error: "email invalid", message: "some@gmail.com" });
    }
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      res.json({
        error: "Some information is null",
        message: "all information need not null",
      });
    }

    const data = await prisma.student.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl,
      },
    });
    if (data) {
      res.json({ message: "Succesful", data: data });
    }
  } catch (err) {
    next(err);
  }
});
/// change information with singe student
router.put("/update/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const isId = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
    if (!isId) {
      res.json({ message: "Student not Found" });
    }
    const data = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
    });
    if (data) {
      res.json({ message: "successful", data: data });
    }
  } catch (err) {
    next(err);
  }
});
///get single student with id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      return next({
        status: 404,
        message: `Could not find student with id: ${id}.`,
      });
    }

    res.json({ data: student });
  } catch (err) {
    next(err);
  }
});
