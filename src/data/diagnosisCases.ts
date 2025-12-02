export interface DiagnosisCase {
  id: string;
  patientInfo: {
    age: number;
    gender: string;
    history: string[];
  };
  vitals: {
    bp: string;
    hr: number;
    temp: number;
    rr: number;
    spo2: number;
  };
  labs?: {
    [key: string]: string;
  };
  presentation: {
    chiefComplaint: string;
    symptoms: string[];
    duration: string;
  };
  options: string[];
  correctAnswer: string;
  difficulty: 'common' | 'rare';
  explanation: string;
}

export const diagnosisCases: DiagnosisCase[] = [
  // COMMON CASES
  {
    id: 'case_001',
    patientInfo: {
      age: 45,
      gender: 'Male',
      history: ['Type 2 Diabetes', 'Hypertension', 'Smoker (20 pack-years)']
    },
    vitals: {
      bp: '165/95',
      hr: 98,
      temp: 36.8,
      rr: 18,
      spo2: 96
    },
    labs: {
      'Glucose': '245 mg/dL',
      'HbA1c': '8.5%'
    },
    presentation: {
      chiefComplaint: 'Chest pressure',
      symptoms: ['Substernal chest pressure', 'Radiating to left arm', 'Diaphoresis', 'Shortness of breath'],
      duration: '30 minutes'
    },
    options: ['Acute MI', 'GERD', 'Anxiety Attack', 'Pneumonia'],
    correctAnswer: 'Acute MI',
    difficulty: 'common',
    explanation: 'Classic presentation of MI with cardiac risk factors, chest pressure radiating to arm, diaphoresis, and SOB.'
  },
  {
    id: 'case_002',
    patientInfo: {
      age: 28,
      gender: 'Female',
      history: ['No significant PMH', 'Takes oral contraceptives']
    },
    vitals: {
      bp: '118/75',
      hr: 88,
      temp: 38.2,
      rr: 20,
      spo2: 98
    },
    labs: {
      'WBC': '14,000/μL',
      'Urinalysis': 'Positive for leukocytes and nitrites'
    },
    presentation: {
      chiefComplaint: 'Burning with urination',
      symptoms: ['Dysuria', 'Frequency', 'Urgency', 'Suprapubic pain'],
      duration: '2 days'
    },
    options: ['UTI', 'Pyelonephritis', 'STI', 'Bladder Cancer'],
    correctAnswer: 'UTI',
    difficulty: 'common',
    explanation: 'Classic UTI presentation with dysuria, frequency, urgency, and positive urinalysis.'
  },
  {
    id: 'case_003',
    patientInfo: {
      age: 72,
      gender: 'Female',
      history: ['Osteoporosis', 'Recent fall 3 days ago', 'Lives alone']
    },
    vitals: {
      bp: '145/85',
      hr: 78,
      temp: 37.0,
      rr: 16,
      spo2: 97
    },
    presentation: {
      chiefComplaint: 'Right hip pain',
      symptoms: ['Unable to bear weight', 'Shortened and externally rotated leg', 'Groin pain with movement'],
      duration: 'Since fall 3 days ago'
    },
    options: ['Hip Fracture', 'Hip Dislocation', 'Muscle Strain', 'Sciatica'],
    correctAnswer: 'Hip Fracture',
    difficulty: 'common',
    explanation: 'Classic hip fracture presentation with fall history, inability to bear weight, and leg deformity.'
  },
  {
    id: 'case_004',
    patientInfo: {
      age: 6,
      gender: 'Male',
      history: ['Up-to-date on vaccinations', 'Attends daycare']
    },
    vitals: {
      bp: '95/60',
      hr: 120,
      temp: 38.9,
      rr: 28,
      spo2: 96
    },
    presentation: {
      chiefComplaint: 'Barking cough',
      symptoms: ['Harsh barking cough', 'Stridor', 'Hoarseness', 'Worse at night'],
      duration: '2 days'
    },
    options: ['Croup', 'Epiglottitis', 'Bronchiolitis', 'Asthma'],
    correctAnswer: 'Croup',
    difficulty: 'common',
    explanation: 'Classic croup (laryngotracheobronchitis) with barking cough and stridor in young child.'
  },
  {
    id: 'case_005',
    patientInfo: {
      age: 35,
      gender: 'Female',
      history: ['Migraines', 'Regular menstrual cycles']
    },
    vitals: {
      bp: '122/78',
      hr: 72,
      temp: 36.9,
      rr: 14,
      spo2: 99
    },
    presentation: {
      chiefComplaint: 'Severe throbbing headache',
      symptoms: ['Unilateral throbbing pain', 'Photophobia', 'Nausea', 'Visual aura before onset'],
      duration: '6 hours'
    },
    options: ['Migraine', 'Tension Headache', 'Cluster Headache', 'Subarachnoid Hemorrhage'],
    correctAnswer: 'Migraine',
    difficulty: 'common',
    explanation: 'Classic migraine with aura, unilateral throbbing pain, photophobia, and nausea.'
  },

  // RARE/CHALLENGING CASES
  {
    id: 'case_006',
    patientInfo: {
      age: 52,
      gender: 'Male',
      history: ['Recent camping trip', 'No significant PMH']
    },
    vitals: {
      bp: '135/88',
      hr: 102,
      temp: 39.1,
      rr: 22,
      spo2: 95
    },
    labs: {
      'WBC': '18,500/μL',
      'Platelets': '95,000/μL',
      'LFTs': 'Elevated'
    },
    presentation: {
      chiefComplaint: 'High fever and body aches',
      symptoms: ['High fever', 'Severe myalgia', 'Headache', 'Thrombocytopenia', 'Leukopenia'],
      duration: '5 days'
    },
    options: ['Rocky Mountain Spotted Fever', 'Lyme Disease', 'Influenza', 'Ehrlichiosis'],
    correctAnswer: 'Ehrlichiosis',
    difficulty: 'rare',
    explanation: 'Tick-borne illness with fever, thrombocytopenia, leukopenia, and elevated LFTs after camping.'
  },
  {
    id: 'case_007',
    patientInfo: {
      age: 38,
      gender: 'Female',
      history: ['Recent facial surgery', 'Otherwise healthy']
    },
    vitals: {
      bp: '165/105',
      hr: 115,
      temp: 38.4,
      rr: 24,
      spo2: 93
    },
    labs: {
      'D-dimer': 'Elevated',
      'ABG': 'Respiratory alkalosis'
    },
    presentation: {
      chiefComplaint: 'Sudden shortness of breath',
      symptoms: ['Sudden dyspnea', 'Pleuritic chest pain', 'Tachycardia', 'Anxiety', 'Recent immobilization'],
      duration: '2 hours'
    },
    options: ['Pulmonary Embolism', 'Panic Attack', 'Pneumonia', 'Myocardial Infarction'],
    correctAnswer: 'Pulmonary Embolism',
    difficulty: 'rare',
    explanation: 'PE presentation with sudden dyspnea, pleuritic pain, tachycardia, and recent surgery/immobilization.'
  },
  {
    id: 'case_008',
    patientInfo: {
      age: 19,
      gender: 'Male',
      history: ['College athlete', 'Recent viral URI 2 weeks ago']
    },
    vitals: {
      bp: '108/65',
      hr: 125,
      temp: 37.8,
      rr: 20,
      spo2: 97
    },
    labs: {
      'Troponin': 'Elevated',
      'ECG': 'Diffuse ST elevation',
      'CXR': 'Cardiomegaly'
    },
    presentation: {
      chiefComplaint: 'Chest pain and fatigue',
      symptoms: ['Sharp chest pain', 'Worsens with lying down', 'Extreme fatigue', 'Shortness of breath on exertion'],
      duration: '3 days'
    },
    options: ['Myocarditis', 'Pericarditis', 'Acute MI', 'Costochondritis'],
    correctAnswer: 'Myocarditis',
    difficulty: 'rare',
    explanation: 'Viral myocarditis post-URI with elevated troponin, ECG changes, and cardiomegaly in young athlete.'
  },
  {
    id: 'case_009',
    patientInfo: {
      age: 67,
      gender: 'Female',
      history: ['Type 2 Diabetes', 'Recent antibiotic use']
    },
    vitals: {
      bp: '88/52',
      hr: 128,
      temp: 39.5,
      rr: 28,
      spo2: 92
    },
    labs: {
      'WBC': '22,000/μL',
      'Lactate': '4.2 mmol/L',
      'Creatinine': 'Elevated'
    },
    presentation: {
      chiefComplaint: 'Severe abdominal pain and diarrhea',
      symptoms: ['Profuse watery diarrhea', 'Severe cramping', 'Fever', 'Dehydration', 'Recent antibiotics'],
      duration: '24 hours'
    },
    options: ['C. difficile Colitis', 'Food Poisoning', 'IBD Flare', 'Diverticulitis'],
    correctAnswer: 'C. difficile Colitis',
    difficulty: 'rare',
    explanation: 'C. diff colitis with recent antibiotic use, severe diarrhea, elevated WBC, and signs of sepsis.'
  },
  {
    id: 'case_010',
    patientInfo: {
      age: 42,
      gender: 'Male',
      history: ['Alcoholism', 'Poor nutrition', 'Homeless']
    },
    vitals: {
      bp: '145/90',
      hr: 110,
      temp: 37.2,
      rr: 20,
      spo2: 98
    },
    labs: {
      'Thiamine': 'Low',
      'MRI': 'Lesions in mammillary bodies'
    },
    presentation: {
      chiefComplaint: 'Confusion and vision problems',
      symptoms: ['Confusion', 'Ataxia', 'Ophthalmoplegia', 'Memory impairment', 'Nystagmus'],
      duration: '1 week'
    },
    options: ['Wernicke Encephalopathy', 'Alcohol Withdrawal', 'Stroke', 'Dementia'],
    correctAnswer: 'Wernicke Encephalopathy',
    difficulty: 'rare',
    explanation: 'Classic Wernicke triad: confusion, ataxia, and ophthalmoplegia in chronic alcoholic with thiamine deficiency.'
  },
  {
    id: 'case_011',
    patientInfo: {
      age: 8,
      gender: 'Female',
      history: ['Recent pharyngitis treated at home', 'No chronic conditions']
    },
    vitals: {
      bp: '125/82',
      hr: 105,
      temp: 37.5,
      rr: 22,
      spo2: 98
    },
    labs: {
      'Urinalysis': 'RBCs, RBC casts, proteinuria',
      'ASO titer': 'Elevated',
      'C3': 'Low'
    },
    presentation: {
      chiefComplaint: 'Puffy eyes and dark urine',
      symptoms: ['Periorbital edema', 'Cola-colored urine', 'Mild hypertension', 'Recent strep throat'],
      duration: '3 days'
    },
    options: ['Post-streptococcal Glomerulonephritis', 'Nephrotic Syndrome', 'UTI', 'IgA Nephropathy'],
    correctAnswer: 'Post-streptococcal Glomerulonephritis',
    difficulty: 'rare',
    explanation: 'PSGN with recent strep infection, hematuria, RBC casts, hypertension, and low C3.'
  },
  {
    id: 'case_012',
    patientInfo: {
      age: 55,
      gender: 'Male',
      history: ['Smoker', 'Weight loss (15 lbs in 2 months)']
    },
    vitals: {
      bp: '152/90',
      hr: 88,
      temp: 37.0,
      rr: 18,
      spo2: 96
    },
    labs: {
      'Sodium': '118 mEq/L',
      'Osmolality': 'Low serum, high urine'
    },
    presentation: {
      chiefComplaint: 'Persistent cough and confusion',
      symptoms: ['Chronic cough', 'Hemoptysis', 'Confusion', 'Weakness', 'Hyponatremia'],
      duration: '6 weeks'
    },
    options: ['SCLC with SIADH', 'Pneumonia', 'TB', 'NSCLC'],
    correctAnswer: 'SCLC with SIADH',
    difficulty: 'rare',
    explanation: 'Small cell lung cancer with SIADH causing severe hyponatremia, weight loss, and hemoptysis in smoker.'
  },
  {
    id: 'case_013',
    patientInfo: {
      age: 29,
      gender: 'Female',
      history: ['Recent URI', 'Otherwise healthy', 'Active lifestyle']
    },
    vitals: {
      bp: '85/50',
      hr: 135,
      temp: 37.1,
      rr: 26,
      spo2: 94
    },
    labs: {
      'Potassium': '5.8 mEq/L',
      'Sodium': '128 mEq/L',
      'Glucose': '58 mg/dL',
      'Cortisol': 'Low'
    },
    presentation: {
      chiefComplaint: 'Severe weakness and dizziness',
      symptoms: ['Profound weakness', 'Orthostatic hypotension', 'Hyperpigmentation', 'Salt craving', 'Nausea'],
      duration: '1 week, worsening'
    },
    options: ['Addison Disease', 'Dehydration', 'Septic Shock', 'Hypoglycemia'],
    correctAnswer: 'Addison Disease',
    difficulty: 'rare',
    explanation: 'Primary adrenal insufficiency with hypotension, hyperkalemia, hyponatremia, hypoglycemia, and hyperpigmentation.'
  },
  {
    id: 'case_014',
    patientInfo: {
      age: 16,
      gender: 'Male',
      history: ['Sickle cell disease', 'Multiple previous crises']
    },
    vitals: {
      bp: '110/70',
      hr: 115,
      temp: 38.8,
      rr: 30,
      spo2: 88
    },
    labs: {
      'Hb': '6.2 g/dL',
      'Reticulocyte': 'Low',
      'CXR': 'New infiltrate'
    },
    presentation: {
      chiefComplaint: 'Severe chest pain and difficulty breathing',
      symptoms: ['Acute chest pain', 'Dyspnea', 'Fever', 'Cough', 'Hypoxia', 'New pulmonary infiltrate'],
      duration: '12 hours'
    },
    options: ['Acute Chest Syndrome', 'Pneumonia', 'Pulmonary Embolism', 'Vaso-occlusive Crisis'],
    correctAnswer: 'Acute Chest Syndrome',
    difficulty: 'rare',
    explanation: 'Life-threatening complication of sickle cell with chest pain, fever, hypoxia, and new infiltrate.'
  },
  {
    id: 'case_015',
    patientInfo: {
      age: 48,
      gender: 'Female',
      history: ['Recent gardening', 'Lives in rural area', 'No tetanus vaccine in 20 years']
    },
    vitals: {
      bp: '155/95',
      hr: 105,
      temp: 38.2,
      rr: 20,
      spo2: 97
    },
    presentation: {
      chiefComplaint: 'Jaw stiffness and muscle spasms',
      symptoms: ['Lockjaw (trismus)', 'Risus sardonicus', 'Muscle rigidity', 'Painful spasms', 'Difficulty swallowing'],
      duration: '3 days'
    },
    options: ['Tetanus', 'Meningitis', 'Rabies', 'Dystonic Reaction'],
    correctAnswer: 'Tetanus',
    difficulty: 'rare',
    explanation: 'Tetanus with classic trismus, risus sardonicus, and generalized muscle spasms in unvaccinated patient.'
  }
];

export function shuffleCases(cases: DiagnosisCase[]): DiagnosisCase[] {
  const shuffled = [...cases];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
