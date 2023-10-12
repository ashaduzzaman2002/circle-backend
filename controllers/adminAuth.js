const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ email });

    if (!user) return res.status(404).json({ success: false, msg: "User not exist" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) return res.status(401).json({ success: false, msg: "Invalid credentials" });

    res.clearCookie("jwt");

    const token = await jwt.sign({ user: user._id },  process.env.JWT_SECRECT, {
      expiresIn: '30d',
    });

    res.cookie(user._id, token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    user.password = undefined

    res.status(200).json({ success: true, msg: "User logged in successfully", user });

  } catch (error) {
    console.log(error)
    res.status(501).json({success: false, msg: 'Internal server error'})

  }
};

exports.register = async (req, res) => {
    const {username, email, password} = req.body
    try {
        let user = await Admin.findOne({email})
        
        if(user) return res.json({status: false, msg: 'User already exist'})
        let hashPassword = await bcrypt.hash(password, 10)
        user = await Admin.create({username, email, password: hashPassword})

        user.password = undefined

        res.json({
            success: true,
            msg: 'User created successfully',
            user,
        })
    } catch (error) {
        res.json({success: 'false', msg: 'User creation failed'})
    }
}
