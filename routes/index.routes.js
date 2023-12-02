const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});




const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const allUserRoutes = require("./allusers.routes");
router.use("/all-users", allUserRoutes);

const profileRoutes = require("./profiles.routes");
router.use("/profile", profileRoutes);


module.exports = router;
