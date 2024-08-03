const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be between 1 and 20 characters."),
  body("email").trim().isEmail().withMessage("Must be a valid email."),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password cannot be empty."),
  body("confirm-password")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

exports.getIndex = asyncHandler(async (req, res) => {
  res.render("index", { title: "Index" });
});

exports.getSignUp = asyncHandler(async (req, res) => {
  res.render("sign-up", { title: "Create an Account" });
});

exports.postSignUp = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
        title: "Create an Account",
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      console.log(req.body.username, hashedPassword, req.body.email);
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).render("sign-up", {
          error: "An error occurred during registration. Try again later.",
          title: "Create an Account",
        });
      }
      await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        },
      });
      res.redirect("/");
    });
  }),
];

exports.getLogIn = asyncHandler(async (req, res) => {
  res.render("log-in", { title: "Log In" });
});

exports.postLogIn = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })(req, res, next);
});

exports.getLogOut = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
