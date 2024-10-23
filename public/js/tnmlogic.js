/* -----------------------------------TNM Logic v1.1------------------------------------- */

function CalcpTNM() {
  // Tsize
  const tAP = parseInt(document.getElementById("TsizeAP").value);
  const tTrans = parseInt(document.getElementById("TsizeTrans").value);
  const tVert = parseInt(document.getElementById("TsizeVert").value);
  const DOI = parseInt(document.getElementById("TsizeDOI").value);
  const boneInv = document.getElementById("BoneInv").value;
  // Same neck
  const RpositNodes =
    document.getElementById("RPositNodes").value === ""
      ? ""
      : parseInt(document.getElementById("RPositNodes").value);
  const RnodeSize = parseInt(document.getElementById("RNodeSize").value);
  const ReCS = document.getElementById("RECS").value;
  // Opposite Neck
  const LpositNodes =
    document.getElementById("LPositNodes").value === ""
      ? ""
      : parseInt(document.getElementById("LPositNodes").value);
  const LnodeSize = parseInt(document.getElementById("LNodeSize").value);
  const LeCS = document.getElementById("LECS").value;

  // Result Divs
  const pT = document.getElementById("Tstage");
  const pN = document.getElementById("Nstage");

  /* -----pT-----*/

  //Get largest Diameter
  const largestDiameter = [tAP, tTrans, tVert].sort((a, b) => b - a)[0];

  //Check if All important T data is available or send and error msg as a tooltip
  if (!largestDiameter && !DOI) {
    pT.value = "x";
  } else if (!DOI) {
    document.getElementById("dataMissing").innerHTML =
      "Please enter DOI as it is essetial for T-staging";
    document.getElementById("dataMissing").style.display = "block";
  } else {
    //Going Reverse as it is easier

    if (boneInv === "Deep Intramedullary" || boneInv === "Present") {
      pT.value = "4a";
    } else if (
      boneInv === "" ||
      boneInv === "Absent" ||
      boneInv === "Superficial Cortical"
    ) {
      if (DOI > 10) {
        if (largestDiameter <= 40) {
          pT.value = "3";
        } else if (largestDiameter > 40) {
          pT.value = "4a";
        }
      } else if (DOI > 5 && DOI <= 10) {
        if (largestDiameter <= 40) {
          pT.value = "2";
        } else if (largestDiameter > 40) {
          pT.value = "T3";
        }
      } else if (DOI <= 5) {
        if (largestDiameter <= 20) {
          pT.value = "1";
        } else if (largestDiameter <= 40) {
          pT.value = "2";
        } else if (largestDiameter > 40) {
          pT.value = "3";
        }
      }
    }
  }

  /* -----pN-----*/

  //If All N data is missing then Nx (keep subsequent boxes disabled!)
  if (RpositNodes === "" && LpositNodes === "") {
    pN.value = "x";
  } else if (LpositNodes === "" || (LpositNodes === 0 && RpositNodes !== "")) {
    /*Single ND done (Or B/L Neck done with Opposite Neck N0) */
    if (RpositNodes === 0) {
      pN.value = "0";
    } else if (RpositNodes > 0) {
      if (ReCS === "Present") {
        if (RpositNodes > 1) {
          pN.value = "3b";
        } else if (RpositNodes === 1) {
          if (RnodeSize > 30) {
            pN.value = "3b";
          } else if (RnodeSize <= 30 || !RnodeSize) {
            pN.value = "2a";
          }
        }
      } else if (ReCS === "" || ReCS === "Absent") {
        if (RpositNodes > 1) {
          if (RnodeSize <= 60 || !RnodeSize) {
            pN.value = "2b";
          } else if (RnodeSize > 60) {
            pN.value = "3a";
          }
        } else if (RpositNodes === 1) {
          if (RnodeSize > 60) {
            pN.value = "3a";
          } else if (RnodeSize > 30 && RnodeSize <= 60) {
            pN.value = "2a";
          } else if (RnodeSize <= 30 || !RnodeSize) {
            pN.value = "1";
          }
        }
      }
    }
  } else if (LpositNodes !== "") {
    /*BL or Contralateral Neck Done */
    if (RpositNodes === "" || RpositNodes === 0) {
      /*Only Contralateral Neck Done (or BL neck done with same side neck N0) */
      if (LpositNodes === 0) {
        pN.value = "0";
      } else if (LpositNodes > 0) {
        if (LeCS === "Present") {
          pN.value = "3b";
        } else if (LeCS === "" || LeCS === "Absent") {
          if (LpositNodes >= 1) {
            if (LnodeSize > 60) {
              pN.value = "3a";
            } else if (LnodeSize <= 60 || !LnodeSize) {
              pN.value = "2c";
            }
          }
        }
      }
    } else if (RpositNodes !== "") {
      /*BL Neck done */
      if (RpositNodes === 0 && LpositNodes === 0) {
        /* BL Neck N0 */
        pN.value = "0";
      } else if (LpositNodes > 0 && RpositNodes > 0) {
        /* BL Neck with both side > 0 Nodes positive */
        if (LeCS === "Present" || ReCS === "Present") {
          pN.value = "3b";
        } else if (
          (LeCS === "" || LeCS === "Absent") &&
          (ReCS === "" || ReCS === "Absent")
        ) {
          if (LnodeSize > 60 || RnodeSize > 60) {
            pN.value = "3a";
          } else if (
            (LnodeSize <= 60 || !LnodeSize) &&
            (RnodeSize <= 60 || !RnodeSize)
          ) {
            pN.value = "2c";
          }
        }
      }
    }
  }
  AJCCTstage();
  AJCCNstage();
}

//////////////////////// TNM Info Generator ////////////////////

function AJCCTstage() {
  const Tstage = document.getElementById("Tstage").value;
  const TNMText = document.getElementById("TNMText");
  let text;
  switch (Tstage) {
    case "is":
      text = "Tis: Carcinoma <i>in situ</i>";
      break;
    case "x":
      text = "Tx: Primary tumor cannot be assessed";
      break;
    case "1":
      text = "T1: Tumor ≤2cm and DOI ≤5mm";
      break;
    case "2":
      text =
        "T2: Tumor ≤2cm but DOI >5mm & ≤10mm; Tumor >2cm & ≤4cm and DOI ≤10 mm";
      break;
    case "3": 
      text = "T3: Tumor > 4cm or <i>any</i> tumor with DOI > 10mm";
      break;
    case "4a":
      text =
        "T4a: Tumor > 4cm <i>AND</i> DOI > 10mm <i>OR</i> Tumor invades adjacent structures only (e.g., through cortical bone of mandible or maxilla, or involves the maxillary sinus or skin of the face.) (<i>Note: Superficial erosion of bone by a gingival primary is sufficient to classify a tumour as T4</i>)";
      break;
    case "4b":
      text =
        "T4b: Tumor invades masticator space, pterygoid plates, or skull base and/or encases the internal carotid artery";
      break;
    default:
      text = "";
  }

  TNMTextTstage.innerHTML = text;
}

function AJCCNstage() {
  const Nstage = document.getElementById("Nstage").value;
  const TNMTextNstage = document.getElementById("TNMTextNstage");
  let text;
  switch (Nstage) {
    case "x":
      text = "Nx: Regional lymph nodes cannot be assessed";
      break;
    case "0":
      text = "N0: No regional lymph node metastasis";
      break;
    case "1":
      text =
        "N1: Metastasis in a single ipsilateral lymph node, ≤3cm and ENE-";
      break;
    case "2a":
      text =
        "N2a: Metastasis in a single ipsilateral lymph node, ≤3cm and ENE+; or metastasis in a single ipsilateral lymph node >3cm and ≤6cm and ENE-";
      break;
    case "2b":
      text =
        "N2b: Metastases in multiple ipsilateral lymph nodes, ≤6cm and ENE-";
      break;
    case "2c":
      text =
        "N2c: Metastases in bilateral or contralateral lymph nodes, ≤6cm and ENE-";
      break;
    case "3a":
      text = "N3a: Metastasis in a lymph node >6cm and ENE-";
      break;
    case "3b":
      text =
        "N3b: Metastasis in a single ipsilateral node >3cm and ENE+; or multiple ipsilateral, contralateral, or bilateral nodes, any with ENE+; or a single contralateral node of any size and ENE+";
      break;
    default:
      text = "";
  }
  TNMTextNstage.innerHTML = text;
}
