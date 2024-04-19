const UserModel = require("../model/User")

const getUser = async (req, res, next) => {
  try {
    console.log("gret user")
    const myuser = await UserModel.findById(req.user.user._id, {
      password: 0,
      repeat_password: 0,
    });
    console.log({ userYetaXa: myuser });
    res.status(200).send(myuser);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
