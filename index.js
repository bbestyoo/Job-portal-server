const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
const Signup = require("./controller/Signup")
const Login = require("./controller/Login")
const { createJob, getJob, deleteJob, getHotJobs, getJobById, editJob } = require("./controller/job")
const auth = require("./middleware/auth")
const authRoutes = require("./routes/authRoutes")
const { isJobSeeker } = require("./middleware/role")
const apply = require("./controller/apply")
const upload = require("./multer/multer")
const getUser = require("./controller/User")
const chart = require("./controller/chart");
require('dotenv').config()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // If you're sending cookies or authorization headers
}));



mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));


   

app.get("/api/getJob",getJob)
app.get("/api/User",auth,getUser)
app.use(authRoutes)


app.get("/api/chart/company", auth, chart.chartDiagram);
app.get("/api/chart/job-seeker", auth, chart.barDiagram);

app.post("/api/createJob",auth,upload.single('image'),createJob)
app.delete("/api/deleteJob/:id",auth,deleteJob)
app.get("/api/getHotJob",getHotJobs)
app.get("/api/getJobById/:id",getJobById)
app.put("/api/editJob/:id",auth,editJob)
app.post("/api/applyJob",auth, isJobSeeker, apply)

app.get("/", function (req,res){
    res.send("Hello there")
})

app.listen(port, ()=>{
    console.log("server started...")
})