////////////////////////// Get Patient List ///////////////////
function GetPatientList(input) {
  const PatientNameList = document.getElementById("PatientNameList");
  window.scrollTo({ top: 0, behavior: "smooth" });
  const spinner = document.getElementById("spinner");

  //if statement used so that the list is Only populated once
  if (PatientNameList.innerText === "") {
    spinner.hidden = false;
    const UserID = document.getElementById("UserID").value;
    const UserIDObj = { userid: UserID, searchTerm: input };

    axios
      .post(urldevmode[0] + "patientlist", UserIDObj)
      .then((response) => {
        const PatientList = response.data;

        if (!PatientList[0]) {
          PatientNameList.innerText = "No records found";
          spinner.hidden = true;
        } else {
          PatientList.forEach((patient) => {
            const row = document.createElement("tr");
            const NameCell = document.createElement("td");
            const NameBtn = document.createElement("button");
            NameBtn.className = "btn btn-link";
            NameBtn.textContent = patient.patientName;
            NameBtn.onclick = () => PopulateForm(patient);
            NameCell.appendChild(NameBtn);

            const AgeCell = document.createElement("td");
            AgeCell.className = "text-center";
            AgeCell.innerText = patient.age;

            const DxCell = document.createElement("td");
            DxCell.className = "text-center";
            patient.Diagnosis
              ? (DxCell.innerText = patient.Diagnosis)
              : (DxCell.innerText = "");

            const IPDNoCell = document.createElement("td");
            IPDNoCell.className = "text-center";
            patient.IPDNo
              ? (IPDNoCell.innerText = patient.IPDNo)
              : (IPDNoCell.innerText = "");

            const deleteCell = document.createElement("td");
            deleteCell.className =
              "d-flex justify-content-center align-items-center";
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.onclick = () => {
              if (
                confirm(
                  "Are you sure you want to Delete this Patient. Details will be lost forever!"
                )
              ) {
                DeletePatient(patient._id, patient.patientName);
                PatientNameList.removeChild(row);
              } else {
                return false;
              }
            };
            deleteCell.appendChild(deleteButton);

            row.appendChild(NameCell);
            row.appendChild(AgeCell);
            row.appendChild(DxCell);
            row.appendChild(IPDNoCell);
            row.appendChild(deleteCell);
            PatientNameList.appendChild(row);
            spinner.hidden = true;
          });
        }
      })
      .catch((err) => console.log(err));
  }
}

//////////////////////// GetSearchNames /////////////////////////////////////
function GetSearchNames(input){

  if (input.value.length >= 3){
    const PatientNameList = document.getElementById("PatientNameList");
    PatientNameList.innerHTML = ""
    GetPatientList(input.value)  
  } else if (input.value.length === 0){
    PatientNameList.innerHTML = ""
    GetPatientList()
  }
  
}

//////////////////////// Save Patient  //////////////////////////////////////
function SaveToDB() {
  // 0. Create a UserInputObject which will conatin details of all inputs
  const UserInputsObj = {};

  // 0. Pushing the user into the object
  const UserID = document.getElementById("UserID").value;

  if (UserID === "66f98451e7c85d5b786bfd98") {
    window.alert(
      "You cannot save or edit patients as a demo user. However you can change the inputs and generate Summaries. Please Login to save your patients"
    );
    return false;
  }

  window.confirm("Save Changes to Database? (Cannot be undone!)");

  UserInputsObj["user"] = UserID;

  // 1. Pushing all traditional inputs into the UserInputObj
  const AllInputList = document
    .getElementById("primaryInfo")
    .querySelectorAll("input");
  const AllSelectList = document
    .getElementById("primaryInfo")
    .querySelectorAll("select");
  const AllTextareaList = document
    .getElementById("primaryInfo")
    .querySelectorAll("textarea");

  const AllUserInputsList = [
    ...AllInputList,
    ...AllSelectList,
    ...AllTextareaList,
  ];

  AllUserInputsList.forEach(
    (userinput) => (UserInputsObj[userinput.id] = userinput.value)
  );

  // 2. Pushing the InvTable into te UserInputObj
  const tableBody = document.getElementById("InvTable");
  const InvTableRows = [];
  // Get all (sorted already) Invs
    const AllInv = tableBody.querySelectorAll("tr");
    AllInv.forEach((row) => {
      const InvObj = {
        date: row.cells[2].innerText,
        type: row.cells[0].innerText,
        site: row.cells[1].innerText,
        findings: row.cells[3].innerText,
      };
      InvTableRows.push(InvObj);
    });
  UserInputsObj["InvTableRows"] = InvTableRows;

  // 3. Pushing the Tagifys into UserInputObj
  UserInputsObj.SxSite = SxSiteTagify.value[0]
    ? SxSiteTagify.value[0].value
    : "";
  UserInputsObj.SxSide = SxSideTagify.value[0]
    ? SxSideTagify.value[0].value
    : "";
  UserInputsObj.Incisions = IncisionsTagify.value[0]
    ? IncisionsTagify.value[0].value
    : "";
  UserInputsObj.AdditionalSitesMucosal = AddlMucosalTagify.value.map(
    (obj) => obj.value
  );
  UserInputsObj.AdditionalSitesMandible = AddlMandibleTagify.value.map(
    (obj) => obj.value
  );
  UserInputsObj.AdditionalSitesMaxilla = AddlMaxillaTagify.value.map(
    (obj) => obj.value
  );
  UserInputsObj.AdditionalSitesDeeper = AddlDeeperTagify.value.map(
    (obj) => obj.value
  );
  UserInputsObj.AdditionalSitesSkin = AddlSkinTagify.value.map(
    (obj) => obj.value
  );
  UserInputsObj.AdditionalPro = AddlProTagify.value.map((obj) => obj.value);
  UserInputsObj.RNeckExtent = RNeckExtentTagify.value[0]
    ? RNeckExtentTagify.value[0].value
    : "";
  UserInputsObj.LNeckExtent = LNeckExtentTagify.value[0]
    ? LNeckExtentTagify.value[0].value
    : "";
  UserInputsObj.ReconType = ReconTypeTagify.value.map((obj) => obj.value);

  // 4. Pushing the checkboxes into UserInputObj
  //Neck Checkboxes
  function StringifyCheckbox(checkboxid){
    const boxesArray = []
    const checkedboxes = document.getElementById(checkboxid).querySelectorAll("input:checked")
    checkedboxes.forEach(box => {
      boxesArray.push(box.value)
    })
    return boxesArray.join(",")
  }

  const AllCheckboxList = ["RNeckLNRemoved", "LNeckLNRemoved", "RNeckStructureRemoved", "LNeckStructureRemoved", "RInvolvedNodes", "LInvolvedNodes"]

  AllCheckboxList.forEach(list => {
    UserInputsObj[list] = StringifyCheckbox(list)
  })


  //5. Post req using axios (Note: Check for user and update is handled by server)
  UserInputsObj["PatientID"] = document.getElementById("PatientID").value;

  console.log(UserInputsObj)

  axios
    .post(urldevmode[0] + "", UserInputsObj)
    .then((res) => {
      SuccessToastMsg = document.getElementById("SuccessToastMsg").innerText =
        res.data;
      bootstrap.Toast.getOrCreateInstance(
        document.getElementById("SavedSuccessToast")
      ).show();

      // Reset Patient Name List
      const PatientNameList = document.getElementById("PatientNameList");
      PatientNameList.innerHTML = "";

      const PatientList = document.getElementById("PatientList");
      const bsCollapsePatientList = new bootstrap.Collapse(PatientList, {
        toggle: false,
      });
      bsCollapsePatientList.hide();
      FormReset();
      GetPatientList();
    })
    .catch((err) => {
      FailedToastMsg = document.getElementById(
        "FailedToastMsg"
      ).innerText = `Failed to save due to: ${err}`;
      bootstrap.Toast.getOrCreateInstance(
        document.getElementById("SavedFailedToast")
      ).show();
    });
}

//////////////////////// Update Patient //////////////////////////////////////
//Update is handled by server through Save to DB()

//////////////////////// Delete Patient  //////////////////////////////////////
function DeletePatient(id, name) {
  const UserID = document.getElementById("UserID").value;

  if (UserID === "66f98451e7c85d5b786bfd98") {
    alert(
      "As a demo user your changes will not be saved. Please Login to save your data"
    );
    return false;
  }

  axios
    .post(urldevmode[0] + "deletepatient", { id })
    .then((res) => {
      DeleteSuccessToastMsg = document.getElementById(
        "DeleteSuccessToastMsg"
      ).innerText = `${name} ${res.data}`;
      bootstrap.Toast.getOrCreateInstance(
        document.getElementById("DeleteSuccessToast")
      ).show();
      FormReset();
    })
    .catch((err) => console.log(err));
}

/////////////////////////// Register User Fn /////////////////////////////////////////////////
function Register() {
  const registerform = document.getElementById("Register");
  if (!registerform.checkValidity()) {
    registerform.classList.add("was-validated");
  } else {
    const username = document.getElementById("username").value;
    const MobileNo = document.getElementById("RegisMobileNo").value;
    const Sign = document.getElementById("Sign").value;
    const UserObj = {
      username,
      MobileNo,
      Sign,
    };

    axios
      .post(urldevmode[0] + "register", UserObj)
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

          // 1. Putting the id & sign in a hidden input
          document.getElementById("UserID").value = User1._id;
          document.getElementById("UserSign").value = User1.Sign;

          //  2. Changing WelcomeUser title
          const offcanvasTitle = (document.getElementById(
            "offcanvasTitle"
          ).innerText = `Welcome ${User1.username}`);

          // 3. Changing loginlogout div to logout
          const loginlogout = document.getElementById("loginlogout");
          loginlogout.innerHTML = "";

          const LogoutBtn = document.createElement("button");
          LogoutBtn.className = "btn btn-link";
          LogoutBtn.textContent = "Logout";
          LogoutBtn.onclick = () => Logout();
          loginlogout.appendChild(LogoutBtn);

          const ChangeSignBtn = document.createElement("button");
          ChangeSignBtn.className = "btn btn-link btn-sm float-end";
          ChangeSignBtn.textContent = "Update User Sign";
          ChangeSignBtn.onclick = () => GetSign();
          loginlogout.appendChild(ChangeSignBtn);

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
      .post(urldevmode[0] + "userlogin", LoginObj)
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

          // 1. Putting the id & sign in a hidden input
          document.getElementById("UserID").value = User1._id;
          document.getElementById("UserSign").value = User1.Sign;

          //  2. Changing WelcomeUser title
          const offcanvasTitle = (document.getElementById(
            "offcanvasTitle"
          ).innerText = `Welcome ${User1.username}`);

          // 3. Changing loginlogout div to logout
          const loginlogout = document.getElementById("loginlogout");
          loginlogout.innerHTML = "";

          const LogoutBtn = document.createElement("button");
          LogoutBtn.className = "btn btn-link btn-sm";
          LogoutBtn.textContent = "Logout";
          LogoutBtn.onclick = () => Logout();
          loginlogout.appendChild(LogoutBtn);

          const ChangeSignBtn = document.createElement("button");
          ChangeSignBtn.className = "btn btn-link btn-sm float-end";
          ChangeSignBtn.textContent = "Update User Sign";
          ChangeSignBtn.onclick = () => GetSign();
          loginlogout.appendChild(ChangeSignBtn);

          // 5. Successfully registered toast
          LoginSuccessMsg = document.getElementById(
            "LoginSuccessMsg"
          ).innerText = `${User1.username} logged in`;
          bootstrap.Toast.getOrCreateInstance(
            document.getElementById("LoginSuccessToast")
          ).show();

          // 6. Reset the MyPatient List and hide it
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

/////////////////////////// Logout User Fn ///////////////////////////////////////////////
function Logout() {
  // Successfully logged out toast
  LogoutSuccessMsg = document.getElementById("LogoutSuccessMsg").innerText =
    "Logged out successfully";
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById("LogoutSuccessToast")
  ).show();

  setTimeout(() => window.location.reload(true), 2000);
}

/////////////////////////// Update User Sign ///////////////////////////////////////
function ChangeSign() {
  const UserID = document.getElementById("UserID").value;
  const Sign = document.getElementById("ChangeSign").value;
  UserObj = {
    UserID,
    Sign,
  };

  axios
    .post(urldevmode[0] + "changesign", UserObj)
    .then((response) => {
      const User1 = response.data;

      // Putting the Changed sign in hidden User Sign input
      const UserSign = document.getElementById("UserSign");
      UserSign.value = User1.Sign;

      // Hiding the Modal
      bootstrap.Modal.getInstance("#ChangeSignModal").hide();

      //Re-Generate Summary with new Sign
      genSummary();

      // Success Toast
      document.getElementById(
        "SuccessToastMsg"
      ).innerText = `${User1.username}'s sign Updated Successfully`;
      bootstrap.Toast.getOrCreateInstance("#SavedSuccessToast").show();
    })
    .catch((err) => console.log(err));
}
