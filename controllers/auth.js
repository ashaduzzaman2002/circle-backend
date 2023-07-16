const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, msg: 'User not exist' });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    res.clearCookie('jwt');
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRECT, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      sameSite: 'lax',
    });

    res.json({
      success: true,
      msg: 'User logged in successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

// get user
exports.getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId, '-password');
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

// logout
exports.logout = async (req, res) => {
  const userId = req.userId;
  try {
    res.clearCookie('jwt');
    res.json({ msg: 'Logout successfully' });
  } catch (error) {}
};
