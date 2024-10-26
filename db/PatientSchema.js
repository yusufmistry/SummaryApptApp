const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },
    patientName: {
        type: String,
        requrired: true
    },
    age: {
        type: Number,
        requrired: true
    },
    ContactNumber: Number,
    EmailID : {
        type: String,
        unique: true,
        match: /.+\@.+\..+/
    },
    AddLine1: String,
    AddLine2: String,
    Country: String,
    State: String,
    City: String,
    Pincode: Number,
    RelativeName: String,
    Relation: String,
    RelativeNumber: Number,
    Referredby: String,
    AnyOtherInfo: String,
    FirstVisitDate: String,
    HospitalName: String,
    IPDNo: Number,
    RxDate: String,
    RxPlace: String,
    SxSite: String,
    SxSide: String,
    Incisions: String,
    AdditionalSitesMucosal: [String],
    AdditionalSitesMandible: [String],
    AdditionalSitesMaxilla: [String],
    AdditionalSitesDeeper: [String],
    AdditionalSitesSkin: [String],
    AdditionalPro: [String],
    RNeckExtent: String,
    LNeckExtent: String,
    ReconType: [String],
    DischargeDate: String,
    TsizeDOI: Number,
    TsizeAP: Number,
    TsizeTrans: Number,
    TsizeVert: Number,
    ClosestMargin: String,
    MarginDistance: Number,
    PNI: String,
    LVI: String,
    RNodalYeild: Number,
    RPositNodes: Number,
    RNodeSize: Number,
    RMetSize: Number,
    RECSDistance: Number,
    LNodalYeild: Number,
    LPositNodes: Number,
    LNodeSize: Number,
    LMetSize: Number,
    LECSDistance: Number,
    Tstage: String,
    Nstage: String,
    gender: String,
    RxType: String,
    SxType: String,
    NeckType: String,
    Histology: String,
    WPOI: String,
    BoneInv: String,
    SkinInv: String,
    MuscleInv: String,
    AddlCommentPrimHP: String,
    RECS: String,
    LECS: String,
    AddlCommentRNeckHP: String,
    AddlCommentLNeckHP: String,
    Complaints: String,
    OnExam: String,
    MedicalHistory: String,
    HOPI: String,
    MedicalHistory: String,
    IntraopNotes: String,
    PostopNotes: String,
    RecoveryNotes: String,
    Subsequent: String,
    InvTableRows: String,
    RNeckLNRemoved: [String],
    RNeckStructureRemoved: [String],
    LNeckLNRemoved: [String],
    LNeckStructureRemoved: [String],
    RInvolvedNodes: [String],
    LInvolvedNodes: [String],
    Diagnosis: String,
    LastUpdated: String,
    TNMStage: String,
    PrefixTNM: String
},{ timestamps: true })

const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient 