const router = require("express").Router();
const User = require("../models/User.model");
const imgMiddleware = require("../middlewares/cloudinary.middleware");

const isTokenOk = require("../middlewares/auth.middleware");

// /GET "api/profile/my-profile"  ver los detalles de mi perfil
router.get("/", isTokenOk, async (req, res, next) => {
  console.log(req.payload);

  

  try {
    //hacer constante y traer parametors a red.body

    if (req.payload._id.length !== 24) {
      return res.status(400).json({ errorMessage: "id not valid" });
    }

    const oneUser = await User.findById(req.payload._id);
    console.log(oneUser);
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/edited-image", isTokenOk, imgMiddleware.single("image"), async (req, res, next)=>{
    const { path } = req.file //destructuramos para recibir toda la info de lo que vamosa a actualizar
    console.log(req.file.path)


    try{
        await User.findByIdAndUpdate(req.payload._id, {picProfile:path})   
        res.json({ imageUrl: req.file.path })

    } catch(err){
next(err)
    }
})

module.exports = router;
