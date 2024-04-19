const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserModel = require("../model/User");
const multer = require("multer");
const upload = require("../multer/multer");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
  repeat_password: Joi.ref("password"),
  image: Joi.string().alphanum(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  // role: Joi.  string().valid('company', 'job-seeker').required(),
});

const Signup = async(req, res, next) => {
  try {
    console.log("req.body hai", req.body);
    console.log("req.file hai ", req.file);
    const value = await signupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log(value);
    
    if (value.error) {
      let error = value.error.details; //it is returning array so we do map method for each error types
      let errors = error?.map((Err) => {
        return {
          msg: Err.message,
          params: Err.context.key,
        };
      });
      //   console.log(errors);
      return res.status(400).send({ errors });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10) 


    // let oldUser = await UserModel.findOne({ email: req.body.email });
    // if (oldUser) {
    //   return res.status(400).send({ msg: "User Already Exist" });
    // }

    const user = await UserModel.create({
      ...req.body,
      // image: req.file.filename,
      image: req.file.filename,
      password: hashedPassword,
      repeat_password: hashedPassword,
    });

    let userInfoNoPassword = user.toObject();
    delete userInfoNoPassword.password;
    delete userInfoNoPassword.repeat_password;
    user.save();

    return res.status(200).send(userInfoNoPassword);

  } catch (err) {
    console.log(err);
    next(err);
    
  }
}

module.exports = Signup;
