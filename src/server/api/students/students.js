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
        students: studentData,
      });
    }
    res.status(402).json({ error: "Something went wrong" });
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
    const isEmail = await prisma.student.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (isEmail) {
      res.json({ message: "Email Already used" });
    }
    // if (!req.body.email) {
    //   res.json({ error: "email invalid", message: "some@gmail.com" });
    // }
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
      res.json({ message: "Successful", student: data });
    }
  } catch (err) {
    next(err);
  }
});

/// change information with single student
router.put("/update/:id", async (req, res, next) => {
  try {
    //get id
    const id = +req.params.id;
    let dataIn = {};
    // if (!req.body) {
    //   res.json({ error: req.body.firstName });
    // }
    //get student with id
    const isStudent = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
    //check if student not found send mess
    if (!isStudent) {
      res.json({ message: "Student not Found" });
    }
    // set up some data to defaulf if they dont pass in
    imageUrl = req.body.imageUrl ? req.body.imageUrl : isStudent.imageUrl;
    gpa = req.body.gpa ? +req.body.gpa : isStudent.gpa;
    // find student with email
    const isEmail = await prisma.student.findUnique({
      where: {
        email: req.body.email,
      },
    });
    // check email exist ,dont get that email pass in to data
    //because email is unique
    if (isEmail) {
      dataIn = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageUrl,
        gpa,
      };
    } else {
      dataIn = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl,
        gpa,
      };
    }
    //update student
    const data = await prisma.student.update({
      where: {
        id: id,
      },
      data: dataIn,
    });
    //data is true send
    if (data) {
      //if isEmail is exist send Notice
      res.json(
        isEmail
          ? {
              message: "successful",
              Notice: "you or another student already used this email",
              student: data,
            }
          : {
              message: "successful",
              student: data,
            }
      );
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
      res.json({
        status: 404,
        message: `Could not find student with id: ${id}.`,
      });
    }

    res.json({ student });
  } catch (err) {
    next(err);
  }
});

//delete a student based on id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      res.json({
        status: 404,
        message: `Could not find student with id: ${id}.`,
      });
    }

    const data = await prisma.student.delete({ where: { id: id } });

    if (data) {
      res.json({ message: "Success", student: data });
    }
  } catch (err) {
    next(err);
  }
});
