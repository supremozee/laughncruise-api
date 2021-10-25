const router = require("express").Router()
const Users = require("../Models/Users")
const bcrypt = require("bcrypt")

//Register
router.post("/register", async (req, res)=> {
    try {
        const {username, email, password} = req.body
        if (!username || !email || !password) {
           return res.json("complete the box").status(400)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUsers = new Users({
            username: username,
            email: email,
            password: hashedPass
        });
        res.status(200).json(newUsers).save()
        
        
    }
  catch(err) {
      res.status(500).json("wrong input")
  }

})

//Login
router.post("/login", async (req, res)=> {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json("Username and password not found")
        }
         const user =  await Users.findOne({username: username})
         !user && res.json("wrong credentials").status(400)
         const validated = await bcrypt.compare(password, newUsers.password)
         !validated && res.status(400).json("wrong credentials")
        //  const {password, ...others} = newUsers._doc
        res.status(200).json("Login  beautifully")
    } catch(err) {
      res.status(500)  
    }
})

module.exports = router