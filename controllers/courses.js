const path = require("path");
const asyncHandler = require("../middleware/asyncHandler");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all courses
//@route GET /api/vi/courses
//@access PUBLIC
exports.getCourses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc Get single course
//@route GET /api/vi/courses/:id
//@access PUBLIC
exports.getCourse = async (req, res, next) => {
  try {
    const courses = await Course.findById(req.params.id);
    if (!courses) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    // res.status(400).json({ success: false });
    next(err);
  }
};

// @desc Create a new course
//@route POST /api/vi/courses/
//@access PRIVATE
exports.createCourse = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});

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

//step 1. uploadPhoto
// @desc Uploead course photo
//@route PUT /api/vi/courses/:id/photo
//@access PRIVATE
exports.courseUploadPhoto = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_SIZE} bytes`,
        400
      )
    );
  }

  file.name = `photo_${course._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Problem with the file upload`, 500));
    }
    await Course.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });

  console.log(req.files);

  // res.status(200).json({ success: true, data: {} });
});
