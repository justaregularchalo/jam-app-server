
const router = require ("express"). Router ()
const User = require ("../models/User.model")

const isTokenOk = require("../middlewares/auth.middleware")



// /GET "api/profile/my-profile"  ver los detalles de mi perfil 
router.get ("/" , isTokenOk, async (req,res,next)=>{

        console.log(req.payload)

    try{
        //hacer constante y traer parametors a red.body


        if (req.payload._id.length !== 24) {

            return res.status(400).json({errorMessage: "id not valid"})
        }

        const oneUser = await User.findById(req.payload._id)
        console.log(oneUser)
        res.json(oneUser)



    }catch(error){

        next(error)

    }



})



module.exports = router;





