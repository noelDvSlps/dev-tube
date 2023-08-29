const Course = require("../models/Course");

// @desc Get all courses
//@route GET /api/vi/courses
//@access PUBLIC
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single course
//@route GET /api/vi/courses/:id
//@access PUBLIC
exports.getCourse = async (req, res, next) => {
  try {
    const courses = await Course.findById(req.params.id);
    if (!courses) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete single course
//@route DELETE /api/vi/courses/:id
//@access PRIVATE
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
