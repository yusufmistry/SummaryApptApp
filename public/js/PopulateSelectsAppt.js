//////////////////////////////////// Populate Options for Appt Type /////////////////////////////////
function PopulateApptTypeSelect(e) {
  const ApptType = e;
  const ApptTypesList = [
    "First Visit",
    "Routine FU",
    "Emergency FU",
    "Dressing",
    "Sx Explain",
    "Biopsy",
    "Rounds"
  ];

  ApptType.setAttribute("list", `${e.id}datalist`);
  const datalist = document.createElement("datalist");
  datalist.id = `${e.id}datalist`;
  ApptTypesList.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    datalist.appendChild(option);
  });

  ApptType.parentNode.appendChild(datalist);
  ApptType.removeAttribute("onfocus") //So that it can only be run once
}

/////////////////////////// Populate Patient Name List /////////////////////////////////////
function PopulatePatientList(e) {
  const SelectName = e;

  const Loading = document.createElement("option");
  Loading.value = "";
  Loading.textContent = "Loading...";
  SelectName.appendChild(Loading);

  const UserID = document.getElementById("UserID").value;
  const UserIDObj = { userid: UserID };

  axios
    .post("http://localhost:5000/patientlist", UserIDObj)
    .then((response) => {
      const PatientList = response.data;
      if (!PatientList[0]) {
        Loading.textContent = "No Patients Found";
      } else {
        PatientList.forEach((patient) => {
          const option = document.createElement("option");
          option.value = patient._id;
          option.textContent = patient.patientName;
          option.title = `${patient.age}/${patient.gender} Dx: ${patient.Diagnosis}`;
          SelectName.appendChild(option);
        });
        Loading.textContent = "Select";
      }
      SelectName.removeAttribute("onfocus"); //So that it can only be run once
    })
    .catch((err) => console.log(err));
}
