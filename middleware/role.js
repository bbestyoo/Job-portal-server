const { COMPANY, JOB_SEEKER } = require("../constants/role");

const isCompany = (req, res, next) => {
  if (req.user.user.role === COMPANY) {
    next();
  } else {
    res.status(403).send({ msg: "Access Denied: Only for Companies" });
  }
};
const isJobSeeker = (req, res, next) => {
  if (req.user.user.role === JOB_SEEKER) {
    next();
  } else {
    res.status(403).send({ msg: "Access Denied: Only for JOB-SEEKER" });
  }
};

module.exports = { isCompany, isJobSeeker };
