////////////////////////////// Tagify Scripts ///////////////////////////
/* 1. Primary Site */
const SxSiteTagify = new Tagify(document.getElementById("SxSite"), {
  enforceWhitelist: true,
  mode: "select",
  whitelist: PrimarySitesArray,
  dropdown: {
    maxItems: 5,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* 2. Primary Side */
const SxSideTagify = new Tagify(document.getElementById("SxSide"), {
  mode: "select",
  whitelist: PrimarySideArray,
  maxTags: 1,
  delimiters: ",",
  dropdown: {
    maxItems: 4,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* 3. Incisions */
const IncisionsTagify = new Tagify(document.getElementById("Incisions"), {
  mode: "select",
  whitelist: IncisionsArray,
  maxTags: 1,
  delimiters: ",",
  dropdown: {
    maxItems: 15,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* 4. Additional Sites - Mucosal */
const AddlMucosalTagify = new Tagify(
  document.getElementById("AdditionalSitesMucosal"),
  {
    whitelist: AdditionalSitesMucosalArray,
    maxTags: 5,
    delimiters: ",",
    dropdown: {
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: true,
    },
  }
);

/* 5. Additional Sites - Mandible */
const AddlMandibleTagify = new Tagify(
  document.getElementById("AdditionalSitesMandible"),
  {
    whitelist: AdditionalSitesMandibleArray,
    maxTags: 1,
    delimiters: ",",
    dropdown: {
      maxItems: 15,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: true,
    },
  }
);

/* 6. Additional Sites - Maxilla */
const AddlMaxillaTagify = new Tagify(
  document.getElementById("AdditionalSitesMaxilla"),
  {
    whitelist: AdditionalSitesMaxillaArray,
    maxTags: 1,
    delimiters: ",",
    dropdown: {
      maxItems: 15,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: true,
    },
  }
);

/* 7. Additional Sites - Deeper */
const AddlDeeperTagify = new Tagify(
  document.getElementById("AdditionalSitesDeeper"),
  {
    whitelist: AdditionalSitesDeeperArray,
    maxTags: 5,
    delimiters: ",",
    dropdown: {
      maxItems: 15,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: true,
    },
  }
);

/* 8. Additional Sites - Skin */
const AddlSkinTagify = new Tagify(
  document.getElementById("AdditionalSitesSkin"),
  {
    whitelist: AdditionalSitesSkinArray,
    maxTags: 5,
    delimiters: ",",
    dropdown: {
      maxItems: 15,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: true,
    },
  }
);

/* 9. Additional Procedures */
const AddlProTagify = new Tagify(document.getElementById("AdditionalPro"), {
  whitelist: AdditionalProArray,
  maxTags: 5,
  delimiters: ",",
  dropdown: {
    maxItems: 15,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* 10. Right Neck Extent */
const RNeckExtentTagify = new Tagify(document.getElementById("RNeckExtent"), {
  enforceWhitelist: true,
  mode: "select",
  whitelist: NeckExentArray,
  dropdown: {
    maxItems: 10,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* 11. Left Neck Extent */
const LNeckExtentTagify = new Tagify(document.getElementById("LNeckExtent"), {
  enforceWhitelist: true,
  mode: "select",
  whitelist: NeckExentArray,
  dropdown: {
    maxItems: 10,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});

/* Reconstruction */
var ReconTypeTagify = new Tagify(document.getElementById("ReconType"), {
  whitelist: ReconArray,
  maxTags: 5,
  delimiters: ",",
  dropdown: {
    maxItems: 15,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true,
  },
});