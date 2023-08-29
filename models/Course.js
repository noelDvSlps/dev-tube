const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title"],
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters."],
  },
  description: {
    type: String,
    required: [true, "Pleas add description"],
    maxlength: [500, "Name cannot be more than 50 characters"],
  },
  website: {
    type: String,
    match: [
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
      "Please enter a valid url",
    ],
  },
  slug: String,
  modules: Number,
  price: Number,
  minimumSkill: {
    type: String,
    required: [true, "Please add a skill level"],
  },
  category: {
    type: String,
    required: [true, "Please enter a course category"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5 "],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Course", CourseSchema);
