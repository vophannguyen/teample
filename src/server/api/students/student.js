const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const studentData = await prisma.student.findUnique(id);

    if (studentData) {
      res.json({
        message: "successful",
        data: studentData,
      });
    }
    res.status(402).json({ error: "Something went wrong" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
