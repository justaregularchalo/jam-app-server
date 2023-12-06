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


        }catch(error){

            next(error)

        }




})


module.exports = router;