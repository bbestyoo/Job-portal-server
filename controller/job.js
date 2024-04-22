const jobModel = require("../model/Job");
const UserModel = require("../model/User");


const getJob = async (req, res, next) => {
  try {
    let search = req.query.search || "";``
    let jobType = req.query.job_type || "";
    let jobLevel = req.query.job_level || "";
    let jobCategory = req.query.category || "";
    let perPage = parseInt(req.query.perPage) || 5;
    let Page = parseInt(req.query.Page) || 1;
    let skip = perPage * (Page - 1);
    let limit = perPage;
    console.log("page",req.query.Page)

    const jobs = await jobModel.aggregate([
      {
        //match work as find
        $match: {
          title: RegExp(search, "i"), // here i is for case sensitive  & RegExp create regular expression object

          job_type: RegExp(jobType, "i"),
          category: RegExp(jobCategory, "i"),
          job_level: RegExp(jobLevel, "i")

          //
        },
      },
      {
        $facet: {
          data: [
            {
              $skip: skip,
              //for 1st page we dont want to skip so 1st page is page=1 (1-1)*perpage(10) we get initial 1st 10 jobs we zero skip and in 2nd page  (2-1)*10 i.e 10jobs will be skipped
            },
            {
              $limit: limit,
            },
          ],
          metadata: [
            { $count: "total" }, // total search garerw aako jobs haru ko number
            { $addFields: { Page, perPage } },
          ],
        },
      },
     ]) //mathi bata filter vayerw aako lai pheri tala ko match le filter  garne vo
      //

      // {
      //   $project: {
      //     description: 0, //description jadaina 0 halda
      //   },
      // },
    
    
    console.log("this is jobs ",jobs)
    res.status(200).send({
        Page,

        jobs,

    } );
  } catch (err) {
    console.log(err)
    next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    console.log("yoyoyoyomilll")
    console.log(req.user);
    console.log(req.file)

    const creator=await UserModel.findById(req.user.user._id);

    const job = await jobModel.create({
      ...req.body,
      createdBy: req.user.user._id,
      creatorPic:creator.image
    });

    console.log("job is created..", job);
    res.status(200).send(job);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await jobModel.findById(req.params.id);
    console.log(job);

    if (job) {
      console.log();

      if (req.user.user._id !== job.createdBy.toString()) {
        return res.status(401).send({
          msg: "Acess denied. This job wasnt created by you",
        });
      } else {
        let deletedJob = await jobModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ deletedJobdetail: deletedJob });
      }
    } else {
      res.status(400).send("No Jobs Found");
    }
  } catch (err) {
    next(err);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const Job = await jobModel.findById(req.params.id);
    res.status(200).send(Job);
  } catch (err) {
    next(err);
  }
};

const getHotJobs = async (req, res, next) => {
  try {
    const allHotJobs = await jobModel.find({ type: "hot" });
    res.status(200).send(allHotJobs);
  } catch (err) {
    next(err);
  }
};
const getPopJobs = async (req, res, next) => {
  try {
    const allJobs = await jobModel.find().sort({_id: -1}).limit(5);
    res.status(200).send(allJobs);
  } catch (err) {
    next(err);
  }
};

const editJob = async (req, res, next) => {
  try {
    const job = await jobModel.findById(req.params.id);

    if (job) {
      console.log(job);
      if (req.user.user._id !== job.createdBy.toString()) {
        return res.status(401).send({ msg: "This job is not created by you" });
      } else {
        let updatedJob = await jobModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true, //this updates the new value in res.send
            runValidators: true, //this emsures validation
          }
        );
        res.status(200).send(updatedJob);
      }
    } else {
      res.status(401).send({ msg: "Job post not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getJob,
  createJob,
  deleteJob,
  getJobById,
  getHotJobs,
  editJob,
  getPopJobs
};
