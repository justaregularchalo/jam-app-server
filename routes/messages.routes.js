const router = require ("express"). Router ()
const Message = require ("../models/Message.model")
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


// ruta para ver los coments en la vista de mensajes
router.get("/:userId", async (req,res,next)=>{

    

    try {

        const message = await Message.find({ userId: req.body._id });
        res.json (message) 



    }catch(error){

        next(error)
    }



})




module.exports = router;