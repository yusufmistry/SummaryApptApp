////////////////////////// Lazy Load Background Videos & Init Tooltips ///////////////////
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
};

////////////////////////// Date Select Func ///////////////////
function ApptDateSelect() {
  const AddPlaceRow = document.getElementById("AddPlaceRow");
  const PlaceName = document.getElementById("PlaceName");

  PlaceName.disabled = false;
  bsAddPlaceRowCollapse =
    bootstrap.Collapse.getOrCreateInstance(AddPlaceRow).show();
}

////////////////////////// Add Place Function //////////////////
let NoofPlaces = 0;
function AddPlace() {
  const PlaceName = document.getElementById("PlaceName");
  const PlaceRow = document.getElementById("PlaceRow");

  if (!PlaceName.value) {
    window.alert("Please Enter Place!");
    return;
  }

  NoofPlaces++;

  const newtopRow = document.createElement("div");
  newtopRow.className = "row gx-1 gy-2 border-bottom mb-3";
  newtopRow.innerHTML = `
<div class="col-12">
  <h5 id="TitlePlace${NoofPlaces}">
    <u>${PlaceName.value}</u>
    <button
      type="button"
      class="btn btn-danger btn-sm rounded-5"
      onclick="confirm('Delete This Place?') ? this.parentElement.parentElement.parentElement.remove() : false"
      style="float: right"
    >
      X
    </button>
  </h5>
</div>

<!-- R2 -Sr2 - Patient Table Row -->
<div class="col-12" style="overflow: auto">
  <table
    class="table table-hover table-sm table-bordered"
    style="width: 674px; table-layout: fixed; font-size: 0.9rem"
  >
    <thead class="text-center">
      <tr>
        <th scope="col" width="0%" hidden></th>
        <th scope="col" width="20%">Name</th>
        <th scope="col" width="15%">Appt Type</th>
        <th scope="col" width="30%">Details</th>
        <th scope="col" width="20%">Advice</th>
        <th scope="col" width="10%">Fees</th>
        <th scope="col" width="10%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-chat-quote"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
            />
            <path
              d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"
            />
          </svg>
        </th>
        <th scope="col" width="15%"></th>
      </tr>
    </thead>
    <tbody id="TableBody${NoofPlaces}"></tbody>
  </table>
</div>
   `;
  PlaceRow.appendChild(newtopRow);

  const TableBody = document.getElementById(`TableBody${NoofPlaces}`);

  (function createInputRow() {
    const InputRow = document.createElement("tr");

    // 0. Patient ID Cell
    const InputIDCell = document.createElement("td");
    InputIDCell.hidden = true;
    const InputID = document.createElement("input");
    InputID.id = `ID${NoofPlaces}`;
    InputIDCell.appendChild(InputID);

    // 1. Patient Name Cell
    const SelectNameCell = document.createElement("td");
    const SelectName = document.createElement("select");
    SelectName.id = `Name${NoofPlaces}`;
    SelectName.className = "form-control d-flex";
    SelectName.style.fontSize = "0.8rem";
    SelectName.setAttribute("onchange", "InputID(this)");
    SelectName.setAttribute("onfocus", "PopulatePatientList(this)");
    SelectNameCell.appendChild(SelectName);

    // 2. Appt Type Cell
    const ApptTypeCell = document.createElement("td");
    const ApptType = document.createElement("input");
    ApptType.id = `ApptType${NoofPlaces}`;
    ApptType.className = "form-control d-flex";
    ApptType.style.fontSize = "0.8rem";
    ApptType.setAttribute("onfocus", "PopulateApptTypeSelect(this)");
    ApptTypeCell.appendChild(ApptType);

    // 3. Details Cell
    const DetailsCell = document.createElement("td");
    const Details = document.createElement("textarea");
    Details.id = `Details${NoofPlaces}`;
    Details.className = "form-control d-flex";
    Details.placeholder = "Details";
    Details.style.fontSize = "0.8rem";
    Details.style.height = "35px";
    Details.setAttribute(
      "oninput",
      'this.style.height = "35px";this.style.height = this.scrollHeight + 3 + "px"'
    );

    DetailsCell.appendChild(Details);

    // 4. Advice Cell
    const AdviceCell = document.createElement("td");
    const Advice = document.createElement("textarea");
    Advice.id = `Advice${NoofPlaces}`;
    Advice.className = "form-control d-flex";
    Advice.placeholder = "Advice";
    Advice.style.fontSize = "0.8rem";
    Advice.style.height = "35px";
    Advice.setAttribute(
      "oninput",
      'this.style.height = "35px";this.style.height = this.scrollHeight + 3 + "px"'
    );
    AdviceCell.appendChild(Advice);

    // 5. Fees Cell
    const FeesCell = document.createElement("td");
    const Fees = document.createElement("input");
    Fees.id = `Fees${NoofPlaces}`;
    Fees.className = "form-control d-flex";
    Fees.type = "text";
    Fees.list = "FeesList";
    Fees.style.fontSize = "0.8rem";
    FeesCell.appendChild(Fees);

    // 6. Payment Type Cell
    const PTCell = document.createElement("td");
    const PT = document.createElement("input");
    PT.id = `PT${NoofPlaces}`;
    PT.className = "form-control d-flex";
    PT.type = "text";
    PT.list = "PTList";
    PT.style.fontSize = "0.8rem";
    PTCell.appendChild(PT);

    // 6. Buttons Cell
    const BtnCell = document.createElement("td");
    BtnCell.className =
      "d-flex col-12 justify-content-center align-items-center";
    const Btn = document.createElement("button");
    Btn.type = "button";
    Btn.className = "btn btn-success btn-sm rounded-5";
    Btn.id = `Btn${NoofPlaces}`;
    Btn.textContent = "Add";
    Btn.setAttribute("onclick", "AddAppt(this)");
    BtnCell.appendChild(Btn);

    InputRow.appendChild(InputIDCell);
    InputRow.appendChild(SelectNameCell);
    InputRow.appendChild(ApptTypeCell);
    InputRow.appendChild(DetailsCell);
    InputRow.appendChild(AdviceCell);
    InputRow.appendChild(FeesCell);
    InputRow.appendChild(PTCell);
    InputRow.appendChild(BtnCell);
    TableBody.appendChild(InputRow);

    // ApptType.addEventListener("focus", PopulateApptTypeSelect);
    // SelectName.addEventListener("focus", PopulatePatientList);
  })();

  PlaceRow.hidden = false;
  bootstrap.Collapse.getOrCreateInstance(PlaceRow).show;
  PlaceName.value = "";
}

//////////////////////// Add Appt Function ///////////////////
function AddAppt(e) {
  const button = e;
  const InputRow = button.closest("tr");

  // Initially I used querySelectorAll but since I need individual values for the edit and CRUD fns I have got each input sepearately

  const IDInput = InputRow.cells[0].querySelector("input");
  const NameInput = InputRow.cells[1].querySelector("select");
  const ApptTypeInput = InputRow.cells[2].querySelector("input");
  const DetailsInput = InputRow.cells[3].querySelector("textarea");
  const AdviceInput = InputRow.cells[4].querySelector("textarea");
  const FeesInput = InputRow.cells[5].querySelector("input");
  const PTInput = InputRow.cells[6].querySelector("input");

  // console.log(IDInput, NameInput, ApptTypeInput, DetailsInput, AdviceInput, FeesInput, PTInput )

  const ID = IDInput.value ? IDInput.value : "";
  const Name = NameInput.options[NameInput.selectedIndex]
    ? NameInput.options[NameInput.selectedIndex].text
    : "";
  const ApptType = ApptTypeInput.value ? ApptTypeInput.value : "";
  const Details = DetailsInput.value ? DetailsInput.value : "";
  const Advice = AdviceInput.value ? AdviceInput.value : "";
  const Fees = FeesInput.value ? FeesInput.value : "";
  const PT = PTInput.value ? PTInput.value : "";

  // console.log(ID, Name, ApptType, Details, Advice, Fees, PT);

  if (!ID || !ApptType || !Details) {
    FailedToastMsg = document.getElementById("FailedToastMsg").innerHTML =
      "The following essential details are missing: <b>" +
      (ID ? "" : "Name, ") +
      (ApptType ? "" : "Appointment Type, ") +
      (Details ? "" : "Details");

    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("SavedFailToast")
    ).show();
  } else {
    // Creating the row and inserting all values inside it
    const tableBody = button.closest("tbody");
    const PatientRow = document.createElement("tr");
    const AllinputArray = [ID, Name, ApptType, Details, Advice, Fees, PT];
    AllinputArray.forEach((input) => {
      const cell = document.createElement("td");
      cell.textContent = input;
      PatientRow.appendChild(cell);
    });
    // hiding the ID Cell
    PatientRow.cells[0].hidden = true;

    // Creating the Edit Delete Button Cell
    const ButtonCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "✎";
    editButton.className = "btn btn-warning btn-sm me-1";
    editButton.onclick = () => {
      // console.log(PatientRow.cells)
      IDInput.value = PatientRow.cells[0].innerText;
      NameInput.value = PatientRow.cells[0].innerText; //Since option and value are different
      ApptTypeInput.value = PatientRow.cells[2].innerText;
      DetailsInput.value = PatientRow.cells[3].innerText;
      AdviceInput.value = PatientRow.cells[4].innerText;
      FeesInput.value = PatientRow.cells[5].innerText;
      PTInput.value = PatientRow.cells[6].innerText;
      tableBody.removeChild(PatientRow);
    };

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "X";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = () =>
      confirm("Delete Patient?") ? tableBody.removeChild(PatientRow) : false;

    ButtonCell.appendChild(editButton);
    ButtonCell.appendChild(deleteButton);
    PatientRow.appendChild(ButtonCell);

    tableBody.insertBefore(
      PatientRow,
      tableBody.rows[tableBody.rows.length - 1]
    );

    // Reset the form
    IDInput.value = "";
    NameInput.value = "";
    ApptTypeInput.value = "";
    DetailsInput.value = "";
    DetailsInput.style.height = "35px";
    AdviceInput.value = "";
    AdviceInput.style.height = "35px";
    FeesInput.value = "";
    PTInput.value = "";
  }
}

/////////////////// Form Reset Fn ///////////////////////////
function FormReset() {
  const form = document.getElementById("ApptForm");
  form.reset();
  const PlaceRow = document.getElementById("PlaceRow");
  PlaceRow.innerHTML = "";
  PlaceRow.hidden = false;
  console.log("Form has been reset!");
}

/////////////////////InputID value onchange Fn /////////////
function InputID(e) {
  const SelectName = e;
  const PlaceNo = SelectName.id.slice(-1);
  const PatientIDInput = document.getElementById(`ID${PlaceNo}`);
  PatientIDInput.value = SelectName.value;
}


////////////////////// Edit Modal Update Appointments //////////////////
function EditModalAppt (e) {
  
  const EditApptModal = document.getElementById("EditApptModal")
  const InputRow = e.target.closest("tr")
  const DataCells = InputRow.querySelectorAll("td")

  // Patient Name and Date Display
  const PatientNameSpan = document.getElementById("PatientNameEdit")
  PatientNameSpan.innerText = DataCells[2].innerText
  const ApptDateSpan = document.getElementById("ApptDateEdit")
  ApptDateSpan.innerText = DataCells[1].innerText


  // 1. Appt ID
  const ApptIdInput = document.getElementById("ApptIDEdit")
  ApptIdInput.value = DataCells[0].innerText

  // 2. Place Name
  const PlaceInput = document.getElementById("PlaceEdit")
  PlaceInput.value = DataCells[3].innerText

  // 3. Appt Type
  const ApptTypeInput = document.getElementById("ApptTypeEdit")
  ApptTypeInput.value = DataCells[4].innerText

  // 4. Details
  const DetailsInput = document.getElementById("DetailsEdit")
  DetailsInput.value = DataCells[5].innerText

  // 5. Advice
  const AdviceInput = document.getElementById("AdviceEdit")
  AdviceInput.value = DataCells[6].innerText

  // 6. Fees
  const FeesInput = document.getElementById("FeesEdit")
  FeesInput.value = DataCells[7].innerText

  // 7. Comment
  const CommentInput = document.getElementById("CommentEdit")
  CommentInput.value = DataCells[8].innerText
  

  // Modal show
  const bsEditApptModal = new bootstrap.Modal('#EditApptModal', {
    keyboard: true
  })
  bsEditApptModal.show()
}


