const patientName = $("#patientName").val();
const age = $("#age").val();
const gender = $("#gender").val();
const FirstVisitDate = $("#FirstVisitDate").val();
const HospitalName = $("#HospitalName").val();
const IPDNo = $("#IPDNo").val();
const Complaints = $("#Complaints").val();
const OnExam = $("#OnExam").val();
const MedicalHistory = $("#MedicalHistory").val();
const HOPI = $("#HOPI").val();
const InvTableRows = document.getElementById("InvTable").querySelectorAll("tr");

const RxType = $("#RxType").val();
const RxDate = $("#RxDate").val();
const RxPlace = $("#RxPlace").val();
const SxType = $("#SxType").val();
const SxSite = SxSiteTagify;
const SxSide = SxSideTagify;
const Incisions = IncisionsTagify;
const AdditionalSitesMucosal = AddlMucosalTagify;
const AdditionalSitesMandible = AddlMandibleTagify;
const AdditionalSitesMaxilla = AddlMaxillaTagify;
const AdditionalSitesDeeper = AddlDeeperTagify;
const AdditionalSitesSkin = AddlSkinTagify;
const AdditionalPro = AddlProTagify;
const NeckType = $("#NeckType").val();
const RNeckExtent = RNeckExtentTagify;
const LNeckExtent = LNeckExtentTagify;
const ReconType = ReconTypeTaify;

const RNeckLNRemovedStr = Array.from(
  document.getElementById("RNeckLNBoxes").querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");
const RNeckStructureRemovedStr = Array.from(
  document
    .getElementById("RNeckStructureBoxes")
    .querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");
const LNeckLNRemovedStr = Array.from(
  document.getElementById("LNeckLNBoxes").querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");

const LNeckStructureRemovedStr = Array.from(
  document
    .getElementById("LNeckStructureBoxes")
    .querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");

const IntraopNotes = $("#IntraopNotes").val();
const PostopNotes = $("#PostopNotes").val();
const DischargeDate = $("#DischargeDate").val();

const Histology = $("#Histology").val();
const TsizeDOI = $("#TsizeDOI").val();
const TsizeAP = $("#TsizeAP").val();
const TsizeTrans = $("#TsizeTrans").val();
const TsizeVert = $("#TsizeVert").val();
const ClosestMargin = $("#ClosestMargin").val();
const MarginDistance = $("#MarginDistance").val();
const PNI = $("#PNI").val();
const LVI = $("#LVI").val();
const WPOI = $("#WPOI").val();
const BoneInv = $("#BoneInv").val();
const SkinInv = $("#SkinInv").val();
const MuscleInv = $("#MuscleInv").val();

const RNodalYeild = $("#RNodalYeild").val();
const RPositNodes = $("#RPositNodes").val();
const RInvolvedNodes = Array.from(
  document.getElementById("RInvolvedNodes").querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");
const RNodeSize = $("#RNodeSize").val();
const RMetSize = $("#RMetSize").val();
const RECS = $("#RECS").val();
const RECSDistance = $("#RECSDistance").val();
const LNodalYeild = $("#LNodalYeild").val();
const LPositNodes = $("#LPositNodes").val();
const LInvolvedNodes = Array.from(
  document.getElementById("LInvolvedNodes").querySelectorAll("input:checked")
)
  .map((input) => input.value)
  .join(",");
const LNodeSize = $("#LNodeSize").val();
const LMetSize = $("#LMetSize").val();
const LECS = $("#LECS").val();
const LECSDistance = $("#LECSDistance").val();

const Tstage = $("#Tstage").val();
const Nstage = $("#Nstage").val();

const Subsequent = $("#Subsequent").val();

/////////////////////////// Content Enabler Function //////////////////////
function ContentEnabler(inputId, contentdivID, btnId) {
  const checkInput = document.getElementById(inputId).value;
  const Btn = document.getElementById(btnId);
  const ContentDiv = document.getElementById(contentdivID);
  const bsCollapse = new bootstrap.Collapse(ContentDiv, {
    toggle: false,
  });

  if (checkInput) {
    if (Btn) {
      Btn.disabled = false;
    }

    AllInputs = ContentDiv.querySelectorAll("input");
    AllSelects = ContentDiv.querySelectorAll("select");
    AllTextareas = ContentDiv.querySelectorAll("textarea");

    if (AllInputs[0]) {
      AllInputs.forEach((input) => (input.disabled = false));
    }

    if (AllTextareas[0]) {
      AllTextareas.forEach((textarea) => (textarea.disabled = false));
    }

    if (AllSelects[0]) {
      AllSelects.forEach((select) => (select.disabled = false));
    }

    bsCollapse.show();
  } else {
    if (Btn) {
      Btn.disabled = true;
    }
    bsCollapse.hide();

    if (AllInputs[0]) {
      AllInputs.forEach((input) => (input.disabled = true));
    }

    if (AllTextareas[0]) {
      AllTextareas.forEach((textarea) => (textarea.disabled = true));
    }

    if (AllSelects[0]) {
      AllSelects.forEach((select) => (select.disabled = true));
    }
  }
}

///////////////////////////// Primary Enabler Function ///////////////////
function PrimaryEnabler() {
  const SxType = document.getElementById("SxType").value;
  const NeckType = document.getElementById("NeckType").value;
  const PrimaryTumourDetails = document.getElementById("PrimaryTumourDetails");
  const SameNeckDetails = document.getElementById("SameNeckDetails");
  const OppositeNeckDetails = document.getElementById("OppositeNeckDetails");

  const HistopathRow = document.getElementById("HistopathRow");
  const PrimaryHP = document.getElementById("PrimaryHP");
  const RNeckHP = document.getElementById("RNeckHP");
  const LNeckHP = document.getElementById("LNeckHP");
  const TNM = document.getElementById("TNM");

  const bsCollapsePrimary = new bootstrap.Collapse(PrimaryTumourDetails, {
    toggle: false,
  });
  const bsCollapseSameNeck = new bootstrap.Collapse(SameNeckDetails, {
    toggle: false,
  });
  const bsCollapseOppositeNeck = new bootstrap.Collapse(OppositeNeckDetails, {
    toggle: false,
  });

  const bsCollapseHistopathRow = new bootstrap.Collapse(HistopathRow, {
    toggle: false,
  });
  const bsCollapseTNM = new bootstrap.Collapse(TNM, {
    toggle: false,
  });
  const bsCollapsePrimaryHP = new bootstrap.Collapse(PrimaryHP, {
    toggle: false,
  });
  const bsCollapseHPRNeck = new bootstrap.Collapse(RNeckHP, {
    toggle: false,
  });
  const bsCollapseHPLNeck = new bootstrap.Collapse(LNeckHP, {
    toggle: false,
  });

  if (!SxType && !NeckType) {
    bsCollapsePrimary.hide();
    bsCollapseSameNeck.hide();
    bsCollapseOppositeNeck.hide();
    bsCollapsePrimaryHP.hide();
    bsCollapseHPRNeck.hide();
    bsCollapseHPLNeck.hide();
    bsCollapseTNM.hide();
    bsCollapseHistopathRow.hide();
  }

  if (SxType) {
    bsCollapsePrimary.show();
    bsCollapsePrimaryHP.show();
    bsCollapseTNM.show();
    bsCollapseHistopathRow.show();
  }

  if (!SxType) {
    bsCollapsePrimary.hide();
    bsCollapsePrimaryHP.hide();
  }

  if (NeckType === "Ipsilateral") {
    bsCollapseSameNeck.show();
    bsCollapseOppositeNeck.hide();
    bsCollapseHPRNeck.show();
    bsCollapseHPLNeck.hide();
    bsCollapseTNM.show();
    bsCollapseHistopathRow.show();
  }

  if (NeckType === "Contralateral") {
    bsCollapseSameNeck.hide();
    bsCollapseOppositeNeck.show();
    bsCollapseHPRNeck.hide();
    bsCollapseHPLNeck.show();
    bsCollapseTNM.show();
    bsCollapseHistopathRow.show();
  }

  if (NeckType === "Bilateral") {
    bsCollapseSameNeck.show();
    bsCollapseOppositeNeck.show();
    bsCollapseHPRNeck.show();
    bsCollapseHPLNeck.show();
    bsCollapseTNM.show();
    bsCollapseHistopathRow.show();
  }

  if (!NeckType) {
    bsCollapseSameNeck.hide();
    bsCollapseOppositeNeck.hide();
    bsCollapseHPRNeck.hide();
    bsCollapseHPLNeck.hide();
  }
}

//////////////// Old Logout Function //////////////////////
function Logout() {
  // 1. Removing the id in a hidden input
  const UserIDDiv = (document.getElementById("UserID").value = "");

  //  2. Changing WelcomeUser title
  const offcanvasTitle = (document.getElementById(
    "offcanvasTitle"
  ).innerText = `Welcome Guest User`);

  // 3. Changing loginlogout div to login
  const loginlogout = document.getElementById("loginlogout");
  const LoginForm = document.createElement("form");
  LoginForm.id = "LoginForm";
  LoginForm.innerHTML = `                <!--  Mobile No. Input-->
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label for="LoginMobileNo"><b>Mobile No: </b></label>
                  <input
                    type="text"
                    class="form-control"
                    id="LoginMobileNo"
                    placeholder="Please enter your 10-digit Mobile No."
                    required
                  />
                </div>
              </div>

              <!-- Login Btn  -->
              <div class="d-grid col-10 mx-auto">
                <button
                  type="button"
                  id="LoginUserBtn"
                  class="btn btn-primary"
                  onclick="Login()"
                >
                  Login
                </button>
              </div>

              <!--  Please login text -->
              <div class="col-12">
                <div class="form-text" style="font-size: small">
                  <i>Please Login to retrieve your patent list</i>
                </div>
              </div>

              <!-- Register Link -->
              <div class="col-sm-12">
                <div class="form-text text-end">
                  New User?
                  <button
                    type="button"
                    class="btn btn-sm btn-link p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#RegisterModal"
                  >
                    Register
                  </button>
                </div>
              </div>`;
  // 6. Reset the MyPatient List
  const PatientNameList = (document.getElementById(
    "PatientNameList"
  ).innerHTML = "");

  //7. Reset the form
  const primaryInfo = document.getElementById("primaryInfo");
  primaryInfo.reset();
}
