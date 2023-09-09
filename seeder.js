const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//load env var
dotenv.config({ path: "./config/config.env" });

//load models
const Course = require("./models/Course");

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//read json
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const importData = async () => {
  try {
    await Course.create(courses);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Course.deleteMany();
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  console.log("Data import start...");
  importData();
  console.log("Data imported...");
} else if (process.argv[2] === "-d") {
  deleteData();
  console.log("Data deleted...");
}
