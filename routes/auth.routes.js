const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

const isTokenOk = require("../middlewares/auth.middleware")



//POST "/auth/signup" => registro de usuario lo crea en la DB

router.post("/signup", async (req,res,next) =>{

    console.log(req.body)

    const {username,email, password, instrument, genre, location} = req.body


    // validaciones de backend malignas


    if(!username || !email || !password || !instrument ||!genre|| !location) {

        res.status(400).json ({errorMessage:"All fields must be completed"})
        return //quieto ahí muñe muñe

    }

    // password tiene que ser safe

    const passwordSeg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (passwordSeg.test(password) === false) {
      res.status(400).json({errorMessage:
          "Password is not secure enough. It should have al least 8 characters, one uppercase, one lowercase and one number"});
      return;
    }

    //correo electronico formato correcto

try {

    const repeatedUsername = await User.findOne({ username });
    if (repeatedUsername) {
      res.status(400).json( {
        errorMessage: "This username already exists"
      });
      return;
    }

    const repeatedMail = await User.findOne({ email });
    if (repeatedMail) {
      res.status(400).json( {
        errorMessage: "This email has already been used"
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(password, salt);


    //creamos el user despues de las validartions del mal

    await User.create({
         username, 
         email, 
         password: cryptPassword, 
         instrument, 
         genre, 
         location});

         res.status(201).json("User created")











}catch(error){

    next(error)

}
    







})










//POST "/login" => recibir datos y validar

router.post("/login", async (req,res,next)=>{

    console.log(req.body)

        const{username, password} = req.body


    if(!username || !password ) {

        res.status(400).json ({errorMessage:"All fields must be completed"})
        return //quieto ahí muñe muñe

    }


    try {

        const foundUser = await User.findOne ({username})
        if(!foundUser) {

            res.status(400).json({errorMessage: "User not registered"})

        }

        const passwordValidation = await bcrypt.compare(password, foundUser.password)

        if(!passwordValidation){

            res.status(400).json({errorMessage: "Password doesn't match"})

        }
        
        // si tutto bene, creamos la session con el token
        
        //payload maligno => info que no cambia
        1
        const payload = {
    
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
    
        }
    
        const authToken = jwt.sign(payload,process.env.TOKEN_SECRET, {expiresIn:'3d'})
        res.json({authToken})
    
    
    
    
    }catch(error){
        
        next(error)
    }
})
    






// GET "/auth/verify" => indicar a FE si el user esta activo, papi y quien es



router.get("/verify",isTokenOk , (req,res,next)=>{
    console.log(req.payload)
    //validar
    // recibir payload
    //envia el payload
    // sattus de usuario
    // logged or not


    res.json({payload:req.payload})
    // se envia esto para que react sepa quien ha entrado




})
















module.exports = router