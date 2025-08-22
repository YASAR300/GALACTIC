const permits = [
  {
    id: 1,
    name: "Permission to Blink",
    description: "Required for all ocular activity. Violators risk cosmic fines.",
    difficulty: "Impossible",
    rejectionRate: "99.9%",
    processingTime: "7 years",
    cost: "200 Credits"
  },
  {
    id: 2,
    name: "License to Exist in 3D Space",
    description: "Apply yearly to maintain your right to three-dimensionality.",
    difficulty: "Nightmare",
    rejectionRate: "98.7%",
    processingTime: "∞ years",
    cost: "1000 Credits"
  },
  {
    id: 3,
    name: "Permit to Breathe Oxygen",
    description: "Without this, inhaling is considered tax evasion.",
    difficulty: "Impossible",
    rejectionRate: "99.8%",
    processingTime: "12 years",
    cost: "500 Credits"
  },
  {
    id: 4,
    name: "Form 7B: Right to Complain",
    description: "Mandatory before expressing dissatisfaction with bureaucracy.",
    difficulty: "Hard",
    rejectionRate: "95.2%",
    processingTime: "3 years",
    cost: "150 Credits"
  },
  {
    id: 5,
    name: "Authorization to Yawn",
    description: "Yawning without approval may cause temporal instability.",
    difficulty: "Medium",
    rejectionRate: "89.1%",
    processingTime: "18 months",
    cost: "75 Credits"
  },
  {
    id: 6,
    name: "Cosmic Queue Standing Pass",
    description: "Grants the privilege of waiting eternally in official queues.",
    difficulty: "Impossible",
    rejectionRate: "99.99%",
    processingTime: "∞ years",
    cost: "800 Credits"
  },
  {
    id: 7,
    name: "Paperwork Reproduction License",
    description: "For duplicating forms beyond infinity.",
    difficulty: "Nightmare",
    rejectionRate: "97.3%",
    processingTime: "25 years",
    cost: "300 Credits"
  },
  {
    id: 8,
    name: "Certificate of Existence Renewal",
    description: "Your being expires every 12 months. Renew promptly.",
    difficulty: "Hard",
    rejectionRate: "92.8%",
    processingTime: "6 months",
    cost: "400 Credits"
  },
  {
    id: 9,
    name: "Permit to Sleep",
    description: "Resting without clearance counts as interstellar laziness.",
    difficulty: "Medium",
    rejectionRate: "87.6%",
    processingTime: "2 years",
    cost: "120 Credits"
  },
  {
    id: 10,
    name: "Time Travel Request Form",
    description: "Application must be submitted 500 years before travel.",
    difficulty: "Impossible",
    rejectionRate: "100%",
    processingTime: "500 years",
    cost: "10000 Credits"
  },
  {
    id: 11,
    name: "Galactic Hug Authorization",
    description: "Physical contact requires 17 witness signatures.",
    difficulty: "Hard",
    rejectionRate: "94.1%",
    processingTime: "4 years",
    cost: "250 Credits"
  },
  {
    id: 12,
    name: "Right to Wear Socks",
    description: "Socks are a regulated comfort item in Zone 12.",
    difficulty: "Medium",
    rejectionRate: "76.3%",
    processingTime: "8 months",
    cost: "60 Credits"
  },
  {
    id: 13,
    name: "Permit to Use Left Hand",
    description: "Left-hand usage is taxed at 17 Galactic Credits per day.",
    difficulty: "Easy",
    rejectionRate: "45.7%",
    processingTime: "3 months",
    cost: "90 Credits"
  },
  {
    id: 14,
    name: "Cosmic Sneeze Approval",
    description: "Unauthorized sneezing can trigger wormholes.",
    difficulty: "Hard",
    rejectionRate: "91.4%",
    processingTime: "14 months",
    cost: "180 Credits"
  },
  {
    id: 15,
    name: "Interstellar Pigeon Feeding License",
    description: "Feeding pigeons without this is a universal crime.",
    difficulty: "Medium",
    rejectionRate: "83.2%",
    processingTime: "10 months",
    cost: "110 Credits"
  },
  {
    id: 16,
    name: "Silence Permit",
    description: "Quiet time must be pre-approved by Noise Bureaucrats.",
    difficulty: "Easy",
    rejectionRate: "67.8%",
    processingTime: "5 months",
    cost: "40 Credits"
  },
  {
    id: 17,
    name: "Permit to Walk in Straight Line",
    description: "Walking diagonally requires a separate form.",
    difficulty: "Medium",
    rejectionRate: "79.5%",
    processingTime: "7 months",
    cost: "85 Credits"
  },
  {
    id: 18,
    name: "Quantum Laugh Registration",
    description: "Every laugh must collapse a quantum waveform responsibly.",
    difficulty: "Nightmare",
    rejectionRate: "96.7%",
    processingTime: "15 years",
    cost: "650 Credits"
  },
  {
    id: 19,
    name: "Dream Approval Certificate",
    description: "Submit dreams for review before sleeping.",
    difficulty: "Hard",
    rejectionRate: "88.9%",
    processingTime: "2.5 years",
    cost: "220 Credits"
  },
  {
    id: 20,
    name: "Galactic Beard Permit",
    description: "Beards longer than 2cm require annual inspection.",
    difficulty: "Medium",
    rejectionRate: "72.1%",
    processingTime: "11 months",
    cost: "95 Credits"
  },
  {
    id: 21,
    name: "Universal Wi-Fi Access License",
    description: "Unauthorized browsing leads to orbital punishment.",
    difficulty: "Hard",
    rejectionRate: "93.6%",
    processingTime: "3.5 years",
    cost: "350 Credits"
  },
  {
    id: 22,
    name: "Right to Use Elevator",
    description: "Stairs are default. Elevator requires 4D clearance.",
    difficulty: "Easy",
    rejectionRate: "58.3%",
    processingTime: "4 months",
    cost: "70 Credits"
  },
  {
    id: 23,
    name: "Permit to Blink Twice",
    description: "Separate from standard blinking — classified as advanced use.",
    difficulty: "Nightmare",
    rejectionRate: "99.2%",
    processingTime: "9 years",
    cost: "450 Credits"
  },
  {
    id: 24,
    name: "Existential Crisis Declaration Form",
    description: "All crises must be formally declared to the Ministry of Angst.",
    difficulty: "Medium",
    rejectionRate: "81.7%",
    processingTime: "16 months",
    cost: "130 Credits"
  },
  {
    id: 25,
    name: "Galactic Biscuit Consumption Pass",
    description: "Eating biscuits without this is an interstellar felony.",
    difficulty: "Easy",
    rejectionRate: "62.4%",
    processingTime: "6 months",
    cost: "45 Credits"
  },
  {
    id: 26,
    name: "Permit to Think Happy Thoughts",
    description: "Unauthorized optimism disrupts the cosmic balance of misery.",
    difficulty: "Impossible",
    rejectionRate: "99.95%",
    processingTime: "∞ years",
    cost: "777 Credits"
  },
  {
    id: 27,
    name: "License to Dance in Public",
    description: "Unsolicited choreography requires safety inspections.",
    difficulty: "Hard",
    rejectionRate: "90.3%",
    processingTime: "22 months",
    cost: "190 Credits"
  },
  {
    id: 28,
    name: "Quantum Pet Ownership Certificate",
    description: "Pets exist in superposition until bureaucratically observed.",
    difficulty: "Nightmare",
    rejectionRate: "98.1%",
    processingTime: "31 years",
    cost: "880 Credits"
  }
];

export default permits;