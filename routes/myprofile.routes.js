const router = require("express").Router();
const User = require("../models/User.model");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

router.post("/edited-image", isTokenOk, CloudinaryStorage, async (req, res, next)=>{

    const {uploadImage} = req.file.path //destructuramos para recibir toda la info de lo que vamosa a actualizar

    const {picProfile} = req.body //

    try{
        await User.findByIdAndUpdate(uploadImage, {picProfile})   
        res.json ("Profile Updated") 

    } catch(err){
next(err)
    }
})

module.exports = router;
