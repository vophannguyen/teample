const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
module.exports = router;

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
