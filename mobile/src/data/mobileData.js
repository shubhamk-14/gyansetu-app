export const MOBILE_EXAMS = [
  { id: 'ssc', name: 'SSC CGL / CHSL', date: '15 Sep 2026', mcqs: 25, time: '60m' },
  { id: 'upsc', name: 'UPSC Civil Services', date: '24 May 2027', mcqs: 30, time: '120m' },
  { id: 'banking', name: 'Banking (IBPS PO)', date: '10 Oct 2026', mcqs: 30, time: '60m' },
  { id: 'upsi', name: 'UPSI & State Police', date: '01 Dec 2026', mcqs: 40, time: '120m' }
];

export const MOBILE_TOPICS = [
  { id: 't1', title: 'Coding-Decoding Pattern Practice', subject: 'Reasoning', time: '45m', status: 'completed' },
  { id: 't2', title: 'Percentage Fraction Conversions & Shortcuts', subject: 'Quant', time: '60m', status: 'completed' },
  { id: 't3', title: 'Articles 12 to 35 Fundamental Rights Notes', subject: 'Polity', time: '50m', status: 'in-progress' },
  { id: 't4', title: 'SSC CGL Timed Speed Sprint #01', subject: 'Mock Exam', time: '30m', status: 'pending' }
];

export const MOBILE_PYQS = [
  {
    id: 'm-pyq-1',
    year: '2024',
    exam: 'SSC CGL 2024',
    question: 'A person spends 20% on rent, 15% of remaining on education, and saves ₹10,200. What is his income?',
    options: ['₹37,500', '₹35,000', '₹40,000', '₹36,000'],
    correct: 0,
    solution: 'Income = 100x. Rent = 20x. Remaining = 80x. Education = 12x. Remaining = 68x. Savings = 40% of 68x = 27.2x. Given 27.2x = 10,200 => Income = ₹37,500.'
  },
  {
    id: 'm-pyq-2',
    year: '2024',
    exam: 'UPSC Prelims 2024',
    question: 'Constitution Day is celebrated on 26th November to promote constitutional values among citizens. True or False?',
    options: ['True', 'False'],
    correct: 0,
    solution: 'True: 26th November has been celebrated as Constitution Day in India since 2015.'
  }
];
