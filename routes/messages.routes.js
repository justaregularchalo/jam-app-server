const router = require ("express"). Router ()
const Message = require ("../models/Message.model")
const User = require ("../models/User.model")
const isTokenOk = require("../middlewares/auth.middleware")


//ruta para  publicar un mensaje


router.post ("/:userId", async (req,res,next) =>{

    const {sender, receiver, message} = req.body


        try{

            await Message.create ({

                sender,
                receiver,
                message


            })

            res.status(201).json ("Message Created")

        }catch(error){

            next(error)

        }




})


// ruta para ver los mensajes
router.get("/:userId", async (req,res,next)=>{

    

    try {

        const message = await Message.find({ userId: req.body._id });

        // const message = await User.findById(userId).populate(req.body.username);  
        
        // const message = await Message.findById(userId).populate(sender.username);  

        res.json (message) 



    }catch(error){

        next(error)
    }



})




module.exports = router;