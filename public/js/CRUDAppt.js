/////////////////////////// Get Patient List //////////////////////////////////////////////
function GetApptList() {
  const ApptListTable = document.getElementById("ApptListTable");
  window.scrollTo({ top: 0, behavior: "smooth" });
  const spinner = document.getElementById("spinner");

  //if statement used so that the list is Only populated once
  if (ApptListTable.innerText === "") {
    spinner.hidden = false;
    const UserID = document.getElementById("UserID").value;
    const UserIDObj = { userid: UserID };

    axios
      .post("https://summaryapptapp.onrender.com/apptlist", UserIDObj)
      .then((response) => {
        const ApptListArray = response.data;

        if (!ApptListArray[0]) {
          ApptListTable.innerText = "No Records Found";
        } else {
          ApptListArray.forEach((appt) => {
            const InputRow = document.createElement("tr");

            // 0. Appt ID Cell
            const IDCell = document.createElement("td");
            IDCell.hidden = true;
            IDCell.innerText = appt._id;

            // 1. Appt Date Cell
            const DateCell = document.createElement("td");
            const date = new Date(appt.ApptDate).toLocaleDateString();
            DateCell.onclick = (e) => EditModalAppt(e);
            DateCell.className = "btn btn-sm btn-link";
            DateCell.style = "font-size: 0.8rem";
            DateCell.innerText = date;

            // 2. Patient Name Cell
            const PatientNameCell = document.createElement("td");
            PatientNameCell.innerText = appt.Patient.patientName;

            // 3. Place Cell
            const PlaceCell = document.createElement("td");
            PlaceCell.innerText = appt.Place;

            // 4. ApptType Cell
            const ApptTypeCell = document.createElement("td");
            ApptTypeCell.innerText = appt.ApptType;

            // 5. Details Cell
            const DetailsCell = document.createElement("td");
            DetailsCell.innerText = appt.Details;

            // 6. Advice Cell
            const AdviceCell = document.createElement("td");
            AdviceCell.innerText = appt.Advice;

            // 7. Fees Cell
            const FeesCell = document.createElement("td");
            FeesCell.innerText = appt.Fees;

            // 8. Comment Cell
            const CommentCell = document.createElement("td");
            CommentCell.innerText = appt.Comment;

            InputRow.appendChild(IDCell);
            InputRow.appendChild(DateCell);
            InputRow.appendChild(PatientNameCell);
            InputRow.appendChild(PlaceCell);
            InputRow.appendChild(ApptTypeCell);
            InputRow.appendChild(DetailsCell);
            InputRow.appendChild(AdviceCell);
            InputRow.appendChild(FeesCell);
            InputRow.appendChild(CommentCell);
            ApptListTable.appendChild(InputRow);

            spinner.hidden = true;
          });
        }
      })
      .catch((err) => console.log(err));
  }
}

/////////////////////////// Register User Fn /////////////////////////////////////////////////
function Register() {
  const registerform = document.getElementById("Register");
  if (!registerform.checkValidity()) {
    registerform.classList.add("was-validated");
  } else {
    const username = document.getElementById("username").value;
    const MobileNo = document.getElementById("RegisMobileNo").value;
    const UserObj = {
      username,
      MobileNo,
    };

    axios
      .post("https://summaryapptapp.onrender.com/register", UserObj)
      .then((response) => {
        if (response.data === "Already registered") {
          UserAlreadyRegisMsg = document.getElementById(
            "UserAlreadyRegisMsg"
          ).innerText = `${MobileNo} is already registered. Please Login`;
          bootstrap.Toast.getOrCreateInstance(
            document.getElementById("AlreadyRegisToast")
          ).show();
        } else {
          // On successfull registration
          const User1 = response.data;

          // 1. Putting the id in a hidden input
          const UserIDDiv = (document.getElementById("UserID").value =
            User1._id);

          //  2. Changing WelcomeUser title
          const offcanvasTitle = (document.getElementById(
            "offcanvasTitle"
          ).innerText = `Welcome ${User1.username}`);

          // 3. Changing loginlogout div to logout
          const loginlogout = document.getElementById("loginlogout");
          const LogoutBtn = document.createElement("button");
          LogoutBtn.className = "btn btn-link btn-sm";
          LogoutBtn.textContent = "Logout";
          LogoutBtn.onclick = () => Logout();
          loginlogout.innerHTML = "";
          loginlogout.appendChild(LogoutBtn);

          // 4. Hide register modal and reset form
          const RegisterModal = bootstrap.Modal.getInstance("#RegisterModal");
          RegisterModal.hide();
          registerform.reset();

          // 5. Successfully registered toast
          NewRegisMsg = document.getElementById(
            "NewRegisMsg"
          ).innerText = `${User1.username} registered successfully`;
          bootstrap.Toast.getOrCreateInstance(
            document.getElementById("NewRegisToast")
          ).show();

          // 6. Reset the MyPatient List
          const PatientNameList = (document.getElementById(
            "PatientNameList"
          ).innerHTML = "");
          const PatientList = document.getElementById("PatientList");
          const bsCollapsePatientList = bootstrap.Collapse.getOrCreateInstance(
            PatientList,
            {
              toggle: false,
            }
          );
          bsCollapsePatientList.hide();

          //7. Update Login Status
          const LoginStatus = document.getElementById("LoginStatus");
          LoginStatus.innerHTML = `<i>Logged in as - ${User1.username}</i>`;
          LoginStatus.classList = "bg-success-subtle";

          //8. Close offcanvas
          const offcanvasNavbarLight = bootstrap.Offcanvas.getInstance(
            "#offcanvasNavbarLight"
          );
          offcanvasNavbarLight.hide();

          //9. Form Reset
          FormReset();
        }
      })
      .catch((err) => console.log(err));
  }
}

/////////////////////////// Login User Fn /////////////////////////////////////////////////
function Login() {
  const LoginForm = document.getElementById("LoginForm");
  if (!LoginForm.checkValidity()) {
    LoginForm.classList.add("was-validated");
  } else {
    const LoginMobileNo = document.getElementById("LoginMobileNo").value;
    const LoginObj = { MobileNo: LoginMobileNo };

    axios
      .post("https://summaryapptapp.onrender.com/userlogin", LoginObj)
      .then((response) => {
        if (response.data === "Not found") {
          LoginFailMsg = document.getElementById(
            "LoginFailMsg"
          ).innerText = `${LoginMobileNo} is not registered!`;
          bootstrap.Toast.getOrCreateInstance(
            document.getElementById("LoginFailToast")
          ).show();
        } else {
          // On successfull Login
          const User1 = response.data;

          // 1. Putting the id in a hidden input
          const UserIDDiv = (document.getElementById("UserID").value =
            User1._id);

          //  2. Changing WelcomeUser title
          const offcanvasTitle = (document.getElementById(
            "offcanvasTitle"
          ).innerText = `Welcome ${User1.username}`);

          // 3. Changing loginlogout div to logout
          const loginlogout = document.getElementById("loginlogout");
          const LogoutBtn = document.createElement("button");
          LogoutBtn.className = "btn btn-link btn-sm";
          LogoutBtn.textContent = "Logout";
          LogoutBtn.onclick = () => Logout();
          loginlogout.innerHTML = "";
          loginlogout.appendChild(LogoutBtn);

          // 5. Successfully registered toast
          LoginSuccessMsg = document.getElementById(
            "LoginSuccessMsg"
          ).innerText = `${User1.username} logged in`;
          bootstrap.Toast.getOrCreateInstance(
            document.getElementById("LoginSuccessToast")
          ).show();

          // 6. Reset the MyPatient List and hide it
          const ApptListTable = (document.getElementById(
            "ApptListTable"
          ).innerHTML = "");
          const ApptNameList = document.getElementById("ApptNameList");
          const bsCollapseApptNameList = bootstrap.Collapse.getOrCreateInstance(
            ApptNameList,
            {
              toggle: false,
            }
          );
          bsCollapseApptNameList.hide();

          //7. Update Login Status
          const LoginStatus = document.getElementById("LoginStatus");
          LoginStatus.innerHTML = `<i>Logged in as - ${User1.username}</i>`;
          LoginStatus.classList = "bg-success-subtle";

          //8. Close offcanvas
          const offcanvasNavbarLight = bootstrap.Offcanvas.getInstance(
            "#offcanvasNavbarLight"
          );
          offcanvasNavbarLight.hide();

          //9. Form Reset
          FormReset();
        }
      })
      .catch((err) => console.log(err));
  }
}

/////////////////////////// Logout User Fn ///////////////////////////////////////////////
function Logout() {
  // Successfully logged out toast
  LogoutSuccessMsg = document.getElementById("LogoutSuccessMsg").innerText =
    "Logged out successfully";
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById("LogoutSuccessToast")
  ).show();

  setTimeout(() => window.location.reload(true), 1000);
}

///////////////////////////// Save Appt to Database /////////////////////////////////////
function SaveApptToDB() {
  const ApptDate = document.getElementById("ApptDate").value;
  const UserID = document.getElementById("UserID").value;
  const PlaceRows = document.getElementById("PlaceRow");
  const PlacesTables = PlaceRows.querySelectorAll("tbody");
  const PlacesNames = PlaceRows.querySelectorAll("u");

  //////////////////// Validation ///////////////////////////
  // 1. Check for Login
  if (UserID === "66f98451e7c85d5b786bfd98") {
    window.alert(
      "You cannot save appointments as a Demo User. Please Login to save your appointments"
    );
    return;
  }

  // 2. Check for Date
  if (!ApptDate) {
    FailedToastMsg = document.getElementById("FailedToastMsg").innerHTML =
      "Please Enter a Date!";
    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("SavedFailToast")
    ).show();
    return;
  }

  // 3. Check for Empty Places
  if (!PlacesTables.length) {
    FailedToastMsg = document.getElementById("FailedToastMsg").innerHTML =
      "There is nothing to Save!";
    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("SavedFailToast")
    ).show();
    return;
  }

  // 4. Check for empty Patient Rows
  if (PlacesTables.length) {
    var EmptyRows = [];
    PlacesTables.forEach((table, i) => {
      const PatientRows = table.querySelectorAll("tr");
      if (PatientRows.length < 2) {
        EmptyRows.push(PlacesNames[i].innerText);
      }
    });
    if (EmptyRows.length) {
      FailedToastMsg = document.getElementById(
        "FailedToastMsg"
      ).innerHTML = `There are no Appointments in <b>${EmptyRows.join(
        " & "
      )} </b>. Please Add Appointments or delete the place(s)`;
      bootstrap.Toast.getOrCreateInstance(
        document.getElementById("SavedFailToast")
      ).show();
      return;
    }
  }

  ///////////////// Validation passed //////////////////////////

  PlacesTables.forEach((table, i) => {
    Place = PlacesNames[i].innerText;
    const PatientRows = table.querySelectorAll("tr");

    PatientRows.forEach((row) => {
      if (row.cells[7].innerText !== "Add") {
        const ApptObj = {};
        ApptObj["user"] = UserID;
        ApptObj["ApptDate"] = ApptDate;
        ApptObj["Place"] = Place;
        ApptObj["Patient"] = row.cells[0].innerText;
        ApptObj["ApptType"] = row.cells[2].innerText;
        ApptObj["Details"] = row.cells[3].innerText;
        ApptObj["Advice"] = row.cells[4].innerText;
        ApptObj["Fees"] = row.cells[5].innerText;
        ApptObj["Comment"] = row.cells[6].innerText;

        axios
          .post("https://summaryapptapp.onrender.com/saveAppt", ApptObj)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      }
    });
  });

  // Re-Render the Appt List
  const ApptListTable = document.getElementById("ApptListTable");
  ApptListTable.innerHTML = "";
  GetApptList();

  FormReset();
  SuccessToastMsg = document.getElementById("SuccessToastMsg").innerHTML =
    "Appointments saved Successfully";
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById("SavedSuccessToast")
  ).show();
}

//////////////////////////// Update Appt ////////////////////////////////////////////////
function UpdateAppt() {
  const EditApptform = document.getElementById("EditAppt");
  if (!EditApptform.checkValidity()) {
    EditApptform.classList.add("was-validated");
  } else {
    const ApptID = document.getElementById("ApptIDEdit").value;

    const Place = document.getElementById("PlaceEdit").value;
    const ApptType = document.getElementById("ApptTypeEdit").value;
    const Details = document.getElementById("DetailsEdit").value;
    const Advice = document.getElementById("AdviceEdit").value;
    const Fees = document.getElementById("FeesEdit").value;
    const Comment = document.getElementById("CommentEdit").value;
    const ApptObj = {
      ApptID,
      Place,
      ApptType,
      Details,
      Advice,
      Fees,
      Comment,
    };

    axios
      .post("https://summaryapptapp.onrender.com/updateAppt", ApptObj)
      .then((response) => {
        // Close the Modal
        const bsEditModal = document.getElementById("EditApptModal");
        bootstrap.Modal.getInstance(bsEditModal).hide();

        // Reset the Modal Form
        EditApptform.reset();
        const PatientNameSpan = document.getElementById("PatientNameEdit");
        PatientNameSpan.innerText = "";
        const ApptDateSpan = document.getElementById("ApptDateEdit");
        ApptDateSpan.innerText = "";

        // Update Success Toast
        SuccessToastMsg = document.getElementById("SuccessToastMsg").innerHTML =
          "Appointment updated Successfully";
        bootstrap.Toast.getOrCreateInstance(
          document.getElementById("SavedSuccessToast")
        ).show();

        // Re-Render the Appt List
        const ApptListTable = document.getElementById("ApptListTable");
        ApptListTable.innerHTML = "";
        GetApptList();
      })
      .catch((err) => console.log(err));
  }
}

///////////////////////////// Delete Appt //////////////////////////////////////////////
function DeleteAppt() {
  if (confirm("Are you sure you want to Delete?")) {
    const ApptID = document.getElementById("ApptIDEdit").value;
    const EditApptform = document.getElementById("EditAppt");

    const ApptObj = {
      ApptID,
    };

    console.log(ApptObj);

    axios
      .post("https://summaryapptapp.onrender.com/deleteAppt", ApptObj)
      .then((response) => {
        // Close the Modal
        const bsEditModal = document.getElementById("EditApptModal");
        bootstrap.Modal.getInstance(bsEditModal).hide();

        // Reset the Modal Form
        EditApptform.reset();
        const PatientNameSpan = document.getElementById("PatientNameEdit");
        PatientNameSpan.innerText = "";
        const ApptDateSpan = document.getElementById("ApptDateEdit");
        ApptDateSpan.innerText = "";

        // Delete Success Toast
        DeleteToastMsg = document.getElementById(
          "DeleteSuccessToastMsg"
        ).innerHTML = "Appointment Deleted Successfully";
        bootstrap.Toast.getOrCreateInstance(
          document.getElementById("DeleteSuccessToast")
        ).show();

        // Re-Render the Appt List
        const ApptListTable = document.getElementById("ApptListTable");
        ApptListTable.innerHTML = "";
        GetApptList();
      })
      .catch((err) => console.log(err));
  }
}
