const express = require('express')
//model defined
const User = require('../models/User')
const Order = require('../models/Students')
const Op = require('../models/Op')
const Qa = require('../models/adhd')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"
const cors = require("cors");
const bodyParser = require("body-parser");
router.post('/createuser', [
    // 1.Validation starts
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // 2. Salting the password
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    // 3.Creating an entry of correct inputs
    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})

// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
// 4. How to define variables for body payload
    const { email, password } = req.body;
    try {
        // 5. Fetch user specific payload
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
// 6. Compare input password with salt
        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})   

//Here email and product_id are variable on front end
router.post('/addp', async (req, res) => {
        await Order.create({
            customer_mail: req.body.email,
            product_id: req.body.product_id,
        })
});

router.post('/addpp', async (req, res) => {
    await Op.create({
        mail: req.body.mail,
        name: req.body.data1,
    })
});

//Here user data sent in params gets in query
router.get("/products", async(req, res) => {
    const email = req.query.email;
    console.log(email)
    const data = await Order.find({'customer_mail':email});
    console.log(data)
    res.json(data);
  });

  //Below example whole collection was stored in an entry and provided way to fetch data back
  router.get("/productsi", async(req, res) => {
    const email = req.query.email;
    console.log(email)
    //const data = await Op.find({});
    const data = await Op.find({'mail':email});
    //const data = await Op.find({'mail':"Rahuly@yes.com"});
    console.log(data)
    // res.json(data[0].name[1]);
    res.json(data[0].name);
  });


  router.get("/prod", async(req, res) => {
    res.json(global.prod);
  });

  router.post('/addpp', async (req, res) => {
    await Op.create({
        mail: req.body.mail,
        name: req.body.data1,
    })
});

router.post('/adhd', async (req, res) => {
    await Qa.create({
        name: req.body
    })
});

  
module.exports = router