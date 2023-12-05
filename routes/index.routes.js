const router = require("express").Router();

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

router.get("/", (req, res, next) => {
  res.json("All good in here");
});




const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const allUserRoutes = require("./allusers.routes");
router.use("/all-users", allUserRoutes);

const profileRoutes = require("./profiles.routes");
router.use("/profile", profileRoutes);

const myProfileRoutes = require("./myprofile.routes");
router.use("/my-profile", myProfileRoutes);

const commentRoutes = require("./comment.routes");
router.use("/comment", commentRoutes);


module.exports = router;
