const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
// const { emit } = require("nodemon");
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
    res.status(402).json({ error: "Something went wrong" });
  } catch (err) {
    console.error(err);
  }
});

////create new student
router.post("/create", async (req, res, next) => {
  // try {
  //   if (!req.body.imageUrl) {
  //     imageUrl =
  //       "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
  //   } else {
  //     imageUrl = req.body.imageUrl;
  //   }
  //   const isEmail = await prisma.student.findUnique({
  //     where: {
  //       email: req.body.email,
  //     },
  //   });
  //   if (isEmail) {
  //     res.json({ message: "Email Already used" });
  //   }
  //   if (!req.body.email) {
  //     res.json({ error: "email invalid", message: "some@gmail.com" });
  //   }
  //   if (!req.body.firstName || !req.body.lastName || !req.body.email) {
  //     res.json({
  //       error: "Some information is null",
  //       message: "all information need not null",
  //     });
  //   }

  //   const data = await prisma.student.create({
  //     data: {
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       email: req.body.email,
  //       imageUrl,
  //     },
  //   });
  //   if (data) {
  //     res.json({ message: "Successful", data: data });
  //   }
  // } catch (err) {
  //   next(err);
  // }

  try {

    //identify req.body
    const { id, firstName, lastName, email, imageUrl, gpa} = req.body;

    //error handling for repeat student info
    // const emailExists = 

    //error handling for no inputs
    if(!id || !firstName || !lastName || !email || !gpa){
      const error = {
        status: 400, 
        message: `Student must have an id, full name, email, and gpa.`,
      };
      next(error);
    };

    //create default image if one not included

    //create new student
    const student = await prisma.student.create({
      data: {
        id,
        firstName, 
        lastName,
        email,
        imageUrl,
        gpa
      }
    });
    res.json(student.data);
  } catch (err) {
    next(err)
  }
});

/// change information with single student
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
      return next({
        status: 404,
        message: `Could not find student with id: ${id}.`,
      });
    }

    await prisma.student.delete({where: { id: id }});

    res.sendStatus(204);
  } catch (err) {
    next (err)
  }
})