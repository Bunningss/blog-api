const Model = require("../Models/index");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");

exports.login = async (req, res) => {
  try {
    const user = await Model.User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).json("Invalid email or password.");

    const pass = cryptoJs.AES.decrypt(
      user.Password,
      process.env.CRYPTO_SEC
    ).toString(cryptoJs.enc.Utf8);
    if (pass !== req.body.Password)
      return res.status(400).json("Invalid email or password.");

    const { Password, _id, createdAt, updatedAt, __v, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        Name: user.Name,
        Email: user.Email,
        isAuthor: user.isAuthor,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC
    );
    res.status(200).json({ userData: others, accessToken });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const existingUser = await Model.User.findOne({ Email });
    if (existingUser) return res.status(400).json("Invalid email selection.");

    if (Password.length < 5 || Name.length < 5 || Email.length < 8)
      return res.status(400).json("Invalid input value.");

    const hashedPass = cryptoJs.AES.encrypt(
      Password,
      process.env.CRYPTO_SEC
    ).toString();
    const user = new Model.User({
      Name,
      Email,
      Password: hashedPass,
    });
    await user.save();
    res.status(200).json("Registration successful.");
  } catch (err) {
    res.status(400).json("Server Error");
  }
};
