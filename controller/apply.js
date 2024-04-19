const JobAppliedModel = require("../model/applied");

const apply = async (req, res, next) => {
  try {
    let mapped_jobs = [];
    let mydate = new Date();
    console.log("this",req.body);

    req.body.appliedJob.map((job) => {
      mapped_jobs.push({
        job_id: job.job_id,
        appliedDate: mydate.toLocaleString(),
      });
    });

    let applyjob = await JobAppliedModel.create({
      appliedJob: mapped_jobs,
      appliedBy: req.user.user._id,
    });
    res.send(applyjob);
  } catch (err) {
    next(err);
  }
};

module.exports = apply;
