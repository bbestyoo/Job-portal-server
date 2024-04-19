const mongoose = require("mongoose");
const {
  REJECTED,
  PENDING,
  COMPLETED,
  ACCEPTED,
} = require("../constants/applyStatus");

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const appliedJobSchema = new schema({
  appliedJob: {
    type: [   //for multiple jobs to apply
      {
        job_id: {
          type: ObjectId,
          required: true,
          ref: "Jobs",
        },
        appliedDate: {
          type: String,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (value) { //PPLEDJOBS KO ARRAY LENGTH
        if (value.length === 0) return false;
      },
      message: "At least one job should be applied",
    },
  },
  status: {
    type: String,
    enum: [REJECTED, PENDING, ACCEPTED],
    default: PENDING,
  },
  appliedBy: {
    ref: "Users",
    type: ObjectId,
  },
});

/**
 * let appliedJob={
 *  job_id,{ reference docs} or {embedded documents}
 * client_id
 * applied date
 * }
 *
 * to apply or modify particular data in all sets in a collection
 * db.appliedjobs.updateMany({},{
 * $set:{status:"pending"}
 * })
 *
 *
 *
 */

const JobAppliedModel = mongoose.model("AppliedJobs", appliedJobSchema);
module.exports = JobAppliedModel;
