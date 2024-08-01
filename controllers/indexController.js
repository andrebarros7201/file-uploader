const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "Index" });
});
