
const jwt = require("jsonwebtoken")

function isTokenOk (req,res, next)  {

    // bichear como envia el cliente el token
    // console.log(req.headers) // transmitiendo info


    try {


        //sacando el token
        //validation maligna del token
        //a ver que hacemos con el user

        const token= req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
       
        req.payload = payload // almacenamos payload en cualquier ruta
        //validando token 
        // verify nos fevuelve el payload descifrado

        next() // palante muñeco

    }catch (error){

    // si no existe

    //si no es válido

    // o si no hay headers en el token "a.k.a Teken"


    res.status(401).json("Token doesn't exist or is invalid")
    }




}

module.exports = isTokenOk