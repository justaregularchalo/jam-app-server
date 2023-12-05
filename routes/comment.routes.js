
const router = require ("express"). Router ()
const User = require ("../models/User.model")
const Comment = require ("../models/Comment.model")


//ruta para publicar un comentario

router.post("/:userId", async (req,res,next)=>{

    const {commenter, user, comment} = req.body

    try {


        await Comment.create ({
    
            commenter,
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

    

    try {

        const comment = await Comment.find({ userId: req.body._id });
        res.json (comment) 



    }catch(error){

        next(error)
    }



})

module.exports = router;