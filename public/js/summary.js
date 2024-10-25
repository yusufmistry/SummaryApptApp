///////////////// Generate Summary Function ////////////////////////////////
function genSummary() {
  // Generating const list
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

  /* Since it is not possible to dynamically assign const names in JS, we:
  1. Create an Object with key:value pairs where each key = input.id and value = input.value (using forEach).
  2. We also create a string where each id is sepearted by a comma (using map().join(','))
  3. Now we output the string (List of ID's) in the console
  4. Copy paste this string in the Destructing Object {} manually. This creates a list of const whose names are ids and values are input values
  */
  //Create an object
  const UserInputsObj = {};

  // Push all key:value pairs into the object
  AllUserInputsList.forEach(
    (userinput) => (UserInputsObj[userinput.id] = userinput.value)
  );

  //Create a string of list of id's sperated by a ","
  // const ListofIDs = AllUserInputsList.map((el) => el.id).join(",");

  // Log the list in console so that it can be copy pasted. (Only done if there are changes to the form inputs)(Comment out later)
  // console.log(ListofIDs);

  // Destructing the object by the copied list to get the required const's
  const {
    patientName,
    age,
    ContactNumber,
    EmailID,
    AddLine1,
    AddLine2,
    Country,
    State,
    City,
    Pincode,
    RelativeName,
    Relation,
    RelativeNumber,
    Referredby,
    AnyOtherInfo,
    FirstVisitDate,
    HospitalName,
    IPDNo,
    InvDate,
    InvType,
    InvSite,
    RxDate,
    RxPlace,
    RIA,
    RIB,
    RIIA,
    RIIB,
    RIII,
    RIV,
    RVA,
    RVB,
    RSCM,
    RSAN,
    RIJV,
    RSG,
    RSkin,
    RHGN,
    LIA,
    LIB,
    LIIA,
    LIIB,
    LIII,
    LIV,
    LVA,
    LVB,
    LSCM,
    LSAN,
    LIJV,
    LSG,
    LSkin,
    LParotid,
    LHGN,
    DischargeDate,
    TsizeDOI,
    TsizeAP,
    TsizeTrans,
    TsizeVert,
    ClosestMargin,
    MarginDistance,
    RNodalYeild,
    RPositNodes,
    RHP1a,
    RHP1b,
    RHP2a,
    RHP2b,
    RHP3,
    RHP4,
    RHP5,
    RNodeSize,
    RMetSize,
    RECSDistance,
    LNodalYeild,
    LPositNodes,
    LHP1a,
    LHP1b,
    LHP2a,
    LHP2b,
    LHP3,
    LHP4,
    LHP5,
    LNodeSize,
    LMetSize,
    LECSDistance,
    Tstage,
    Nstage,
    gender,
    RxType,
    SxType,
    NeckType,
    Histology,
    PNI,
    LVI,
    WPOI,
    BoneInv,
    SkinInv,
    MuscleInv,
    AddlCommentPrimHP,
    RECS,
    LECS,
    AddlCommentRNeckHP,
    AddlCommentLNeckHP,
    Complaints,
    OnExam,
    MedicalHistory,
    HOPI,
    InvFindings,
    IntraopNotes,
    PostopNotes,
    RecoveryNotes,
    Subsequent,
    LastUpdated,
    TNMStage,
  } = UserInputsObj;

  // Other non-traditional user inputs
  // Investigations
  const InvTableRows = document
    .getElementById("InvTable")
    .querySelectorAll("tr");

  //Tagifys
  const SxSite = SxSiteTagify;
  const SxSide = SxSideTagify;
  const Incisions = IncisionsTagify;
  const AdditionalSitesMucosal = AddlMucosalTagify;
  const AdditionalSitesMandible = AddlMandibleTagify;
  const AdditionalSitesMaxilla = AddlMaxillaTagify;
  const AdditionalSitesDeeper = AddlDeeperTagify;
  const AdditionalSitesSkin = AddlSkinTagify;
  const AdditionalPro = AddlProTagify;
  const RNeckExtent = RNeckExtentTagify;
  const LNeckExtent = LNeckExtentTagify;
  const ReconType = ReconTypeTagify;

  //Neck Checkboxes
  const RNeckLNRemovedStr = $("#RNeckLNBoxes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");
  const RNeckStructureRemovedStr = $("#RNeckStructureBoxes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");
  const LNeckLNRemovedStr = $("#LNeckLNBoxes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");
  const LNeckStructureRemovedStr = $("#LNeckStructureBoxes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");

  //NeckHPCheckBoxes
  const RInvolvedNodes = $("#RInvolvedNodes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");
  const LInvolvedNodes = $("#LInvolvedNodes input:checked")
    .get()
    .map((el) => el.value)
    .join(", ");

  //Summary Divs
  const NotEnoughInfoDiv = $("#not-enough-info");
  const TodaysDateDiv = $("#TodaysDateDiv");
  const primaryInfoSummaryDiv = $("#primaryInfoSummaryDiv");
  const FVSummaryDiv = $("#FVSummaryDiv");
  const HOPISummaryDiv = $("#HOPISummaryDiv");
  const InvSummaryDiv = $("#InvSummaryDiv");
  const TreatmentSummaryDiv = $("#TreatmentSummaryDiv");
  const HistopathSummaryDiv = $("#HistopathSummaryDiv");
  const SubsequentSummaryDiv = $("#SubsequentSummaryDiv");
  const SignSummaryDiv = $("#SignSummaryDiv");

  //Date to String format.
  function ToDateString(inputdt) {
    const date = new Date(inputdt);
    const FormattedDate =
      date.getDate() +
      "<sup>" +
      getOrdinalSuffix(date.getDate()) +
      "</sup> " +
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear();

    return FormattedDate;
  }

  // Helper function to get the ordinal suffix (st, nd, rd, th)
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th"; // Covers 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Reset the form everytime genSummary is run
  primaryInfoSummaryDiv.html("");
  FVSummaryDiv.html("");
  HOPISummaryDiv.html("");
  InvSummaryDiv.html("");
  TreatmentSummaryDiv.html("");
  HistopathSummaryDiv.html("");
  SubsequentSummaryDiv.html("");
  SignSummaryDiv.html("");

  //Gender Words
  let Mr = "Mr.",
    He = "He",
    he = "he",
    His = "His",
    his = "his",
    him = "him";

  if (gender === "Female") {
    Mr = "Mrs.";
    He = "She";
    he = "she";
    His = "Her";
    his = "her";
    him = "her";
  }

  // Check Major Inputs
  if (
    !patientName ||
    !age ||
    !gender ||
    !FirstVisitDate ||
    !Complaints ||
    !OnExam ||
    !RxDate
  ) {
    NotEnoughInfoDiv.show();
    NotEnoughInfoSumToastMsg = document.getElementById(
      "NotEnoughInfoSumToastMsg"
    ).innerHTML =
      "Some essential info is Missing:<b>" +
      (!patientName ? " Pateint Name," : "") +
      (!age ? " Age," : "") +
      (!gender ? " Gender," : "") +
      (!FirstVisitDate ? " First Visit Date," : "") +
      (!Complaints ? " Chief Complaint," : "") +
      (!OnExam ? " Examination Details," : "") +
      (!RxDate ? " Treatment Date," : "") +
      " is required! </b>";

    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("NotEnoughInfoSum")
    ).show();
  } else {
    NotEnoughInfoDiv.hide();

    //Todays Date Div
    const TodaysDate = new Date();
    TodaysDateDiv.html(`<b>Date: ${TodaysDate.toLocaleDateString()}</b>`);

    // Primary Info Div
    primaryInfoSummaryDiv.html(`
      <b>Patient Name: ${patientName} </b> <br>
      <b>Age: ${age}/${gender} </b> <br>
      <b>${HospitalName} IPD No.: ${IPDNo} </b>
      `);

    //FV Div
    FVSummaryDiv.html(`
      ${Mr} ${patientName}, was first seen by us on <b>${ToDateString(
      FirstVisitDate
    )}</b>. ${He} had complaint of ${Complaints}
      On examination, there was ${OnExam} `);
    if (MedicalHistory) {
      FVSummaryDiv.append(`${He} has ${MedicalHistory}`);
    }

    //HOPI Div

    if (HOPI) {
      HOPISummaryDiv.html(`
        Previously, ${he} has undergone <b>${HOPI}</b>
        `);
    }

    // Inv Div

    if (InvTableRows[0]) {
      InvTableRows.forEach((row) => {
        const prevInnerHTML = InvSummaryDiv[0].innerHTML;
        InvSummaryDiv[0].innerHTML =
          prevInnerHTML +
          `${His}` +
          " <b>" +
          row.cells[0].innerText +
          "</b><b>" +
          (row.cells[1].innerText ? " of " + row.cells[1].innerText : "") +
          "</b>" +
          (row.cells[2].innerText
            ? " on " + ToDateString(row.cells[2].innerText)
            : "") +
          " showed " +
          row.cells[3].innerText +
          " ";
      });
    } else {
      InvSummaryDiv[0].innerText = `${He} has not undergone any previous investigations`;
    }

    // Rx Div

    if (SxType) {
      TreatmentSummaryDiv[0].innerHTML =
        `${He} was advised ${RxType}. ${His} other work-up was essentially normal. <br><br>
      On ${ToDateString(RxDate)} ${he} underwent <b>` +
        (SxType === "Wide Excision"
          ? "Wide Excision "
          : "Composite Resection (Wide Excision of") +
        (SxSide.value[0] ? " " + SxSide.value[0].value : "") + //Side
        (SxSite.value[0] ? " " + SxSite.value[0].value : "") + //Prmary Site
        (AdditionalSitesMucosal.value[0]
          ? " + " +
            AdditionalSitesMucosal.value.map((obj) => obj.value).join(" + ")
          : "") + //AdditionalMucosal
        (AdditionalSitesMandible.value[0]
          ? " + " + AdditionalSitesMandible.value[0].value
          : "") + //AdditionalMandible
        (AdditionalSitesMaxilla.value[0]
          ? " + " + AdditionalSitesMaxilla.value[0].value
          : "") + //AdditionalMaxilla
        (AdditionalSitesDeeper.value[0]
          ? " + " +
            AdditionalSitesDeeper.value.map((obj) => obj.value).join(" + ")
          : "") + //AdditionalDeeper
        (AdditionalSitesSkin.value[0]
          ? " + " +
            AdditionalSitesSkin.value.map((obj) => obj.value).join(" + ")
          : "") + //AdditionalSkin
        (SxType === "Wide Excision" ? "" : ")") +
        (Incisions.value[0]
          ? " using " + Incisions.value[0].value + " incision"
          : "") + //Incision
        " + " +
        (NeckType === "Ipsilateral"
          ? (SxSide.value[0] ? " " + SxSide.value[0].value : "") +
            (RNeckExtent.value[0]
              ? " " +
                RNeckExtent.value[0].value +
                (RNeckLNRemovedStr
                  ? " (Lymph Nodes: " + RNeckLNRemovedStr + ")"
                  : "") +
                (RNeckStructureRemovedStr
                  ? " (Structures Removed: " + RNeckStructureRemovedStr + ")"
                  : "")
              : "")
          : "") +
        (NeckType === "Contralateral"
          ? LNeckExtent.value[0]
            ? " Contralateral " +
              LNeckExtent.value[0].value +
              (LNeckLNRemovedStr
                ? " (Lymph Nodes: " + LNeckLNRemovedStr + ")"
                : "") +
              (LNeckStructureRemovedStr
                ? " (Structures Removed: " + LNeckStructureRemovedStr + ")"
                : "")
            : ""
          : "") +
        (NeckType === "Bilateral" &&
        RNeckExtent.value[0].value === LNeckExtent.value[0].value
          ? "Bilateral " +
            (RNeckExtent.value[0].value +
              (RNeckLNRemovedStr
                ? " (R Lymph Nodes: " + RNeckLNRemovedStr + ")"
                : "") +
              (RNeckStructureRemovedStr
                ? " (R Structures Removed: " + RNeckStructureRemovedStr + ")"
                : "") +
              (LNeckLNRemovedStr
                ? " (L Lymph Nodes: " + LNeckLNRemovedStr + ")"
                : "") +
              (LNeckStructureRemovedStr
                ? " (L Structures Removed: " + LNeckStructureRemovedStr + ")"
                : ""))
          : "") +
        (NeckType === "Bilateral" &&
        RNeckExtent.value[0].value !== LNeckExtent.value[0].value
          ? (RNeckExtent.value[0]
              ? " Right " +
                RNeckExtent.value[0].value +
                (RNeckLNRemovedStr
                  ? " (Lymph Nodes: " + RNeckLNRemovedStr + ")"
                  : "") +
                (RNeckStructureRemovedStr
                  ? " (Structures Removed: " + RNeckStructureRemovedStr + ")"
                  : "")
              : "") +
            (LNeckExtent.value[0]
              ? " + Left " +
                LNeckExtent.value[0].value +
                (LNeckLNRemovedStr
                  ? " (Lymph Nodes: " + LNeckLNRemovedStr + ")"
                  : "") +
                (LNeckStructureRemovedStr
                  ? " (Structures Removed: " + LNeckStructureRemovedStr + ")"
                  : "")
              : "")
          : "") +
        (AdditionalPro.value[0]
          ? " + " + AdditionalPro.value.map((obj) => obj.value).join(" + ")
          : "") + //AdditionalPro
        ".</b> " +
        (ReconType.value[0]
          ? "Reconstruction was done using <b>" +
            ReconType.value.map((obj) => obj.value).join(" + ") +
            ".</b> "
          : "") +
        (IntraopNotes ? "Intra-operatively, " + IntraopNotes + ". " : "") +
        (PostopNotes
          ? "Post-operatively, " + PostopNotes
          : His + " post-operative phase was uneventful. ") +
        (DischargeDate
          ? He + " was discharged on " + ToDateString(DischargeDate) + ". "
          : "") +
        (RecoveryNotes ? "In the recovery phase, " + RecoveryNotes : "");
    } else if (!SxType && NeckType) {
      TreatmentSummaryDiv[0].innerHTML =
        `${He} was advised ${RxType}. ${His} other work-up was essentially normal. <br><br>
      On ${ToDateString(RxDate)} ${he} underwent <b>` +
        (NeckType === "Ipsilateral"
          ? (SxSide.value[0] ? " " + SxSide.value[0].value : "") +
            (RNeckExtent.value[0]
              ? " " +
                RNeckExtent.value[0].value +
                (RNeckLNRemovedStr
                  ? " (Lymph Nodes: " + RNeckLNRemovedStr + ")"
                  : "") +
                (RNeckStructureRemovedStr
                  ? " (Structures Removed: " + RNeckStructureRemovedStr + ")"
                  : "")
              : "")
          : "") +
        (NeckType === "Contralateral"
          ? LNeckExtent.value[0]
            ? " Contralateral " +
              LNeckExtent.value[0].value +
              (LNeckLNRemovedStr
                ? " (Lymph Nodes: " + LNeckLNRemovedStr + ")"
                : "") +
              (LNeckStructureRemovedStr
                ? " (Structures Removed: " + LNeckStructureRemovedStr + ")"
                : "")
            : ""
          : "") +
        (NeckType === "Bilateral" &&
        RNeckExtent.value[0].value === LNeckExtent.value[0].value
          ? "Bilateral " +
            (RNeckExtent.value[0].value +
              (RNeckLNRemovedStr
                ? " (R Lymph Nodes: " + RNeckLNRemovedStr + ")"
                : "") +
              (RNeckStructureRemovedStr
                ? " (R Structures Removed: " + RNeckStructureRemovedStr + ")"
                : "") +
              (LNeckLNRemovedStr
                ? " (L Lymph Nodes: " + LNeckLNRemovedStr + ")"
                : "") +
              (LNeckStructureRemovedStr
                ? " (L Structures Removed: " + LNeckStructureRemovedStr + ")"
                : ""))
          : "") +
        (NeckType === "Bilateral" &&
        RNeckExtent.value[0].value !== LNeckExtent.value[0].value
          ? (RNeckExtent.value[0]
              ? " Right " +
                RNeckExtent.value[0].value +
                (RNeckLNRemovedStr
                  ? " (Lymph Nodes: " + RNeckLNRemovedStr + ")"
                  : "") +
                (RNeckStructureRemovedStr
                  ? " (Structures Removed: " + RNeckStructureRemovedStr + ")"
                  : "")
              : "") +
            (LNeckExtent.value[0]
              ? " + Left " +
                LNeckExtent.value[0].value +
                (LNeckLNRemovedStr
                  ? " (Lymph Nodes: " + LNeckLNRemovedStr + ")"
                  : "") +
                (LNeckStructureRemovedStr
                  ? " (Structures Removed: " + LNeckStructureRemovedStr + ")"
                  : "")
              : "")
          : "") +
        ".</b> " +
        (IntraopNotes ? "Intra-operatively, " + IntraopNotes + " " : "") +
        (PostopNotes
          ? "In the post-operative phase " + PostopNotes + " "
          : His + " post-operative phase was uneventful. ") +
        (DischargeDate ? He + " was discharged on " + DischargeDate : "") +
        (RecoveryNotes ? "In the recovery phase, " + RecoveryNotes : "");
    } else {
      TreatmentSummaryDiv[0].innerHTML = "Patient was managed conservatively";
    }

    // Histopath Div
    if (Histology || RPositNodes || LPositNodes) {
      HistopathSummaryDiv[0].innerHTML =
        His +
        " final HPR showed " +
        (Histology ? "<b>" + Histology + "</b>" : "") +
        (SxSide.value[0]
          ? " of the <b>" + SxSide.value[0].value + "</b>"
          : "") +
        (SxSite.value[0] ? " <b>" + SxSite.value[0].value + "</b>. " : "") +
        (TsizeAP
          ? "[Size: <b>" +
            TsizeAP +
            (TsizeTrans ? "x" + TsizeTrans : "") +
            (TsizeVert ? "x" + TsizeVert : "") +
            "mm</b>]. "
          : "") +
        (TsizeDOI ? "[Depth of Invasion: <b>" + TsizeDOI + "mm</b>] " : "") +
        (PNI
          ? PNI === "Absent"
            ? "PNI was absent. "
            : "PNI was <b>" + PNI + ".</b> "
          : "") +
        (LVI
          ? LVI === "Absent"
            ? "LVI was absent. "
            : "LVI was <b>" + LVI + ".</b> "
          : "") +
        (WPOI ? "WPOI was <b>" + WPOI + "</b>. " : "") +
        (ClosestMargin
          ? "The closest margin was <b>" + ClosestMargin + "</b>"
          : "") +
        (MarginDistance ? " which was <b>" + MarginDistance + "mm</b>. " : "") +
        (BoneInv
          ? BoneInv === "Absent"
            ? "There was no bone invasion. "
            : "Bone invasion was <b>" + BoneInv + ".</b> "
          : "") +
        (MuscleInv
          ? MuscleInv === "Absent"
            ? "There was no muscle invasion. "
            : "Muscle invasion was <b>" + MuscleInv + ".</b> "
          : "") +
        (SkinInv
          ? SkinInv === "Absent"
            ? "There was no skin invasion. "
            : "Skin invasion was <b>" + SkinInv + ".</b> "
          : "") +
        (AddlCommentPrimHP ? AddlCommentPrimHP : "") +
        "<br>" +
        //Neck HP //
        (RPositNodes
          ? "<b>" +
            RPositNodes +
            (RNodalYeild ? "/" + RNodalYeild : "") +
            "</b> nodes were positive for metastasis in the<b>" +
            (NeckType === "Ipsilateral"
              ? " " + (SxSide.value[0] ? SxSide.value[0].value : "")
              : "") +
            (NeckType === "Bilateral" ? " Right" : "") +
            (RNeckExtent.value[0]
              ? " " + RNeckExtent.value[0].value + " </b>specimen. "
              : "") +
            (RInvolvedNodes
              ? " [Involved Level: <b>" + RInvolvedNodes + "</b>]. "
              : "") +
            (RNodeSize
              ? "[Size of largest node: <b>" + RNodeSize + "mm</b>]. "
              : "") +
            (RMetSize
              ? "[Size of metastasis: <b>" + RMetSize + "mm</b>]. "
              : "") +
            (RECS ? "[ECS: <b>" + RECS + "</b>]. " : "") +
            (RECSDistance
              ? "[Distance(ECS): <b>" + RECSDistance + "mm</b>]. "
              : "")
          : "") +
        (AddlCommentRNeckHP ? AddlCommentRNeckHP : "") +
        (LPositNodes
          ? "<b>" +
            LPositNodes +
            (LNodalYeild ? "/" + LNodalYeild : "") +
            "</b> nodes were positive for metastasis in the <b>" +
            (NeckType === "Contralateral"
              ? SxSide.value[0]
                ? SxSide.value[0].value === "Left"
                  ? "Right "
                  : "Left "
                : ""
              : "") +
            (NeckType === "Bilateral" ? " Left" : "") +
            (LNeckExtent.value[0]
              ? " " + LNeckExtent.value[0].value + "</b> specimen. "
              : "") +
            (LInvolvedNodes
              ? " [Involved Level: <b>" + LInvolvedNodes + "</b>]. "
              : "") +
            (LNodeSize
              ? "[Size of largest node: <b>" + LNodeSize + "mm</b>]. "
              : "") +
            (LMetSize
              ? "[Size of metastasis: <b>" + LMetSize + "mm</b>]. "
              : "") +
            (LECS ? "[ECS: <b>" + LECS + "</b>]. " : "") +
            (LECSDistance
              ? "[Distance(ECS): <b>" + LECSDistance + "mm</b>]. "
              : "")
          : "") +
        (AddlCommentRNeckHP ? AddlCommentRNeckHP : "") +
        (Tstage ? "<b>(pT" + Tstage + "N" + Nstage + ")</b>. " : "") +
        (TNMStage ? "<b>(Stage: " + TNMStage + ")</b>. " : "")

    } else {
      HistopathSummaryDiv[0].innerHTML = "";
    }

    // Subsequent Div
    SubsequentSummaryDiv[0].innerHTML =
      He +
      " is advised " +
      (Subsequent
        ? "<b>" + Subsequent + "</b>. " + He + " is also advised "
        : "") +
      "physiotherapy and regular follow up at this clinic." +
      `<br><br>We wish ${him} good health. Please do not hesitate to contact us for any further information.` +
      (LastUpdated
        ? `<br><br><b>Last Updated: ${ToDateString(LastUpdated)}</b>`
        : "");

    // Sign Div
    const UserSign = document.getElementById("UserSign").value.trim()
    const FormattedUserSign = UserSign ? UserSign.replace(/\n/g, '<br>') : false
    SignSummaryDiv[0].innerHTML = UserSign === "" || UserSign === "undefined" ? "<button type='button' class='btn btn-link' onclick='GetSign()'>Add Sign</button>" : "<b>" + FormattedUserSign + "</b>"
    

  }

  // Show the Summary Div
  $("#SummaryDiv").show("fast");
}

/* 

Patient Name: ${patientName}
Age: ${age}/${gender}
${HospitalName} IPD No.: ${IPDNo}

${Mr} ${patientName}, was first seen by us on ${FirstVisitDate}. ${He} had complaint of ${Complaints}

On examination, there was ${OnExam}. ${He} has ${MedicalHistory}

Previuosly, ${he} had undergone ${HOPI}

${His} ${InvType} of ${InvSite} on ${InvDate} reported ${InvFindings}.

${He} was advised ${RxType}. His other work-up was essentially normal.

On ${RxDate} at ${RxPlace}, ${he} underwent ${SxType} (${SxSide} ${SxSite} +
${AdditionalSitesMucosal} +
${AdditionalSitesMandible} +
${AdditionalSitesMaxilla} +
${AdditionalSitesDeeper} +
${AdditionalSitesDeeper} +
${AdditionalSitesSkin}
using ${Incisions} approach)

+ 
${R/LNeckExtent} (${R/LIA}, ${R/LIB, ...n})
+
 
${AdditionalPro}

Reconstruction was done with ${ReconType}

Intra-operatively, ${IntraopNotes}. ${His} Post-operative phase was uneventful/ Post-operatively ${he} had ${PostopNotes}

${He} was discharged on ${DischargeDate}

${His} final HPE showed ${Histology} of the ${SxSide} ${SxSite}. (Size: ${TsizeAP}x${TsizeTrans}x${TsizeVert}mm DOI: ${TsizeDOI}mm)

PNI was ${PNI}. LVI was ${LVI}. WPOI was ${WPOI}. The closest margin was ${ClosestMargin} which was ${MarginDistance}mm.

Bone/Skin/Muscle invasion was ${Bone/Skin/MuscleInv}.

${R/LPositNodes}/${R/LNodalYeild} were postive in the ${R/LNeckExtent}. Positve nodes were found in ${RHP1a,$RHP1b,.....}

[Size of largest node: ${R/LNodeSize}mm Size of metastasis: ${R/LMetSize}. ECS: ${RECS} (${RECSDistance}mm)]. (pT${Tstage})N${Nstage}.

Pt is advised physiotherapy and regular follow-up/Patient is advised ${Subsequent}

We wish ${him} good health. Please do not hesitate to contact us for any further information.

${sign} 

*/
