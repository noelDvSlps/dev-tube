const express = require("express");
const router = express.Router();
const filteredResults = require("../middleware/filteredResults");
const Course = require("../models/Course");

//controllers: get all the functions
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  courseUploadPhoto,
} = require("../controllers/courses");

// instead of this 👇🏾
// router.get("/", (req, res) => {
//     res.status(200).json({ success: true, msg: "Get all courses" });
//   }); with controlle it can be like this 👇🏾

router.route("/").get(filteredResults(Course), getCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

// step 4 uploadPhoto
router.route("/:id/photo").put(courseUploadPhoto);

module.exports = router;
