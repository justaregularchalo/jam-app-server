const router = require ("express"). Router ()
const User = require ("../models/User.model")


//GET "api/profile/:userId"  ver los detos d eun perfil concreto


router.get ("/:userId" , async (req,res,next)=>{

    console.log(req.params)

    try{

        if (req.params.userId.length !== 24) {

            return res.status(400).json({errorMessage: "id not valid"})
        }

        const oneUser = await User.findById(req.params.userId)
        console.log(oneUser)
        res.json(oneUser)



    }catch(error){

        next(error)

    }



})







module.exports = router;