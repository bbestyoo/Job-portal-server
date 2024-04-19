const JobAppliedModel = require("../model/applied");
const jobModel = require("../model/Job");

const chartDiagram = async (req, res, next) => {
  try {
    console.log(req.user.user._id);
    let jobs = await jobModel.find(
      { createdBy: req.user.user._id },
      { description: 0 }
    );

    let q = new Date();
    let m = q.getMonth();
    let d = q.getDay();
    let y = q.getFullYear();``
    let today = new Date(y, m, d);
    console.log(today);
      
    const pieArray = [
      {
        status: "inactive jobs",
        number: 0,
      },
      {
        status: "active jobs",
        number: 0,
      },
    ];
    jobs.map((data) => {
      let deadline = new Date(data.deadline_date);
      if (today > deadline) {
        pieArray[0].number += 1;
      } else {
        pieArray[1].number += 1;
      }
    });
    // const deadlineArray = jobs.map((data) => {
    //   let deadline = new Date(data.deadline_date);
    //   if (today > deadline) {
    //     return {
    //       title: data.title,
    //       dead: true,
    //     };
    //   } else {
    //     return {
    //       title: data.title,
    //       daysLeft: Math.floor(Math.abs(deadline - today) / (60000 * 60 * 24)),
    //       dead: false,
    //     };
    //   }
    // });

    res.send(pieArray);
  } catch (err) {
    next(err);
  }
};

const barDiagram = async (req, res, next) => {
  try {
    const barArray = [
      {
        status: "accepted",
        number: 0,
      },
      {
        status: "rejected",
        number: 0,
      },
      {
        status: "pending",
        number: 0,
      },
    ];
    const appliedJobs = await JobAppliedModel.find({
      appliedBy: req.user.user._id,
    });

    appliedJobs.map((data) => {
      if (data.status === "accepted") {
        barArray[0].number += 1;
      } else if (data.status === "rejected") {
        barArray[1].number += 1;
      } else {
        barArray[2].number += 1;
      }
    });
    return res.send(barArray);
  } catch (err) {
    next(err);
  }
};

module.exports = { chartDiagram, barDiagram };
//654af3d1cb70ba00f3c72df8
