const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")

const Patient = require("./db/PatientSchema.js");
const User = require("./db/UserSchema.js");
const Appt = require("./db/ApptSchema.js");

const app = express();
dotenv.config()

// Middleware
app.use(cors()); // Enable CORS for requests from frontend
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static("public"));

////////////////////////////// Main route //////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

////////////////////////////// Appt App route //////////////////////////////////////////
app.get("/ApptApp", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ApptApp.html"));
});

/////////////////////////// POST and Get Routes (axios) for Users //////////////////////////////
//Register User
app.post("/register", (req, res) => {
  const UserObj = req.body;
  const { username, MobileNo } = UserObj;
  User.findOne({ MobileNo: MobileNo })
    .then((user) => {
      if (user) {
        res.send("Already registered");
      } else {
        const user1 = new User(UserObj);
        user1
          .save()
          .then((user) => {
            res.send(user);
          })
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => {
      res.send("The following error occured" + err);
    });
});

//User Login
app.post("/userlogin", (req, res) => {
  const LoginObj = req.body;
  const { MobileNo } = LoginObj;

  User.findOne({ MobileNo: MobileNo })
    .then((user) => {
      if (!user) {
        res.send("Not found");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.send("The following error occured" + err);
    });
});

//Update User Details
app.post("/changesign", (req, res) => {
  const UserObj = req.body
  const UserID = UserObj.UserID
  User.findByIdAndUpdate(UserID, {Sign: UserObj.Sign}, {new: true})
  .then((user) => res.send(user))
  .catch(err => res.send(err))
})


/////////////////////////// POST and Get Routes (axios) for User Patients //////////////////////////////

//Get Patient List
app.post("/patientlist", (req, res) => {
  const UserIDObj = req.body;
  const { userid } = UserIDObj;

  Patient.find({ user: userid })
    .then((patients) => res.send(patients))
    .catch((err) => console.log(err));
});

// Save or Update Patient to Database
app.post("/", (req, res) => {
  const PatientDetails = req.body;
  const PatientID = PatientDetails.PatientID;

  if (PatientID) {
    Patient.findByIdAndUpdate(PatientID, PatientDetails, {new: true})
      .then((patient) =>
        res.send(`${patient.patientName} updated successfully`)
      )
      .catch((err) => res.send(err));
  } else {
    const newPatient = new Patient(PatientDetails);
    newPatient
      .save()
      .then((patient) => res.send(`${patient.patientName} saved successfully`))
      .catch((err) => res.send(err));
  }
});

//Delete Patient
app.post("/deletepatient", (req, res) => {
  const PatientId = req.body.id;
  Patient.findByIdAndDelete(PatientId)
    .then(() => res.send("Successfully Deleted"))
    .catch((err) => res.send(err));
});

/////////////////////////// POST and Get Routes (axios) for Users Patients Appointments ///////////////////

// Save Appts
app.post("/saveAppt", (req, res) => {
  const ApptObj = req.body;
  const appt = new Appt(ApptObj);
  appt.save()
  .then((appt) => {
    res.send(appt);
  })
  .catch(err => {
    res.send(err)
  })

});

// Update Appts
app.post("/updateAppt", (req, res) => {
  const ApptObj = req.body
  const ApptID = ApptObj.ApptID
  Appt.findByIdAndUpdate(ApptID, ApptObj)
  .then((appt) =>
    res.send(`Appointment Updated Successfully!`)
  )
  .catch((err) => res.send(err));

})

// Delete Appts
app.post("/deleteAppt", (req, res) => {
  ApptObj = req.body
  ApptID = ApptObj.ApptID
  Appt.findByIdAndDelete(ApptID)
  .then(() => res.send("Appointment Deleted Successfully!"))
  .catch((err) => res.send(err))
})

//Get Appt List
app.post("/apptlist", (req, res) => {
  const UserIDObj = req.body;
  const { userid } = UserIDObj;
  Appt.find({ user: userid }).populate('Patient','patientName')
  .then((appts) => res.send(appts))
  .catch((err) => console.log(err));
})

//Dev route
app.get("/dev", (req, res) => {
  res.send("All okay")
  console.log("Dev Mode...")
})

/////////////////////////////////// Mongoose MongoDB connection //////////////////////////////////////////////////
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Mongoose Connection established..."))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running sucessfully on PORT ${PORT}`)
);
