/*
 * Single source of truth for all copy rendered by the tool.
 * Edit wording here without touching layout/logic in index.html or js/*.js.
 *
 * `paragraph` fields are the first-person prose inserted into the assembled
 * letter. `label` fields are the short checkbox text shown in the UI.
 * Keep facts here consistent with motogp-submission-tool-spec.md §1.
 */
window.CONTENT = {
  meta: {
    siteName: "Victoria Park MotoGP Submission Builder",
    tagline: "Write your own submission on the MotoGP circuit proposal",
    deadlineISO: "2026-09-20T23:59:00+09:30",
    deadlineDisplayShort: "11:59pm, Sun 20 Sept 2026",
    deadlineDisplayLong: "11:59pm, Sunday 20 September 2026 (Adelaide time)",
    officialSurveyUrl:
      "https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment/design/share-feedback",
    officialEmail: "circuitredevelopment@sa.gov.au",
    aplaCcEmail: "adelparklands@outlook.com",
    aplaName: "Adelaide Park Lands Association",
    subjectLine:
      "Submission on proposed MotoGP circuit redevelopment — Victoria Park/Pakapakanthi",
  },

  // Step 3 — the submitter's own words (§4 step 3). This paragraph goes into
  // the letter verbatim, positioned right after the connection paragraph.
  yourWords: {
    intro:
      "This is the part that matters most. In a sentence or two, tell them something specific — a place you use, a moment, what changes for you or your family. One real detail is worth more than any number of tick-boxes.",
    label: "Why this matters to you (optional, but this is the bit they actually read)",
    examples: [
      "I walk my two kids across the eastern end of the park to school every morning — those are the trees that would go.",
      "My football club trains on the oval that closes for six weeks around the event, not just one weekend.",
      "I was born in Adelaide in 1974 and have watched the Park Lands shrink my whole life.",
    ],
    nudge:
      "You've picked several concerns — adding one specific detail of your own here will make this submission much harder to dismiss as a form letter.",
  },

  // Key facts shown up front on the landing screen (§4 step 1).
  headlineFacts: [
    { stat: "Up to 400 trees", detail: "removed from the iconic Adelaide Parklands" },
    { stat: "$96 million+", detail: "in public money for construction alone" },
    { stat: "Permanent change", detail: "under an initial six-year contract, with no guarantee it stops there" },
  ],

  // Step 1 — connection to the Park Lands (multi-select chips + free text).
  connectionChips: [
    { id: "resident", label: "Resident", fragment: "a resident living near the Park Lands" },
    { id: "parent", label: "Parent", fragment: "a parent of children who use the Park Lands" },
    { id: "sports-club", label: "Sports club member", fragment: "a member of a sports club that uses the Park Lands" },
    { id: "regular-user", label: "Regular park user", fragment: "someone who regularly uses the Park Lands" },
    { id: "ratepayer", label: "Ratepayer", fragment: "an Adelaide ratepayer" },
    { id: "visitor", label: "Visitor to Adelaide", fragment: "a visitor to Adelaide who values the Park Lands" },
  ],

  // Step 2 — concerns, grouped by theme (§6.1–6.6).
  categories: [
    {
      id: "trees-heritage",
      heading: "Trees, heritage & permanent change",
      items: [
        {
          id: "tree-removal",
          label: "Removing up to 400 trees from a National Heritage-listed park",
          paragraph:
            "I am concerned about the removal of up to 400 trees from Victoria Park/Pakapakanthi to build this circuit — land that is part of the National Heritage-listed Adelaide Park Lands.",
        },
        {
          id: "permanent-infrastructure",
          label: "Permanent infrastructure for an event held only a few days a year",
          paragraph:
            "This is permanent, irreversible construction and infrastructure being built for an event that will only be held a few days each year, under an initial six-year contract with no guarantee it stops there.",
        },
        {
          id: "replanting-inadequate",
          label: "Replanting doesn't replace mature trees",
          paragraph:
            "While the Government has committed to planting roughly ten replacement trees for every one removed, I don't believe this replaces the shade, canopy and habitat value that mature trees take decades to provide, and I'm concerned this commitment is being used to make permanent, irreversible destruction sound acceptable.",
        },
        {
          id: "world-heritage-risk",
          label: "Risk to the Park Lands' World Heritage bid",
          paragraph:
            "I'm concerned this project puts at risk Adelaide's bid for World Heritage listing of the Park Lands.",
        },
        {
          id: "public-access-loss",
          label: "Loss of public access",
          paragraph:
            "I'm concerned about the loss or restriction of public access to Park Lands that people currently use freely.",
        },
      ],
    },
    {
      id: "environment-wildlife",
      heading: "Environment & wildlife",
      items: [
        {
          id: "wildlife-biodiversity",
          label: "Impact on wildlife and biodiversity",
          paragraph:
            "I'm concerned about the impact on wildlife and biodiversity in the Park Lands, including on vulnerable species such as the Chequered Copper Butterfly.",
        },
        {
          id: "canopy-heat",
          label: "Loss of tree canopy as summers get hotter",
          paragraph:
            "Losing tree canopy will make a real difference to how hot parts of the city feel, at a time when Adelaide is already facing worsening summer heat.",
        },
        {
          id: "offset-vs-justify",
          label: "Environmental spending elsewhere used to offset the damage",
          paragraph:
            "I'm concerned that spending on environmental projects elsewhere is being used to offset, rather than genuinely justify, damage to a protected heritage landscape.",
        },
      ],
    },
    {
      id: "traffic-access",
      heading: "Traffic, access & daily life",
      items: [
        {
          id: "road-closures",
          label: "Road closures adding to commutes and residential traffic",
          paragraph:
            "Road closures for this project will add significant time to commutes and could redirect displaced traffic through residential streets that aren't built for it.",
        },
        {
          id: "school-travel",
          label: "Disruption to school travel and public transport",
          paragraph:
            "I'm concerned about the flow-on effects for school travel, school buses and public transport when usual routes are closed.",
        },
        {
          id: "community-facilities",
          label: "Disruption to sporting clubs and community facilities",
          paragraph:
            "Access to sporting clubs and community facilities in and around the Park Lands could be disrupted for weeks at a time, not just over a single event weekend.",
        },
        {
          id: "emergency-access",
          label: "Emergency vehicle and medical access during events",
          paragraph:
            "I'm concerned about ambulance, fire and other emergency vehicle access, and about people's ability to get to medical appointments, during event periods.",
        },
      ],
    },
    {
      id: "process-transparency",
      heading: "Process, transparency & consultation",
      items: [
        {
          id: "short-consultation",
          label: "Three-week consultation window is too short",
          paragraph:
            "A three-week consultation window is not enough time to properly respond to a roughly $96 million, permanent change to National Heritage-listed land.",
        },
        {
          id: "no-eia",
          label: "No independent Environmental Impact Assessment",
          paragraph:
            "No independent Environmental Impact Assessment has been published for this project.",
        },
        {
          id: "no-cba",
          label: "No independent Cost-Benefit Analysis",
          paragraph:
            "No comprehensive, independent Cost-Benefit Analysis has been published to justify the public spending involved.",
        },
        {
          id: "consultation-quality",
          label: "Consultation process doesn't give a genuine say",
          paragraph:
            "I don't believe the consultation process itself — with no public meetings and limited notice — gives the community a genuine or meaningful say.",
        },
        {
          id: "council-excluded",
          label: "Council and community groups excluded from the announcement",
          paragraph:
            "Adelaide City Council and community groups were not included in the Government's own design announcement.",
        },
      ],
    },
    {
      id: "economic-case",
      heading: "The economic case",
      items: [
        {
          id: "cost-clarity",
          label: "Lack of clarity about the full public cost",
          paragraph:
            "There is a lack of clarity about the full public cost of this project, including any subsidies or inducements offered to the promoter, teams or riders.",
        },
        {
          id: "flow-on-costs",
          label: "Flow-on costs to policing, health and traffic budgets",
          paragraph:
            "I'm concerned about flow-on costs to other budgets, such as policing, health and traffic management during events.",
        },
        {
          id: "service-tradeoffs",
          label: "Other services may be cut to help fund this",
          paragraph:
            "I'm concerned that other services or events may be reduced or deprioritised to help fund this project.",
        },
        {
          id: "benefits-unverified",
          label: "Economic benefits haven't been independently verified",
          paragraph:
            "I don't believe the claimed economic benefits have been independently verified, rather than simply asserted by the Government.",
        },
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives",
      items: [
        {
          id: "alt-venues",
          label: "Existing venues like The Bend weren't properly considered",
          paragraph:
            "I don't believe existing motorsport venues, such as The Bend Motorsport Park at Tailem Bend, were properly and transparently considered as an alternative.",
        },
        {
          id: "soft-opposition",
          label: "I like MotoGP in SA, just not at this location",
          paragraph:
            "I support the idea of bringing MotoGP to South Australia, but not at the cost of permanent construction in the Adelaide Park Lands.",
        },
      ],
    },
  ],

  // Step 3 — closing "asks" (§6.7). `paragraph` is a lowercase clause
  // fragment stitched after "I am asking the South Australian Government to".
  asks: [
    {
      id: "abandon",
      label: "Abandon the proposed circuit redevelopment",
      paragraph: "abandon the proposed Victoria Park/Pakapakanthi circuit redevelopment",
    },
    {
      id: "pause-alternatives",
      label: "Pause the project and assess alternative locations",
      paragraph: "pause the project and properly assess alternative locations before proceeding",
    },
    {
      id: "eia",
      label: "Commission an independent Environmental Impact Assessment",
      paragraph:
        "commission and publish an independent Environmental Impact Assessment before any further approval",
    },
    {
      id: "cba",
      label: "Publish an independent Cost-Benefit Analysis",
      paragraph: "publish a full, independent Cost-Benefit Analysis before committing further public money",
    },
    {
      id: "extend-consultation",
      label: "Extend consultation and hold genuine public meetings",
      paragraph:
        "extend the consultation period and hold genuine public meetings, with a real opportunity for community input",
    },
    {
      id: "rule-out-expansion",
      label: "Rule out further motorsport expansion into the Park Lands",
      paragraph: "rule out any further motorsport expansion into the Park Lands beyond what is currently proposed",
    },
  ],
};
