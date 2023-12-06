
const router = require ("express"). Router ()
const User = require ("../models/User.model")
const Comment = require ("../models/Comment.model")
const isTokenOk = require("../middlewares/auth.middleware")


//ruta para publicar un comentario

router.post("/:userId", async (req,res,next)=>{

    const {commenter, user, comment} = req.body

    try {


        await Comment.create ({
    
            commenter,//utilizar el payload
            user,
            comment
    
    
        })
    
        res.status(201).json ("Comment Created")




    }catch (error){

        next (error)
    }



})




// ruta para ver los comentarios en el user profile
router.get("/:userId", async (req,res,next)=>{

    console.log(req.params.userId, "AQUIIIIII")

    try {

        const comment = await Comment.find({ user:req.params.userId });
        console.log(comment)

        res.json (comment) 



    }catch(error){

        next(error)
    }



})




module.exports = router;