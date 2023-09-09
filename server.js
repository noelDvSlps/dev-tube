const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
// step 2. uploadPhoto
const fileupload = require("express-fileupload");

const path = require("path"); //uploadPhoto
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config/config.env" });

connectDB();

//Route files
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const app = express();
// Parse JSON
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload()); //step 3 uploadPhoto
app.use(express.static(path.join(__dirname, "public"))); //uploadPhoto

//mount routers
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// not organized 👇🏾

app.get("/", (req, res) => {
  res.send("Success");
});
