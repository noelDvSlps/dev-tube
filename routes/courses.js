const express = require("express");
const router = express.Router();

//controllers: get all the functions
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

// instead of this 👇🏾
// router.get("/", (req, res) => {
//     res.status(200).json({ success: true, msg: "Get all courses" });
//   }); with controlle it can be like this 👇🏾

router.route("/").get(getCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
