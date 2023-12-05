const router = require ("express"). Router ()
const User = require ("../models/User.model")


//GET "api/profile/:userId"  ver los detalles de un perfil concreto


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

//DELETE "/api/profile/:userId " borrar un user por su Id
router.delete("/:userId", async (req,res,next)=>{

    try {

        await User.findByIdAndDelete(req.params.userId)
        res.json("Profile deleted")



    }catch(error){

        next(error)
    }

})




//PUT "/api/profile/:userId " editar propiedades del user por su Id

router.put("/:userId", async (req,res,next)=>{

    const {userId} = req.params //destructuramos para recibir toda la info de lo que vamosa a actualizar

    const {bio, instrument, genre, username, location,  picProfile, vidProfile} = req.body //esto es lo que vamos a actualizar

    console.log(req.params, req.body)

    try {

        await User.findByIdAndUpdate(userId, {bio, instrument, genre, username, location,  picProfile, vidProfile})   
        res.json ("Profile Updated") 



    }catch(error){

        next(error)
    }



})





// //GET "api/profile/my-profile"  ver los detalles de mi perfil


// router.get ("/my-profile" , async (req,res,next)=>{



//     try{

       

//         if (req.payload.userId.length !== 24) {

//             return res.status(400).json({errorMessage: "id not valid"})
//         }

//         const oneUser = await User.findById(req.payload.userId)
//         console.log(oneUser)
//         res.json(oneUser)



//     }catch(error){

//         next(error)

//     }



// })







//PATCH (actualización parcial) "/api/profile/:userId/picProfile" => editar propiedad PicProfile de un user por su Id


// router.patch("/:userId/complete", async (req,res,next)=>{


//     try {

//         await User.findByIdAndUpdate(req.params.userId,)

//         res.json("Profile Updated. Bio, picProfile, vidProfile")




//     }catch(error){

//         next(error)

//     }


// })




















module.exports = router;