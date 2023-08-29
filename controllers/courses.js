const Course = require("../models/Course");

// @desc Get all courses
//@route GET /api/vi/courses
//@access PUBLIC
exports.getCourses = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all courses" });
};

// @desc Get single course
//@route GET /api/vi/courses/:id
//@access PUBLIC
exports.getCourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get single course by ID: ${req.params.id}` });
};

// @desc Create a new course
//@route POST /api/vi/courses/
//@access PRIVATE
exports.createCourse = async (req, res, next) => {
  try {
    console.log(req.body);
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(201).json({ success: false, error: err });
  }
};

// @desc Update single course
//@route PUT /api/vi/courses/:id
//@access PRIVATE
exports.updateCourse = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update single course by ID: ${req.params.id}`,
  });
};

// @desc Delete single course
//@route DELETE /api/vi/courses/:id
//@access PRIVATE
exports.deleteCourse = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete single course by ID: ${req.params.id}`,
  });
};
