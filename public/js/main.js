// /////////////////////// Validation Function (BS 5.3)////////////////////
function validateForm() {
  const form = document.getElementById("primaryInfo");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    FailedToastMsg = document.getElementById("FailedToastMsg").innerText =
      "Some essential data is missing or incorrect data is enetered";
    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("SavedFailToast")
    ).show();
  } else {
    SaveToDB();
  }
}
///////////////////////////// First Visit Enabler/////////////////////////
function FirstVisitEnabler() {
  const FVExpanded = document.getElementById("FVExpanded");
  const bsCollapseFVExpanded = new bootstrap.Collapse(FVExpanded, {
    toggle: false,
  });
  bsCollapseFVExpanded.show();
}

///////////////////////////// Rx Enabler /////////////////////////////////
function RxEnabler() {
  const RxExpanded = document.getElementById("RxExpanded");

  const bsCollapseRxExpanded = new bootstrap.Collapse(RxExpanded, {
    toggle: false,
  });

  bsCollapseRxExpanded.show();
}

///////////////////////////// Primary Enabler Function ///////////////////
function PrimaryEnabler() {
  const SxType = document.getElementById("SxType").value;
  const NeckType = document.getElementById("NeckType").value;
  const PrimaryTumourDetails = document.getElementById("PrimaryTumourDetails");
  const PrimaryTumourDetailsBtn = document.getElementById(
    "PrimaryTumourDetailsBtn"
  );
  const bsCollapsePrimary = new bootstrap.Collapse(PrimaryTumourDetails, {
    toggle: false,
  });

  const PDTSiteSide = document.getElementById("PDTSiteSide");
  const PDTInc = document.getElementById("PDTInc");
  const PDTAddlHead = document.getElementById("PDTAddlHead");
  const PDTAddlMuc = document.getElementById("PDTAddlMuc");
  const PDTAddlMan = document.getElementById("PDTAddlMan");
  const PDTAddlMax = document.getElementById("PDTAddlMax");
  const PDTAddlDeep = document.getElementById("PDTAddlDeep");
  const PDTAddlSkin = document.getElementById("PDTAddlSkin");
  const PDTAddlPro = document.getElementById("PDTAddlPro");
  //Arrays made for each input that needs to be shown
  const AllinputArray = [
    PDTSiteSide,
    PDTInc,
    PDTAddlHead,
    PDTAddlMuc,
    PDTAddlMan,
    PDTAddlMax,
    PDTAddlDeep,
    PDTAddlSkin,
    PDTAddlPro,
  ];
  const WideExcArr = [PDTSiteSide, PDTInc, PDTAddlHead, PDTAddlMuc, PDTAddlPro];
  const CompResArr = [
    PDTSiteSide,
    PDTInc,
    PDTAddlHead,
    PDTAddlMuc,
    PDTAddlMan,
    PDTAddlMax,
    PDTAddlDeep,
    PDTAddlSkin,
    PDTAddlPro,
  ];
  const OtherArr = [];

  //Resetting all tags everytime onchange()
  SxSiteTagify.removeAllTags();
  SxSideTagify.removeAllTags();
  IncisionsTagify.removeAllTags();
  AddlMucosalTagify.removeAllTags();
  AddlMandibleTagify.removeAllTags();
  AddlMaxillaTagify.removeAllTags();
  AddlDeeperTagify.removeAllTags();
  AddlSkinTagify.removeAllTags();
  AddlProTagify.removeAllTags();
  //Hide All inputs first evertime onchage()
  AllinputArray.forEach((col) => (col.hidden = true));
  PrimaryTumourDetailsBtn.disabled = false;
  PrimaryTumourDetails.hidden = false;

  // Histopath Part
  const HistopathRow = document.getElementById("HistopathRow");
  const PrimaryHP = document.getElementById("PrimaryHP");
  const TNM = document.getElementById("TNM");
  // Resetting all input feilds of HP
  const AllPrimaryHPInputs = PrimaryHP.querySelectorAll("input");
  const AllPrimaryHPSelects = PrimaryHP.querySelectorAll("select");
  const AllPrimaryHPData = [...AllPrimaryHPInputs, ...AllPrimaryHPSelects];
  AllPrimaryHPData.forEach((data) => {
    data.value = "";
    data.disabled = true;
  });
  //Hiding HP everytime onchange()
  HistopathRow.hidden = true;
  PrimaryHP.hidden = true;
  TNM.hidden = true;

  if (SxType === "Wide Excision") {
    WideExcArr.forEach((col) => (col.hidden = false));
    bsCollapsePrimary.show();
    AllPrimaryHPData.forEach((data) => (data.disabled = false));
    HistopathRow.hidden = false;
    PrimaryHP.hidden = false;
    TNM.hidden = false;
  }

  if (SxType === "Composite Resection") {
    CompResArr.forEach((col) => (col.hidden = false));
    bsCollapsePrimary.show();
    AllPrimaryHPData.forEach((data) => (data.disabled = false));
    HistopathRow.hidden = false;
    PrimaryHP.hidden = false;
    TNM.hidden = false;
  }

  //We need the HP to persist if Neck dissection done
  if (NeckType) {
    HistopathRow.hidden = false;
    TNM.hidden = false;
  }
}

function PrimaryEnablerNoReset() {
  const SxType = document.getElementById("SxType").value;
  const NeckType = document.getElementById("NeckType").value;
  const PrimaryTumourDetails = document.getElementById("PrimaryTumourDetails");
  const PrimaryTumourDetailsBtn = document.getElementById(
    "PrimaryTumourDetailsBtn"
  );
  const bsCollapsePrimary = new bootstrap.Collapse(PrimaryTumourDetails, {
    toggle: false,
  });

  const PDTSiteSide = document.getElementById("PDTSiteSide");
  const PDTInc = document.getElementById("PDTInc");
  const PDTAddlHead = document.getElementById("PDTAddlHead");
  const PDTAddlMuc = document.getElementById("PDTAddlMuc");
  const PDTAddlMan = document.getElementById("PDTAddlMan");
  const PDTAddlMax = document.getElementById("PDTAddlMax");
  const PDTAddlDeep = document.getElementById("PDTAddlDeep");
  const PDTAddlSkin = document.getElementById("PDTAddlSkin");
  const PDTAddlPro = document.getElementById("PDTAddlPro");
  //Arrays made for each input that needs to be shown
  const AllinputArray = [
    PDTSiteSide,
    PDTInc,
    PDTAddlHead,
    PDTAddlMuc,
    PDTAddlMan,
    PDTAddlMax,
    PDTAddlDeep,
    PDTAddlSkin,
    PDTAddlPro,
  ];
  const WideExcArr = [PDTSiteSide, PDTInc, PDTAddlHead, PDTAddlMuc, PDTAddlPro];
  const CompResArr = [
    PDTSiteSide,
    PDTInc,
    PDTAddlHead,
    PDTAddlMuc,
    PDTAddlMan,
    PDTAddlMax,
    PDTAddlDeep,
    PDTAddlSkin,
    PDTAddlPro,
  ];
  const OtherArr = [];

  // Histopath Part
  const HistopathRow = document.getElementById("HistopathRow");
  const PrimaryHP = document.getElementById("PrimaryHP");
  const TNM = document.getElementById("TNM");

  //Hide All inputs first evertime onchage()
  AllinputArray.forEach((col) => (col.hidden = true));
  PrimaryTumourDetailsBtn.disabled = false;
  PrimaryTumourDetails.hidden = false;
  //Hiding HP everytime onchange()
  HistopathRow.hidden = true;
  PrimaryHP.hidden = true;
  TNM.hidden = true;

  if (SxType === "Wide Excision") {
    WideExcArr.forEach((col) => (col.hidden = false));
    bsCollapsePrimary.show();
    HistopathRow.hidden = false;
    PrimaryHP.hidden = false;
    TNM.hidden = false;
  }

  if (SxType === "Composite Resection") {
    CompResArr.forEach((col) => (col.hidden = false));
    bsCollapsePrimary.show();
    HistopathRow.hidden = false;
    PrimaryHP.hidden = false;
    TNM.hidden = false;
  }

  //We need the HP to persist if Neck dissection done
  if (NeckType) {
    HistopathRow.hidden = false;
    TNM.hidden = false;
  }
}

///////////////////////////// Neck Enabler Function /////////////////////
function NeckEnabler() {
  const NeckType = document.getElementById("NeckType").value;
  const SxType = document.getElementById("SxType").value;
  const NeckDetails = document.getElementById("NeckDetails");
  const NeckDetailsBtn = document.getElementById("NeckDetailsBtn");
  const bsCollapseNeck = new bootstrap.Collapse(NeckDetails, {
    toggle: false,
  });

  const SameNeckDetails = document.getElementById("SameNeckDetails");
  const OppositeNeckDetails = document.getElementById("OppositeNeckDetails");
  const RNeckLNBoxes = document
    .getElementById("RNeckLNRemoved")
    .querySelectorAll("input");
  const RNeckStructureBoxes = document
    .getElementById("RNeckStructureRemoved")
    .querySelectorAll("input");
  const LNeckLNBoxes = document
    .getElementById("LNeckLNRemoved")
    .querySelectorAll("input");
  const LNeckStructureBoxes = document
    .getElementById("LNeckStructureRemoved")
    .querySelectorAll("input");

  //Hide both necks first evertime and reset onchage()
  SameNeckDetails.hidden = true;
  OppositeNeckDetails.hidden = true;
  NeckDetailsBtn.disabled = false;
  RNeckLNBoxes.forEach((box) => (box.checked = false));
  RNeckStructureBoxes.forEach((box) => (box.checked = false));
  LNeckLNBoxes.forEach((box) => (box.checked = false));
  LNeckStructureBoxes.forEach((box) => (box.checked = false));
  RNeckExtentTagify.removeAllTags();
  LNeckExtentTagify.removeAllTags();

  //Histopath Part
  const HistopathRow = document.getElementById("HistopathRow");
  const RNeckHP = document.getElementById("RNeckHP");
  const LNeckHP = document.getElementById("LNeckHP");
  const TNM = document.getElementById("TNM");

  // Resetting HP
  const RNodalYeild = document.getElementById("RNodalYeild");
  const LNodalYeild = document.getElementById("LNodalYeild");
  const RPositNodes = document.getElementById("RPositNodes");
  const LPositNodes = document.getElementById("LPositNodes");
  RNodalYeild.value = "";
  LNodalYeild.value = "";
  RPositNodes.value = "";
  LPositNodes.value = "";
  RNodalYeild.disabled = true;
  RPositNodes.disabled = true;
  LNodalYeild.disabled = true;
  LPositNodes.disabled = true;
  NodeHPEnabler("R");
  NodeHPEnabler("L");

  //Hiding HP everytime onchange()
  HistopathRow.hidden = true;
  RNeckHP.hidden = true;
  LNeckHP.hidden = true;
  TNM.hidden = true;

  if (NeckType === "Ipsilateral") {
    SameNeckDetails.hidden = false;
    bsCollapseNeck.show();
    RNodalYeild.disabled = false;
    RPositNodes.disabled = false;
    HistopathRow.hidden = false;
    RNeckHP.hidden = false;
    TNM.hidden = false;
  }

  if (NeckType === "Bilateral") {
    SameNeckDetails.hidden = false;
    OppositeNeckDetails.hidden = false;
    bsCollapseNeck.show();
    RNodalYeild.disabled = false;
    RPositNodes.disabled = false;
    LNodalYeild.disabled = false;
    LPositNodes.disabled = false;
    HistopathRow.hidden = false;
    RNeckHP.hidden = false;
    LNeckHP.hidden = false;
    TNM.hidden = false;
  }

  if (NeckType === "Contralateral") {
    OppositeNeckDetails.hidden = false;
    bsCollapseNeck.show();
    LNodalYeild.disabled = false;
    LPositNodes.disabled = false;
    HistopathRow.hidden = false;
    LNeckHP.hidden = false;
    TNM.hidden = false;
  }

  //We need the HP to persist if Primary done
  if (SxType) {
    HistopathRow.hidden = false;
    TNM.hidden = false;
  }
}

function NeckEnablerNoReset() {
  const NeckType = document.getElementById("NeckType").value;
  const SxType = document.getElementById("SxType").value;
  const NeckDetails = document.getElementById("NeckDetails");
  const NeckDetailsBtn = document.getElementById("NeckDetailsBtn");
  const bsCollapseNeck = new bootstrap.Collapse(NeckDetails, {
    toggle: false,
  });

  const SameNeckDetails = document.getElementById("SameNeckDetails");
  const OppositeNeckDetails = document.getElementById("OppositeNeckDetails");
  const RNeckLNBoxes = document
    .getElementById("RNeckLNRemoved")
    .querySelectorAll("input");
  const RNeckStructureBoxes = document
    .getElementById("RNeckStructureRemoved")
    .querySelectorAll("input");
  const LNeckLNBoxes = document
    .getElementById("LNeckLNRemoved")
    .querySelectorAll("input");
  const LNeckStructureBoxes = document
    .getElementById("LNeckStructureRemoved")
    .querySelectorAll("input");

  const HistopathRow = document.getElementById("HistopathRow");
  const RNeckHP = document.getElementById("RNeckHP");
  const LNeckHP = document.getElementById("LNeckHP");
  const TNM = document.getElementById("TNM");

  //Hide both necks first evertime and reset onchage()
  SameNeckDetails.hidden = true;
  OppositeNeckDetails.hidden = true;
  NeckDetailsBtn.disabled = false;

  //Hiding HP everytime onchange()
  HistopathRow.hidden = true;
  RNeckHP.hidden = true;
  LNeckHP.hidden = true;
  TNM.hidden = true;

  if (NeckType === "Ipsilateral") {
    SameNeckDetails.hidden = false;
    bsCollapseNeck.show();
    HistopathRow.hidden = false;
    RNeckHP.hidden = false;
    TNM.hidden = false;
  }

  if (NeckType === "Bilateral") {
    SameNeckDetails.hidden = false;
    OppositeNeckDetails.hidden = false;
    bsCollapseNeck.show();
    HistopathRow.hidden = false;
    RNeckHP.hidden = false;
    LNeckHP.hidden = false;
    TNM.hidden = false;
  }

  if (NeckType === "Contralateral") {
    OppositeNeckDetails.hidden = false;
    bsCollapseNeck.show();
    HistopathRow.hidden = false;
    LNeckHP.hidden = false;
    TNM.hidden = false;
  }

  //We need the HP to persist if Primary done
  if (SxType) {
    HistopathRow.hidden = false;
    TNM.hidden = false;
  }
}

//////////////////////////// Neck Structures Enabler /////////////////////
RNeckExtentTagify.on("change", RNeckStrEnabler);
function RNeckStrEnabler(e) {
  const RNeckLNBoxes = document
    .getElementById("RNeckLNRemoved")
    .querySelectorAll("input");
  const RNeckStructureBoxes = document
    .getElementById("RNeckStructureRemoved")
    .querySelectorAll("input");
  if (e.detail.value) {
    RNeckLNBoxes.forEach((box) => (box.disabled = false));
    RNeckStructureBoxes.forEach((box) => (box.disabled = false));
  } else {
    RNeckLNBoxes.forEach((box) => {
      box.checked = false;
      box.disabled = true;
    });
    RNeckStructureBoxes.forEach((box) => {
      box.checked = false;
      box.disabled = true;
    });
  }
}

LNeckExtentTagify.on("change", LNeckStrEnabler);
function LNeckStrEnabler(e) {
  const LNeckLNBoxes = document
    .getElementById("LNeckLNRemoved")
    .querySelectorAll("input");
  const LNeckStructureBoxes = document
    .getElementById("LNeckStructureRemoved")
    .querySelectorAll("input");
  if (e.detail.value) {
    LNeckLNBoxes.forEach((box) => (box.disabled = false));
    LNeckStructureBoxes.forEach((box) => (box.disabled = false));
  } else {
    LNeckLNBoxes.forEach((box) => {
      box.checked = false;
      box.disabled = true;
    });
    LNeckStructureBoxes.forEach((box) => {
      box.checked = false;
      box.disabled = true;
    });
  }
}

//////////////////////////// Node HP Enabler Function ////////////////////
function NodeHPEnabler(side) {
  const PositNode = document.getElementById(`${side}PositNodes`);
  const InvolvedNodes = document.getElementById(`${side}InvolvedNodes`);
  const PositNodeDetails = document.getElementById(`${side}PositNodeDetails`);
  const InvolvedNodesInput = InvolvedNodes.querySelectorAll("input");
  const InvolvedNodesSelect = InvolvedNodes.querySelectorAll("select");
  const PositNodeDetailsInput = PositNodeDetails.querySelectorAll("input");
  const PositNodeDetailsSelect = PositNodeDetails.querySelectorAll("select");

  if (PositNode.value && PositNode.value != 0) {
    InvolvedNodesInput.forEach((input) => {
      input.disabled = false;
    });
    InvolvedNodesSelect.forEach((select) => {
      select.disabled = false;
    });
    PositNodeDetailsInput.forEach((input) => {
      input.disabled = false;
    });
    PositNodeDetailsSelect.forEach((select) => {
      select.disabled = false;
    });
  } else {
    InvolvedNodesInput.forEach((input) => {
      input.disabled = true;
      input.checked = false;
    });
    InvolvedNodesSelect.forEach((select) => {
      select.disabled = true;
      select.value = "";
    });
    PositNodeDetailsInput.forEach((input) => {
      input.disabled = true;
      input.checked = false;
      input.value = "";
    });
    PositNodeDetailsSelect.forEach((select) => {
      select.disabled = true;
      select.value = "";
    });
  }
}

//////////////////////////// Add Investigation Function //////////////////
function addInvestigation() {
  const date = document.getElementById("InvDate");
  const type = document.getElementById("InvType");
  const site = document.getElementById("InvSite");
  const findings = document.getElementById("InvFindings");
  const AddInvModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("AddInvModal")
  );

  if (!type.value || !findings.value) {
    alert("Please enter relevant Investigation details");
  } else {
    const tableBody = document.getElementById("InvTable");

    const InvArray = [];

    //Create new Inv Obj
    const InvObj = {
      date: date.value,
      type: type.value,
      site: site.value,
      findings: findings.value,
    };

    InvArray.push(InvObj);

    // get previous Invs
    const PrevInv = tableBody.querySelectorAll("tr");
    PrevInv.forEach((row) => {
      const InvObj = {
        date: row.cells[2].innerText,
        type: row.cells[0].innerText,
        site: row.cells[1].innerText,
        findings: row.cells[3].innerText,
      };

      InvArray.push(InvObj);
    });

    InvArray.sort((a, b) => {
      const Adate = new Date(a.date ? a.date : "1970-01-01");
      const Bdate = new Date(b.date ? b.date : "1970-01-01");
      return Adate - Bdate;
    });

    tableBody.innerHTML = ""; //Reset Table first

    //Populate New Sorted table
    InvArray.forEach((inv) => {
      const row = document.createElement("tr");

      const typeCell = document.createElement("td");
      typeCell.innerText = inv.type;

      const siteCell = document.createElement("td");
      siteCell.innerText = inv.site;

      const dateCell = document.createElement("td");
      dateCell.innerText = inv.date;

      const findingsCell = document.createElement("td");
      findingsCell.innerText = inv.findings;

      const deleteCell = document.createElement("td");
      deleteCell.className = "d-grid gap-1";
      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.className = "btn btn-warning btn-sm";
      editButton.onclick = () => {
        type.value = typeCell.innerText;
        date.value = dateCell.innerText;
        site.value = siteCell.innerText;
        findings.value = findingsCell.innerText;
        tableBody.removeChild(row);
        AddInvModal.show();
      };
      deleteCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "btn btn-danger btn-sm";
      deleteButton.onclick = () =>
        confirm("Delete Investigation?") ? tableBody.removeChild(row) : false;
      deleteCell.appendChild(deleteButton);

      row.appendChild(typeCell);
      row.appendChild(siteCell);
      row.appendChild(dateCell);
      row.appendChild(findingsCell);
      row.appendChild(deleteCell);
      tableBody.appendChild(row);
    });

    // Reset Form //
    type.value = "";
    site.value = "";
    date.value = "";
    findings.value = "";
    AddInvModal.hide();
  }
}

//////////////////////////// Generating Datalists Function ///////////////
function populateDatalist(listname, optionsArray) {
  const datalist = document.getElementById(listname);
  optionsArray.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    datalist.appendChild(option);
  });
}

populateDatalist("inv-type", InvTypeArray);
populateDatalist("inv-site", InvSiteArray);
populateDatalist("PNILVIlist", PNILVIArray);
populateDatalist("margins", marginsArray);

////////////////////////// Lazy Load Background Videos & Init Tooltips ///////////////////
let urldevmode = [];
window.onload = function () {
  const videoBackground = document.getElementById("video-background");
  const video = videoBackground.querySelector("video");
  const source = video.querySelector("source");

  // Set the video source and start loading it
  source.src = "bgvideos/autumn forest.mp4";
  video.load();

  // Show the video once it's ready to play
  video.oncanplaythrough = function () {
    videoBackground.style.display = "block";
  };
  // Init Tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  /////////////////////////// Get Base URL string ///////////////
  axios
    .get("http://localhost:5000/dev")
    .then((response) => {
      console.log(response.data);
      if (response.data === "dev mode") {
        urldevmode.push("http://localhost:5000/");
      }
    })
    .catch((error) => urldevmode.push("https://summaryapp-trnb.onrender.com/"));

  console.log(urldevmode);
};

////////////////////////// Populate From from pt ///////////////////

function PopulateForm(patient) {
  const form = document.getElementById("primaryInfo");
  FormReset();
  console.log(patient);

  //Putting the ID for update and delete purposes
  document.getElementById("PatientID").value = patient._id;

  //Inputting Traditionals
  for (const input in patient) {
    //Loop through all "enumerable" propeties of an object using for...in loop
    if (patient.hasOwnProperty(input)) {
      //hasOwnPropery ensures that only its own (and not inherited) properties are looped through
      const FormInput = document.getElementById(input);
      if (FormInput) {
        FormInput.value = patient[input];
      }
    }
  }

  //Inputting Inv Table
  if(patient.InvTableRows[0]){ //Run the code only if investigations exist (if no inv then InvTableRows = [])
    if (patient.InvTableRows[0]["0"] === "<") { //Backwards Compatibility
      const tableBody = document.getElementById("InvTable");
      const INVInnerHTML = Object.values(patient.InvTableRows[0]).join("")
      tableBody.innerHTML = INVInnerHTML
  
      const date = document.getElementById("InvDate");
      const type = document.getElementById("InvType");
      const site = document.getElementById("InvSite");
      const findings = document.getElementById("InvFindings");
      const AddInvModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("AddInvModal")
      );
  
      const AlldeleteBtns = tableBody.querySelectorAll("button");
      AlldeleteBtns.forEach((btn) => {
        btn.type = "button";
        if (btn.textContent === "X") {
          btn.onclick = () =>
            confirm("Delete Investigation?") ? btn.closest("tr").remove() : false;
        } else {
          btn.onclick = () => {
            const row = btn.closest("tr").childNodes;
  
            type.value = row[0].innerText;
            date.value = row[2].innerText;
            site.value = row[1].innerText;
            findings.value = row[3].innerText;
            btn.closest("tr").remove();
            findings.style.height = findings.scrollHeight + 3 + "px";
            AddInvModal.show();
          };
        }
      });
  
    } else {
      const date = document.getElementById("InvDate");
      const type = document.getElementById("InvType");
      const site = document.getElementById("InvSite");
      const findings = document.getElementById("InvFindings");
      const AddInvModal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("AddInvModal")
    );
      const tableBody = document.getElementById("InvTable");
  
      patient.InvTableRows.forEach((inv) => {
  
        const row = document.createElement("tr");
  
        const typeCell = document.createElement("td");
        typeCell.innerText = inv.type;
  
        const siteCell = document.createElement("td");
        siteCell.innerText = inv.site
  
        const dateCell = document.createElement("td");
        dateCell.innerText = inv.date;
  
        const findingsCell = document.createElement("td");
        findingsCell.innerText = inv.findings
  
        const deleteCell = document.createElement("td");
        deleteCell.className = "d-grid gap-1";
        const editButton = document.createElement("button");
        editButton.textContent = "✎";
        editButton.className = "btn btn-warning btn-sm";
        editButton.onclick = () => {
          type.value = typeCell.innerText;
          date.value = dateCell.innerText;
          site.value = siteCell.innerText;
          findings.value = findingsCell.innerText;
          tableBody.removeChild(row);
          AddInvModal.show();
        };
        deleteCell.appendChild(editButton);
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = () =>
          confirm("Delete Investigation?") ? tableBody.removeChild(row) : false;
        deleteCell.appendChild(deleteButton);
  
        row.appendChild(typeCell);
        row.appendChild(siteCell);
        row.appendChild(dateCell);
        row.appendChild(findingsCell);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    }
  }

  

  //Inputting Tagifys

  SxSideTagify.addTags(patient.SxSide);
  SxSiteTagify.addTags(patient.SxSite);
  IncisionsTagify.addTags(patient.Incisions);
  AddlMucosalTagify.addTags(patient.AdditionalSitesMucosal);
  AddlMandibleTagify.addTags(patient.AdditionalSitesMandible);
  AddlMaxillaTagify.addTags(patient.AdditionalSitesMaxilla);
  AddlDeeperTagify.addTags(patient.AdditionalSitesDeeper);
  AddlSkinTagify.addTags(patient.AdditionalSitesSkin);
  AddlProTagify.addTags(patient.AdditionalPro);
  RNeckExtentTagify.addTags(patient.RNeckExtent);
  LNeckExtentTagify.addTags(patient.LNeckExtent);
  ReconTypeTagify.addTags(patient.ReconType);

  //Checking Boxes

  if (patient.RNeckLNRemoved) {
    const RNeckLNRemovedArray = patient.RNeckLNRemoved.split(",");
    RNeckLNRemovedArray.forEach((box) => {
      document.getElementById(`R${box}`).checked = true;
    });
  }

  if (patient.LNeckLNRemoved) {
    const LNeckLNRemovedArray = patient.LNeckLNRemoved.split(",");
    LNeckLNRemovedArray.forEach((box) => {
      document.getElementById(`L${box}`).checked = true;
    });
  }

  if (patient.RNeckStructureRemoved) {
    const RNeckStructureRemovedArray = patient.RNeckStructureRemoved.split(",");
    RNeckStructureRemovedArray.forEach((box) => {
      document.getElementById(`R${box}`).checked = true;
    });
  }

  if (patient.LNeckStructureRemoved) {
    const LNeckStructureRemovedArray = patient.LNeckStructureRemoved.split(",");
    LNeckStructureRemovedArray.forEach((box) => {
      document.getElementById(`L${box}`).checked = true;
    });
  }

  if (patient.RInvolvedNodes) {
    const RInvolvedNodesArray = patient.RInvolvedNodes.split(",");
    RInvolvedNodesArray.forEach((box) => {
      document.getElementById(`RHP${box}`).checked = true;
    });
  }

  if (patient.LInvolvedNodes) {
    const LInvolvedNodesArray = patient.LInvolvedNodes.split(",");
    LInvolvedNodesArray.forEach((box) => {
      document.getElementById(`LHP${box}`).checked = true;
    });
  }


  //Expanding inputs and enabling btns
  FirstVisitEnabler();
  RxEnabler();

  const bsCollapseInvAccordion = new bootstrap.Collapse(
    document.getElementById("flush-collapseOne"),
    {
      toggle: false,
    }
  );
  bsCollapseInvAccordion.show();

  const bsCollapseNotesAccordion = new bootstrap.Collapse(
    document.getElementById("flush-collapseTwo"),
    {
      toggle: false,
    }
  );
  bsCollapseNotesAccordion.show();

  document.getElementById("PrimaryTumourDetailsBtn").disabled = false;
  document.getElementById("NeckDetailsBtn").disabled = false;

  PrimaryEnablerNoReset();
  NeckEnablerNoReset();
  NodeHPEnabler("R");
  NodeHPEnabler("L");

  // Resizing the textareas
  const Textareas = document
    .getElementById("primaryInfo")
    .querySelectorAll("textarea");
  Textareas.forEach(
    (textarea) => (textarea.style.height = textarea.scrollHeight + 3 + "px")
  );

  //////Generating AJCC TNM Info ////////////
  AJCCTstage();
  AJCCNstage();

  ///////////Re-generating Summary//////////
  genSummary();

  ///////////Collapsing the MyPatients//////
  const bsCollapsePatientList = new bootstrap.Collapse(PatientList, {
    toggle: false,
  });
  bsCollapsePatientList.hide();
}

/////////////////// Form Reset Fn ///////////////////////////
function FormReset() {
  const form = document.getElementById("primaryInfo");
  form.reset();
  form.classList.remove("was-validated");
  const InvTable = document.getElementById("InvTable");
  InvTable.innerHTML = "";

  // Reset the Summary
  const NotEnoughInfoDiv = $("#not-enough-info");
  const primaryInfoSummaryDiv = $("#primaryInfoSummaryDiv");
  const FVSummaryDiv = $("#FVSummaryDiv");
  const HOPISummaryDiv = $("#HOPISummaryDiv");
  const InvSummaryDiv = $("#InvSummaryDiv");
  const TreatmentSummaryDiv = $("#TreatmentSummaryDiv");
  const HistopathSummaryDiv = $("#HistopathSummaryDiv");
  const SubsequentSummaryDiv = $("#SubsequentSummaryDiv");
  const SignSummaryDiv = $("#SignSummaryDiv");
  primaryInfoSummaryDiv.html("");
  FVSummaryDiv.html("");
  HOPISummaryDiv.html("");
  InvSummaryDiv.html("");
  TreatmentSummaryDiv.html("");
  HistopathSummaryDiv.html("");
  SubsequentSummaryDiv.html("");
  SignSummaryDiv.html("");

  //Collapsing and hiding
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("PIExpanded"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("FVExpanded"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("RxExpanded"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("flush-collapseOne"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("flush-collapseTwo"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("PrimaryTumourDetails"),
    { toggle: false }
  ).hide();
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("NeckDetails"),
    { toggle: false }
  ).hide();

  const HistopathRow = document.getElementById("HistopathRow");
  const PrimaryHP = document.getElementById("PrimaryHP");
  const RNeckHP = document.getElementById("RNeckHP");
  const LNeckHP = document.getElementById("LNeckHP");
  HistopathRow.hidden = true;
  PrimaryHP.hidden = true;
  RNeckHP.hidden = true;
  LNeckHP.hidden = true;

  $("#SummaryDiv").hide("fast");

  console.log("Form has been reset!");
}

function RefreshSpyScroll() {
  const SpyScrollEl = document.querySelector('[data-bs-spy="scroll"]');
  bootstrap.ScrollSpy.getInstance(SpyScrollEl).refresh();
}

function GetSign() {
  const UserSign = document.getElementById("UserSign").value.trim();
  const ChangeSign = document.getElementById("ChangeSign");

  bootstrap.Modal.getOrCreateInstance("#ChangeSignModal").show();

  if (ChangeSign.value) {
    return;
  } else if (UserSign && UserSign != "undefined") {
    ChangeSign.value = UserSign;
  }
}

///////////////////////Summary Dowlading Saving and Printing Functions////////////////////////
function SaveAsDocx() {
  const patientName = document.getElementById("patientName").value;
  var summary = document.getElementById("SummaryContent").innerHTML;
  var converted = htmlDocx.asBlob(summary, { orientation: "portrait" });
  saveAs(converted, `${patientName}.docx`);
}

//Copied frm ChatGPT 3.5o
function printSummary() {
  // Get the HTML content of the div
  const summary = document.getElementById("SummaryContent").innerHTML;

  // Create a new window for printing
  const printWindow = window.open("", "", "height=1754px,width=1240px");

  // Add HTML and CSS styling for the print window
  printWindow.document.write(
    `<html>
      <head>
       <title>Case Summary</title>
       <style>body { font-size: 14px; font-family: "Times New Roman", Times, serif; padding: 100 50 0 50}</style>
      </head>
      <body onclick='printpage()'>
        ${summary}
      </body>
      <script type="text/javascript" language="javascript">
        function printpage() {
            window.print();
            window.focus();
        }
      </script>
      </html>`);
}


////////////////////////// Install Prompt ///////////////////////////////////////////////////////
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Save the event so it can be triggered later
  deferredPrompt = event;
});

function InstallApp(){
  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
}

// Optional: Add other logic to check if the app is already installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
});

