const express = require("express");
const router = express.Router();
const prisma = require("../../prisma");
module.exports = router;

router.get(':id', async (req, res, next) => {
  try {
    const id = +req.params.id;
    const student = await prisma.students.findUnique({ where : { id }});

    if (!student) {
        return next({
            status: 404, 
            message: `Could not find student with id: ${id}.`
        });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
});
