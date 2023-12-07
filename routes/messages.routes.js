const router = require("express").Router();
const Message = require("../models/Message.model");
const User = require("../models/User.model");
const isTokenOk = require("../middlewares/auth.middleware");

//ruta para  publicar un mensaje


router.post("/:userId", async (req, res, next) => {
  const { sender, receiver, message } = req.body;

  try {
    await Message.create({
      sender,
      receiver,
      message,
    });

    res.status(201).json("Message Created");
  } catch (error) {
    next(error);
  }
});

// ruta para ver los mensajes
router.get("/:userId", isTokenOk, async (req, res, next) => {
  console.log(req.params.userId, "AQUIIIIII");
  try {
    const message = await Message.find({ 
      $and: [{ receiver: req.params.userId }, { sender: req.payload._id }],
    }).populate("sender", "username").populate("receiver", "username");

    const messageBack = await Message.find({
      $and: [{ sender: req.params.userId }, { receiver: req.payload._id }],
    }).populate("receiver", "username").populate("sender", "username");

    const allMessages = [...message, ...messageBack].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    console.log("QUE PASAAAAAAAAAA", message);
    console.log("BAAAAACK", messageBack)
    res.json(allMessages);
  } catch (error) {
    next(error);
  }
});


//borrar messagios
router.delete("/message/:messageId", async (req, res, next) => {
    
    try {

      // console.log("ID MALIGNOOOOOO!!:", req.params.messageId);
      await Message.findByIdAndDelete(req.params.messageId)
      res.json("Message Deleted")


    } catch (error) {
  
      next(error);
    }
  });

module.exports = router;
