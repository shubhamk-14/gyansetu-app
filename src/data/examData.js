// Authentic Course-Wise Exam Taxonomy & Real PYQ Dataset for GyanSetu PRO

export const EXAMS = [
  { id: 'ssc', name: 'SSC CGL / CHSL', date: '15 Sep 2026', totalMcqs: 100, timeLimit: 60, icon: '🎯', desc: 'Tier-1 & Tier-2 Quant, Reasoning, English, General Awareness', marksPerQuestion: 2, negativeMarking: 0.5 },
  { id: 'upsc', name: 'UPSC Civil Services', date: '24 May 2027', totalMcqs: 100, timeLimit: 120, icon: '🏛️', desc: 'Prelims GS Paper-1: Indian Polity, Modern History, Geography, Economy', marksPerQuestion: 2, negativeMarking: 0.66 },
  { id: 'banking', name: 'Banking (IBPS / SBI PO)', date: '10 Oct 2026', totalMcqs: 100, timeLimit: 60, icon: '🏦', desc: 'Prelims & Mains Quant, Reasoning, Banking Awareness, DI', marksPerQuestion: 1, negativeMarking: 0.25 },
  { id: 'upsi', name: 'UPSI & State Police', date: '01 Dec 2026', totalMcqs: 160, timeLimit: 120, icon: '🛡️', desc: 'UP Police Sub-Inspector: Mool Vidhi, Constitution, Hindi, Maths, Reasoning', marksPerQuestion: 2.5, negativeMarking: 0.5 }
];

export const EXAMS_LIST = EXAMS;

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'Rohan Sharma', score: 292, exam: 'SSC CGL', streak: 28, badge: '👑 AIR #1' },
  { rank: 2, name: 'Ananya Verma', score: 284, exam: 'UPSC Prelims', streak: 21, badge: '🔥 AIR #2' },
  { rank: 3, name: 'Shubham (You)', score: 278, exam: 'SSC CGL', streak: 14, badge: '⭐ AIR #142' },
  { rank: 4, name: 'Vikram Singh', score: 265, exam: 'UPSI Police', streak: 12, badge: '🛡️ Top 1%' }
];

export const QUESTION_BANK = [
  {
    id: 'q1',
    subjectId: 'mathematics',
    topicId: 'percentage',
    question: 'A person spends 20% on house rent, 15% of remaining on education, and 60% of remaining on household items. If he saves ₹10,200 at month end, what is his total monthly income?',
    options: ['₹37,500', '₹35,000', '₹40,000', '₹36,000'],
    correctAnswer: 0,
    explanation: 'Let Income = 100x. Rent = 20x. Remainder = 80x. Education = 15% of 80x = 12x. Remainder = 68x. Household = 40.8x. Savings = 27.2x = 10,200 => Income = ₹37,500.',
    difficulty: 'Medium',
    examTag: 'SSC CGL 2024',
    tags: ['SSC CGL', 'Quant']
  },
  {
    id: 'q2',
    subjectId: 'polity',
    topicId: 'fundamental-rights',
    question: 'Regarding Constitutional Writs under Article 32 of the Constitution of India, consider the following statements:\n1. The writ of Habeas Corpus can be issued against both public authorities and private individuals.\n2. The writ of Mandamus cannot be issued against a private individual.\nWhich of the statements given above is/are correct?',
    options: ['Both 1 and 2', '1 only', '2 only', 'Neither 1 nor 2'],
    correctAnswer: 0,
    explanation: 'Statement 1 is correct: Habeas Corpus is the only writ that can be issued against both public and private unlawful detention.\nStatement 2 is correct: Mandamus is issued to public officials to perform duty, not against private bodies.',
    difficulty: 'Medium',
    examTag: 'UPSC Prelims 2024',
    tags: ['UPSC', 'Polity']
  },
  {
    id: 'q3',
    subjectId: 'reasoning',
    topicId: 'coding-decoding',
    question: 'In a certain code language, "MONKEY" is coded as "XDJMNL". How is "TIGER" written in that code language?',
    options: ['QDFHS', 'SDFHS', 'QDFIR', 'RDEGS'],
    correctAnswer: 0,
    explanation: 'Pattern: Reverse the word and subtract 1 from position number of each letter.\nTIGER reversed -> REGIT. R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S => QDFHS.',
    difficulty: 'Medium',
    examTag: 'IBPS PO 2024',
    tags: ['Banking', 'Reasoning']
  },
  {
    id: 'q4',
    subjectId: 'mool-vidhi',
    topicId: 'ipc-1860',
    question: 'Under which section of the Indian Penal Code (IPC 1860) is the offense of "Theft" defined?',
    options: ['Section 378', 'Section 300', 'Section 390', 'Section 302'],
    correctAnswer: 0,
    explanation: 'Section 378 defines Theft. Section 379 provides punishment up to 3 years imprisonment or fine.',
    difficulty: 'Easy',
    examTag: 'UPSI 2023',
    tags: ['UPSI', 'Mool Vidhi']
  }
];

export const MOCK_TESTS = [
  { 
    id: 'ssc-mock-1', 
    examId: 'ssc', 
    title: 'SSC CGL Tier-1 Full Length Mock #01', 
    subject: 'Quant, Reasoning, English, GA',
    durationMinutes: 30, 
    avgScore: 38,
    difficulty: 'Moderate',
    questions: ['q1', 'q3', 'q2', 'q4']
  },
  { 
    id: 'upsc-mock-1', 
    examId: 'upsc', 
    title: 'UPSC GS Prelims Paper-1 Full Mock', 
    subject: 'Polity, History, Geography, Economy',
    durationMinutes: 60, 
    avgScore: 42,
    difficulty: 'Hard',
    questions: ['q2', 'q1', 'q4', 'q3']
  },
  { 
    id: 'bank-mock-1', 
    examId: 'banking', 
    title: 'IBPS PO Prelims Speed Mock #01', 
    subject: 'Quant, Reasoning, English',
    durationMinutes: 30, 
    avgScore: 22,
    difficulty: 'Moderate',
    questions: ['q3', 'q1', 'q2']
  },
  { 
    id: 'upsi-mock-1', 
    examId: 'upsi', 
    title: 'UPSI Mool Vidhi & GK Special Sprint', 
    subject: 'Mool Vidhi, Constitution, UP GK',
    durationMinutes: 45, 
    avgScore: 54,
    difficulty: 'Moderate',
    questions: ['q4', 'q2', 'q1', 'q3']
  }
];

export const INITIAL_STUDY_PLAN = [
  { id: 'p1', title: 'Coding-Decoding Pattern Practice', subject: 'Reasoning', time: '45m', status: 'completed' },
  { id: 'p2', title: 'Percentage Fraction Conversions & Shortcuts', subject: 'Quant', time: '60m', status: 'completed' },
  { id: 'p3', title: 'Articles 12 to 35 Fundamental Rights Notes', subject: 'Polity', time: '50m', status: 'in-progress' },
  { id: 'p4', title: 'IPC 1860 Key Sections (Theft, Murder, Dacoity)', subject: 'Mool Vidhi', time: '40m', status: 'pending' }
];

export const SUBJECTS_TREE = [
  {
    id: 'polity',
    name: 'Indian Polity & Constitution (UPSC / UPSI / SSC)',
    topics: [
      {
        id: 'fundamental-rights',
        name: 'Articles 12-35 Fundamental Rights & Writs',
        level: 'High Yield',
        estimatedTime: '25 min',
        mastery: 85,
        notes: {
          title: 'Articles 12 to 35: Fundamental Rights & Constitutional Writs',
          summary: 'Part III of the Indian Constitution contains Articles 12 to 35 dealing with Fundamental Rights, described as the Magna Carta of India. Article 32 is the Right to Constitutional Remedies, called the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar.',
          keyRules: [
            'Article 14: Equality before Law and Equal Protection of Laws.',
            'Article 19: Six basic freedoms (Speech, Assembly, Association, Movement, Residence, Profession).',
            'Article 21: Protection of Life and Personal Liberty (Maneka Gandhi Case 1978 expanded this to right to live with dignity).',
            'Article 21A: Right to Free and Compulsory Education for children aged 6 to 14 (86th Amendment Act 2002).',
            'Article 32: Supreme Court can issue 5 Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).'
          ],
          formulas: [
            'Writ of Habeas Corpus = To have the body of (Issued against public & private unlawful detention)',
            'Writ of Mandamus = We Command (Issued to public officials to perform duty)',
            'Writ of Quo-Warranto = By what authority (Prevents illegal usurpation of public office)'
          ],
          shortcutTricks: 'Memory Mnemonic for 5 Writs: "HMPCQ" -> Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.',
          sampleProblem: 'UPSC 2024 Prelims: Statement 1 - Habeas Corpus can be issued against private individuals. Statement 2 - Mandamus cannot be issued against a private individual. Solution: Both statements are correct!'
        }
      },
      {
        id: 'dpsp',
        name: 'Articles 36-51 Directive Principles of State Policy',
        level: 'High Yield',
        estimatedTime: '20 min',
        mastery: 78,
        notes: {
          title: 'Part IV: Directive Principles of State Policy (DPSP)',
          summary: 'Borrowed from the Irish Constitution, DPSPs are non-justiciable principles aimed at establishing a Welfare State in India.',
          keyRules: [
            'Article 40: Organization of Village Panchayats.',
            'Article 44: Uniform Civil Code (UCC) for citizens.',
            'Article 50: Separation of Judiciary from Executive.'
          ],
          formulas: ['Classification: Socialistic (Art 38, 39), Gandhian (Art 40, 43, 47), Liberal-Intellectual (Art 44, 48, 50, 51)'],
          shortcutTricks: 'Article 44 = 4 & 4 are UNIFORM -> Uniform Civil Code.',
          sampleProblem: 'UPSC PYQ: Which article directs the State to organize Village Panchayats? Answer: Article 40.'
        }
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Quantitative Aptitude (SSC CGL / Banking / UPSI)',
    topics: [
      {
        id: 'percentage',
        name: 'Percentage Fractions & Successive Change',
        level: 'Must Master',
        estimatedTime: '30 min',
        mastery: 90,
        notes: {
          title: 'Percentage Conversion Tables & Successive Formula',
          summary: 'Percentages form the core foundation for Profit & Loss, Data Interpretation, Simple Interest, and Compound Interest across SSC CGL and Banking PO exams.',
          keyRules: [
            'Fraction to Percentage: 1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%.',
            'If A is R% more than B, then B is [R / (100 + R)] × 100% less than A.',
            'Expenditure Constant Rule: If Price increases by R%, Consumption must decrease by [R / (100 + R)] × 100%.'
          ],
          formulas: [
            'Successive % Change = a + b + (a × b) / 100',
            'Net Income = Initial Value × (1 ± x/100) × (1 ± y/100)'
          ],
          shortcutTricks: 'If sugar price increases by 25% (1/4), consumption must decrease by 1/(4+1) = 1/5 = 20% to keep expenditure constant!',
          sampleProblem: 'SSC CGL 2024 Shift-1: A person spends 20% on rent, 15% of remaining on education, and saves ₹10,200. What is total income? Solution: Income = 100x. Rent = 20x. Remainder = 80x. Education = 12x. Savings = 27.2x = 10,200 => Income = ₹37,500.'
        }
      },
      {
        id: 'time-work',
        name: 'Time & Work LCM Efficiency Shortcuts',
        level: 'Must Master',
        estimatedTime: '25 min',
        mastery: 82,
        notes: {
          title: 'Time & Work: LCM Method & Unit Efficiency Shortcuts',
          summary: 'Eliminate fraction calculations by assuming Total Work = LCM of individual days taken.',
          keyRules: [
            'Total Work = Efficiency × Time Taken.',
            'Individual Efficiency = Total Work / Individual Days.',
            'MDH Formula for group work: (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2.'
          ],
          formulas: [
            'Combined Days for A and B = (A × B) / (A + B)',
            'Efficiency Ratio = Inverse of Time Ratio'
          ],
          shortcutTricks: 'If A takes 12 days and B takes 18 days, Total Work = LCM(12, 18) = 36 units. Efficiency A = 3 units/day, B = 2 units/day. Total = 5 units/day!',
          sampleProblem: 'SSC CGL PYQ: A and B together can do work in 12 days. A alone in 20 days. How many days for B alone? Solution: Total work = 60 units. A+B efficiency = 5, A efficiency = 3 => B efficiency = 2. B alone = 60/2 = 30 days.'
        }
      }
    ]
  },
  {
    id: 'reasoning',
    name: 'General Intelligence & Reasoning (SSC / Banking / UPSI)',
    topics: [
      {
        id: 'coding-decoding',
        name: 'Coding-Decoding & Letter Shift Patterns',
        level: 'High Yield',
        estimatedTime: '20 min',
        mastery: 92,
        notes: {
          title: 'Coding-Decoding: EJOTY Rule & Reverse Alphabet Sum 27',
          summary: 'Coding-Decoding carries 3 to 5 questions in every SSC CGL, CHSL, and IBPS PO exam.',
          keyRules: [
            'EJOTY Rule: E=5, J=10, O=15, T=20, Y=25.',
            'CFILORUX Rule (Table of 3): C=3, F=6, I=9, L=12, O=15, R=18, U=21, X=24.',
            'Reverse Alphabet Pair Rule: Position sum of opposite letters is ALWAYS 27 (A+Z = 1+26 = 27, B+Y = 2+25 = 27).'
          ],
          formulas: [
            'Opposite Letter Position = 27 - Current Letter Position'
          ],
          shortcutTricks: 'Opposite letter mnemonic: AZ (Azad), BY (Boy), CX (Crux), DW (Dew), EV (Evening), FU (Full), GT (GT Road), HS (High School), IR (Indian Railway), JK (Jungle Queen), KP (Kanpur), LO (Love), MN (Man).',
          sampleProblem: 'IBPS PO 2024: "MONKEY" is coded as "XDJMNL". How is "TIGER" coded? Solution: Reverse word -> REGIT and subtract 1 from each letter -> QDFHS.'
        }
      }
    ]
  },
  {
    id: 'mool-vidhi',
    name: 'Mool Vidhi & UP GK (UPSI & State Police)',
    topics: [
      {
        id: 'ipc-1860',
        name: 'Indian Penal Code (IPC 1860) Key Sections',
        level: 'Must Master',
        estimatedTime: '30 min',
        mastery: 85,
        notes: {
          title: 'Mool Vidhi: Essential IPC 1860 Sections for UPSI Exam',
          summary: 'UPSI exam carries 40 questions of Mool Vidhi, Constitution & General Knowledge. IPC 1860 forms the primary component.',
          keyRules: [
            'Section 299: Culpable Homicide defined.',
            'Section 300: Murder defined (Section 302 provides punishment for murder).',
            'Section 378: Theft defined (Section 379 provides punishment up to 3 years).',
            'Section 390: Robbery (Theft becomes robbery if fear of instant death or hurt is caused).',
            'Section 395: Punishment for Dacoity (5 or more persons committing robbery).'
          ],
          formulas: ['Dacoity Minimum Requirement = 5 or more persons'],
          shortcutTricks: 'IPC Section 300 = Murder Definition, Section 302 = Murder Punishment, Section 304B = Dowry Death.',
          sampleProblem: 'UPSI 2023 PYQ: Under which IPC section is "Theft" defined? Answer: Section 378.'
        }
      }
    ]
  }
];
