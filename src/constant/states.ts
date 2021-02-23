import STATE_TYPE from '../declaration_types/State';
export const states: Array<STATE_TYPE> = [
  { status: 'qualified', points: 10 },
  { status: 'followUp', points: 20 },
  { status: 'presentation', points: 30 },
  { status: 'businessProposal', points: 40 },

  { status: 'problem', points: 100 },
  { status: 'lost', points: 100 },

  { status: 'interested', points: 50 },
  { status: 'win', points: 60 },
  { status: 'billsAccused', points: 70 },
  { status: 'billsPaid', points: 80 },
  { status: 'activated', points: 100 },
];
