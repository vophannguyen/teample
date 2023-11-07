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
