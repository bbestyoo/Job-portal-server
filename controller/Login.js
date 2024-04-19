const UserModel = require("../model/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config(); 

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const Login = async (req, res, next) => {
  try {
    const value = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (value.error) {
      const error = value.error.details;
      const errors = error?.map((err) => {
        return {
          msg: err.message,
          params: err.context.key,
        };
      });
      return res.status(400).send(errors);
    }

    let user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    console.log(user.password);
    console.log(req.body.password)

    if (user) {
      const matched = await bcrypt.compare(req.body.password, user.password);
      user = user.toObject();
      delete user.password;
      delete user.repeat_password;
      console.log(matched)

      if (matched) {
          console.log("hello");
        let token = jwt.sign({ user }, process.env.JWT_SECRET);
        console.log(token)
        return res.status(200).send({ user, token });
      }
      console.log("matched");
      
    }
    res.status(400).send({
      msg: "Invalid Credentials",
    });


  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = Login;
