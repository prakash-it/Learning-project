const User = require('../models/usermodels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const errorHandler = require('../Uitls/error');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong password'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password:hashedPassword, ...rest} = validUser._doc;
    res.cookie('access_token', token, { 
      httpOnly: true, 
      maxAge: 30 * 24 * 60 * 60 * 1000 
  })
  .status(200)
  .json(validUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
