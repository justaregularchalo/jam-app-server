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
router.get("/:userId", async (req, res, next) => {
    console.log(req.params.userId, "AQUIIIIII");
  try {
    const message = await Message.find({ receiver: req.params.userId }).populate(
      "sender",
      "username"
    );

    const messageBack = await Message.find({ sender: req.params.userId }).populate(
        "receiver",
        "username"
      );

      const allMessages = [...message, ...messageBack]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    console.log(message);
    res.json(allMessages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
