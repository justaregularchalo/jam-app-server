const router = require ("express"). Router ()
const User = require ("../models/User.model")



// GET "/api/all-users" => todos los usuarios

router.get("/", async (req, res, next )=>{




    try {

        const userInfo = await User.find().select({username: 1,instrument: 1,genre:1,location:1, picProfile:1 })

        res.json(userInfo)
        console.log(userInfo)

    }catch (error) {

        next (error)

    } 



}) 
























module.exports = router;