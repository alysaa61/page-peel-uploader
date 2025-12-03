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
  },
  {
    id: 'case_016',
    patientInfo: {
      age: 34,
      gender: 'Male',
      history: ['IV drug use']
    },
    vitals: {
      bp: '132/85',
      hr: 110,
      temp: 38.7,
      rr: 20,
      spo2: 95
    },
    labs: {
      'Blood cultures': 'Positive',
      'ESR': 'High'
    },
    presentation: {
      chiefComplaint: 'Persistent fever and fatigue',
      symptoms: ['Night sweats', 'Weight loss', 'New heart murmur', 'Petechiae'],
      duration: '2 weeks'
    },
    options: ['Infective Endocarditis', 'Sepsis', 'HIV', 'Pneumonia'],
    correctAnswer: 'Infective Endocarditis',
    difficulty: 'rare',
    explanation: 'IV drug use, fever, murmur, petechiae, and positive cultures indicate infective endocarditis.'
  },
  {
    id: 'case_017',
    patientInfo: {
      age: 60,
      gender: 'Female',
      history: ['Gallstones']
    },
    vitals: {
      bp: '140/90',
      hr: 105,
      temp: 38.5,
      rr: 22,
      spo2: 97
    },
    labs: {
      'Lipase': 'Elevated',
      'ALT': 'High'
    },
    presentation: {
      chiefComplaint: 'Epigastric pain',
      symptoms: ['Radiates to back', 'Vomiting', 'Abdominal tenderness'],
      duration: '10 hours'
    },
    options: ['Acute Pancreatitis', 'Cholecystitis', 'GERD', 'Gastritis'],
    correctAnswer: 'Acute Pancreatitis',
    difficulty: 'common',
    explanation: 'Gallstone pancreatitis presents with elevated lipase and epigastric pain radiating to the back.'
  },
  {
    id: 'case_018',
    patientInfo: {
      age: 24,
      gender: 'Female',
      history: ['Recent travel to Southeast Asia']
    },
    vitals: {
      bp: '105/65',
      hr: 120,
      temp: 39.2,
      rr: 22,
      spo2: 98
    },
    labs: {
      'Platelets': '90,000/μL',
      'Hematocrit': 'High'
    },
    presentation: {
      chiefComplaint: 'High fever and rash',
      symptoms: ['Retro-orbital pain', 'Joint pain', 'Maculopapular rash', 'Bleeding gums'],
      duration: '4 days'
    },
    options: ['Dengue Fever', 'Malaria', 'Zika Virus', 'Typhoid'],
    correctAnswer: 'Dengue Fever',
    difficulty: 'rare',
    explanation: 'Dengue presents with thrombocytopenia, fever, rash, hemorrhagic signs after tropical travel.'
  },
  {
    id: 'case_019',
    patientInfo: {
      age: 70,
      gender: 'Male',
      history: ['Benign Prostatic Hyperplasia']
    },
    vitals: {
      bp: '150/92',
      hr: 95,
      temp: 37.3,
      rr: 18,
      spo2: 98
    },
    labs: {
      'Creatinine': 'Elevated'
    },
    presentation: {
      chiefComplaint: 'Inability to urinate',
      symptoms: ['Suprapubic pain', 'Urinary urgency', 'Weak stream'],
      duration: '12 hours'
    },
    options: ['Acute Urinary Retention', 'UTI', 'Renal Failure', 'Bladder Cancer'],
    correctAnswer: 'Acute Urinary Retention',
    difficulty: 'common',
    explanation: 'BPH commonly causes acute urinary retention with suprapubic pain and oliguria.'
  },
  {
    id: 'case_020',
    patientInfo: {
      age: 50,
      gender: 'Female',
      history: ['Rheumatoid arthritis']
    },
    vitals: {
      bp: '148/88',
      hr: 86,
      temp: 36.9,
      rr: 16,
      spo2: 99
    },
    labs: {
      'TSH': 'Low',
      'T3/T4': 'High'
    },
    presentation: {
      chiefComplaint: 'Weight loss and palpitations',
      symptoms: ['Heat intolerance', 'Tremors', 'Anxiety', 'Insomnia'],
      duration: '1 month'
    },
    options: ['Hyperthyroidism', 'Pheochromocytoma', 'Anxiety Disorder', 'Hypothyroidism'],
    correctAnswer: 'Hyperthyroidism',
    difficulty: 'common',
    explanation: 'Thyrotoxicosis presents with palpitations, tremor, weight loss, and suppressed TSH.'
  },
  {
    id: 'case_021',
    patientInfo: {
      age: 46,
      gender: 'Male',
      history: ['Chronic alcoholism']
    },
    vitals: {
      bp: '135/82',
      hr: 102,
      temp: 37.8,
      rr: 20,
      spo2: 97
    },
    labs: {
      'Ammonia': 'High'
    },
    presentation: {
      chiefComplaint: 'Confusion',
      symptoms: ['Asterixis', 'Personality change', 'Slurred speech'],
      duration: '3 days'
    },
    options: ['Hepatic Encephalopathy', 'Stroke', 'Delirium Tremens', 'Hypoglycemia'],
    correctAnswer: 'Hepatic Encephalopathy',
    difficulty: 'rare',
    explanation: 'Elevated ammonia and asterixis in alcoholic indicates hepatic encephalopathy.'
  },
  {
    id: 'case_022',
    patientInfo: {
      age: 22,
      gender: 'Male',
      history: ['Recent tick bite']
    },
    vitals: {
      bp: '122/76',
      hr: 92,
      temp: 38.0,
      rr: 18,
      spo2: 99
    },
    labs: {
      'ELISA Lyme': 'Positive'
    },
    presentation: {
      chiefComplaint: 'Rash and fever',
      symptoms: ['Bull\'s eye rash', 'Fatigue', 'Joint pain', 'Headache'],
      duration: '5 days'
    },
    options: ['Lyme Disease', 'RMSF', 'Cellulitis', 'Influenza'],
    correctAnswer: 'Lyme Disease',
    difficulty: 'common',
    explanation: 'Erythema migrans with fever after tick bite is diagnostic of Lyme disease.'
  },
  {
    id: 'case_023',
    patientInfo: {
      age: 58,
      gender: 'Female',
      history: ['Long-term steroid use']
    },
    vitals: {
      bp: '160/96',
      hr: 88,
      temp: 36.7,
      rr: 18,
      spo2: 98
    },
    presentation: {
      chiefComplaint: 'Back pain',
      symptoms: ['Loss of height', 'Kyphosis', 'Bone tenderness'],
      duration: '3 months'
    },
    options: ['Osteoporosis', 'Multiple Myeloma', 'Spinal Metastasis', 'Disc Herniation'],
    correctAnswer: 'Osteoporosis',
    difficulty: 'common',
    explanation: 'Steroid-induced osteoporosis often presents with vertebral compression and kyphosis.'
  },
  {
    id: 'case_024',
    patientInfo: {
      age: 40,
      gender: 'Male',
      history: ['Recent dog bite']
    },
    vitals: {
      bp: '125/80',
      hr: 100,
      temp: 38.2,
      rr: 20,
      spo2: 97
    },
    presentation: {
      chiefComplaint: 'Agitation and hydrophobia',
      symptoms: ['Excess salivation', 'Hallucinations', 'Muscle spasms'],
      duration: '1 week'
    },
    options: ['Rabies', 'Tetanus', 'Encephalitis', 'Meningitis'],
    correctAnswer: 'Rabies',
    difficulty: 'rare',
    explanation: 'Hydrophobia and agitation after dog bite suggests rabies infection.'
  },
  {
    id: 'case_025',
    patientInfo: {
      age: 33,
      gender: 'Female',
      history: ['Obesity']
    },
    vitals: {
      bp: '160/90',
      hr: 88,
      temp: 37.0,
      rr: 16,
      spo2: 96
    },
    labs: {
      'Urine protein': 'High'
    },
    presentation: {
      chiefComplaint: 'Facial puffiness',
      symptoms: ['Foamy urine', 'Edema', 'Weight gain'],
      duration: '2 weeks'
    },
    options: ['Nephrotic Syndrome', 'Heart Failure', 'Cirrhosis', 'Hypothyroidism'],
    correctAnswer: 'Nephrotic Syndrome',
    difficulty: 'rare',
    explanation: 'Heavy proteinuria and edema indicate nephrotic syndrome.'
  },
  {
    id: 'case_026',
    patientInfo: {
      age: 27,
      gender: 'Male',
      history: ['Recent knee surgery']
    },
    vitals: {
      bp: '90/50',
      hr: 130,
      temp: 37.1,
      rr: 26,
      spo2: 91
    },
    labs: {
      'Lactate': '3.8 mmol/L'
    },
    presentation: {
      chiefComplaint: 'Sudden collapse',
      symptoms: ['Hypotension', 'Tachycardia', 'Cold clammy skin'],
      duration: '30 minutes'
    },
    options: ['Hypovolemic Shock', 'Neurogenic Shock', 'Septic Shock', 'Cardiogenic Shock'],
    correctAnswer: 'Hypovolemic Shock',
    difficulty: 'rare',
    explanation: 'Post-op blood loss causing hypotension and tachycardia indicates hypovolemic shock.'
  },
  {
    id: 'case_027',
    patientInfo: {
      age: 63,
      gender: 'Female',
      history: ['Hypertension']
    },
    vitals: {
      bp: '210/120',
      hr: 100,
      temp: 37.4,
      rr: 22,
      spo2: 96
    },
    presentation: {
      chiefComplaint: 'Severe headache',
      symptoms: ['Blurred vision', 'Nausea', 'Confusion'],
      duration: '2 hours'
    },
    options: ['Hypertensive Emergency', 'Migraine', 'Stroke', 'Cluster Headache'],
    correctAnswer: 'Hypertensive Emergency',
    difficulty: 'common',
    explanation: 'Severely elevated BP with neurologic symptoms indicates hypertensive emergency.'
  },
  {
    id: 'case_028',
    patientInfo: {
      age: 45,
      gender: 'Male',
      history: ['Painkiller overuse']
    },
    vitals: {
      bp: '140/88',
      hr: 92,
      temp: 37.5,
      rr: 18,
      spo2: 98
    },
    labs: {
      'Creatinine': 'High'
    },
    presentation: {
      chiefComplaint: 'Decreased urination',
      symptoms: ['Fatigue', 'Nausea', 'Swelling of feet'],
      duration: '1 week'
    },
    options: ['Acute Kidney Injury', 'UTI', 'Nephrotic Syndrome', 'BPH'],
    correctAnswer: 'Acute Kidney Injury',
    difficulty: 'common',
    explanation: 'NSAID overuse can lead to renal failure with rising creatinine.'
  },
  {
    id: 'case_029',
    patientInfo: {
      age: 31,
      gender: 'Female',
      history: ['Multiple sexual partners']
    },
    vitals: {
      bp: '118/76',
      hr: 82,
      temp: 38.1,
      rr: 18,
      spo2: 98
    },
    presentation: {
      chiefComplaint: 'Pelvic pain',
      symptoms: ['Purulent discharge', 'Fever', 'Pain during sex'],
      duration: '4 days'
    },
    options: ['Pelvic Inflammatory Disease', 'UTI', 'Ovarian torsion', 'Ectopic pregnancy'],
    correctAnswer: 'Pelvic Inflammatory Disease',
    difficulty: 'common',
    explanation: 'PID causes pelvic pain, fever, and vaginal discharge.'
  },
  {
    id: 'case_030',
    patientInfo: {
      age: 54,
      gender: 'Male',
      history: ['Long-term smoking']
    },
    vitals: {
      bp: '138/85',
      hr: 90,
      temp: 37.2,
      rr: 20,
      spo2: 91
    },
    presentation: {
      chiefComplaint: 'Chronic cough',
      symptoms: ['Sputum production', 'Dyspnea', 'Wheezing'],
      duration: '2 years'
    },
    options: ['COPD', 'Asthma', 'Lung Cancer', 'TB'],
    correctAnswer: 'COPD',
    difficulty: 'common',
    explanation: 'Smoking-related chronic cough and sputum indicate COPD.'
  },
  {
    id: 'case_031',
    patientInfo: {
      age: 4,
      gender: 'Male',
      history: ['No vaccines']
    },
    vitals: {
      bp: '92/58',
      hr: 118,
      temp: 38.6,
      rr: 30,
      spo2: 95
    },
    presentation: {
      chiefComplaint: 'Grey throat patches',
      symptoms: ['Sore throat', 'Neck swelling', 'Low-grade fever'],
      duration: '2 days'
    },
    options: ['Diphtheria', 'Tonsillitis', 'Croup', 'Epiglottitis'],
    correctAnswer: 'Diphtheria',
    difficulty: 'rare',
    explanation: 'Pseudomembrane and cervical swelling in unvaccinated child indicates diphtheria.'
  },
  {
    id: 'case_032',
    patientInfo: {
      age: 41,
      gender: 'Female',
      history: ['Recent car accident']
    },
    vitals: {
      bp: '85/55',
      hr: 120,
      temp: 36.5,
      rr: 24,
      spo2: 92
    },
    presentation: {
      chiefComplaint: 'Difficulty breathing',
      symptoms: ['Jugular vein distension', 'Muffled heart sounds', 'Hypotension'],
      duration: '1 hour'
    },
    options: ['Cardiac Tamponade', 'Tension Pneumothorax', 'Heart Failure', 'Pulmonary Embolism'],
    correctAnswer: 'Cardiac Tamponade',
    difficulty: 'rare',
    explanation: 'Beck\'s triad indicates tamponade after chest trauma.'
  },
  {
    id: 'case_033',
    patientInfo: {
      age: 23,
      gender: 'Female',
      history: ['Stress eating disorder']
    },
    vitals: {
      bp: '88/54',
      hr: 50,
      temp: 35.9,
      rr: 12,
      spo2: 99
    },
    presentation: {
      chiefComplaint: 'Extreme fatigue',
      symptoms: ['Cold intolerance', 'Hair thinning', 'Amenorrhea'],
      duration: '6 months'
    },
    options: ['Anorexia Nervosa', 'Hypothyroidism', 'Depression', 'Adrenal failure'],
    correctAnswer: 'Anorexia Nervosa',
    difficulty: 'rare',
    explanation: 'Bradycardia, amenorrhea, and hypothermia point to anorexia nervosa.'
  },
  {
    id: 'case_034',
    patientInfo: {
      age: 37,
      gender: 'Male',
      history: ['HIV positive']
    },
    vitals: {
      bp: '122/78',
      hr: 90,
      temp: 38.3,
      rr: 22,
      spo2: 89
    },
    labs: {
      'LDH': 'Elevated'
    },
    presentation: {
      chiefComplaint: 'Progressive breathlessness',
      symptoms: ['Dry cough', 'Fever', 'Weight loss'],
      duration: '3 weeks'
    },
    options: ['Pneumocystis Jirovecii Pneumonia', 'TB', 'Bacterial pneumonia', 'Lung cancer'],
    correctAnswer: 'Pneumocystis Jirovecii Pneumonia',
    difficulty: 'rare',
    explanation: 'HIV with hypoxia and dry cough suggests PCP pneumonia.'
  },
  {
    id: 'case_035',
    patientInfo: {
      age: 59,
      gender: 'Female',
      history: ['Sedentary lifestyle']
    },
    vitals: {
      bp: '148/92',
      hr: 85,
      temp: 37.0,
      rr: 18,
      spo2: 98
    },
    presentation: {
      chiefComplaint: 'Leg pain while walking',
      symptoms: ['Calf pain on exertion', 'Relieves with rest', 'Cool extremities'],
      duration: '6 months'
    },
    options: ['Peripheral Artery Disease', 'DVT', 'Neuropathy', 'Cellulitis'],
    correctAnswer: 'Peripheral Artery Disease',
    difficulty: 'common',
    explanation: 'Intermittent claudication with smoking/HTN equals peripheral artery disease.'
  },
  {
    id: 'case_036',
    patientInfo: {
      age: 61,
      gender: 'Male',
      history: ['Atrial fibrillation', 'Hypertension']
    },
    vitals: {
      bp: '150/95',
      hr: 118,
      temp: 36.8,
      rr: 22,
      spo2: 95
    },
    presentation: {
      chiefComplaint: 'Sudden severe leg pain',
      symptoms: ['Cold pale limb', 'Absent pulse', 'Numbness'],
      duration: '2 hours'
    },
    options: ['Acute Limb Ischemia', 'DVT', 'Cellulitis', 'Peripheral Neuropathy'],
    correctAnswer: 'Acute Limb Ischemia',
    difficulty: 'rare',
    explanation: 'AF can cause embolism leading to sudden ischemia with pulseless limb.'
  },
  {
    id: 'case_037',
    patientInfo: {
      age: 35,
      gender: 'Female',
      history: ['Pregnancy – 32 weeks']
    },
    vitals: {
      bp: '90/60',
      hr: 120,
      temp: 37.0,
      rr: 24,
      spo2: 96
    },
    presentation: {
      chiefComplaint: 'Vaginal bleeding',
      symptoms: ['Uterine tenderness', 'Back pain', 'Fetal distress'],
      duration: '1 hour'
    },
    options: ['Placental Abruption', 'Placenta Previa', 'Preterm Labor', 'Uterine Rupture'],
    correctAnswer: 'Placental Abruption',
    difficulty: 'rare',
    explanation: 'Painful bleeding with uterine tenderness suggests placental abruption.'
  },
  {
    id: 'case_038',
    patientInfo: {
      age: 29,
      gender: 'Male',
      history: ['Long-distance runner']
    },
    vitals: {
      bp: '132/80',
      hr: 60,
      temp: 37.1,
      rr: 14,
      spo2: 99
    },
    labs: {
      'CK': 'Very high'
    },
    presentation: {
      chiefComplaint: 'Dark urine and muscle pain',
      symptoms: ['Severe muscle soreness', 'Fatigue', 'Oliguria'],
      duration: '1 day'
    },
    options: ['Rhabdomyolysis', 'Kidney stone', 'UTI', 'Hepatitis'],
    correctAnswer: 'Rhabdomyolysis',
    difficulty: 'rare',
    explanation: 'Intense exertion with high CK and cola-colored urine indicates rhabdomyolysis.'
  },
  {
    id: 'case_039',
    patientInfo: {
      age: 8,
      gender: 'Male',
      history: ['Recent viral illness']
    },
    vitals: {
      bp: '98/62',
      hr: 115,
      temp: 38.7,
      rr: 26,
      spo2: 97
    },
    presentation: {
      chiefComplaint: 'Refusal to walk',
      symptoms: ['Bilateral calf pain', 'Weakness', 'Fever'],
      duration: '2 days'
    },
    options: ['Benign Acute Myositis', 'Guillain-Barré Syndrome', 'Septic Arthritis', 'DMD'],
    correctAnswer: 'Benign Acute Myositis',
    difficulty: 'rare',
    explanation: 'Post-viral calf pain causing refusal to walk in children.'
  },
  {
    id: 'case_040',
    patientInfo: {
      age: 55,
      gender: 'Female',
      history: ['Gallstones']
    },
    vitals: {
      bp: '145/85',
      hr: 98,
      temp: 38.4,
      rr: 20,
      spo2: 96
    },
    labs: {
      'ALP': 'High',
      'Bilirubin': 'High'
    },
    presentation: {
      chiefComplaint: 'Right upper quadrant pain',
      symptoms: ['Jaundice', 'Fever', 'Dark urine'],
      duration: '12 hours'
    },
    options: ['Ascending Cholangitis', 'Acute Hepatitis', 'GERD', 'Pancreatitis'],
    correctAnswer: 'Ascending Cholangitis',
    difficulty: 'rare',
    explanation: 'Charcot triad confirms ascending cholangitis.'
  },
  {
    id: 'case_041',
    patientInfo: {
      age: 44,
      gender: 'Male',
      history: ['Heavy alcohol use']
    },
    vitals: {
      bp: '140/85',
      hr: 105,
      temp: 38.2,
      rr: 24,
      spo2: 95
    },
    labs: {
      'Amylase': 'High'
    },
    presentation: {
      chiefComplaint: 'Severe epigastric pain',
      symptoms: ['Radiates to back', 'Vomiting', 'Distention'],
      duration: '1 day'
    },
    options: ['Alcoholic Pancreatitis', 'Hepatitis', 'Cholecystitis', 'Gastritis'],
    correctAnswer: 'Alcoholic Pancreatitis',
    difficulty: 'common',
    explanation: 'Alcohol abuse is a major cause of acute pancreatitis.'
  },
  {
    id: 'case_042',
    patientInfo: {
      age: 66,
      gender: 'Female',
      history: ['Diabetes', 'Recurrent UTIs']
    },
    vitals: {
      bp: '100/60',
      hr: 115,
      temp: 39.0,
      rr: 24,
      spo2: 93
    },
    labs: {
      'CT scan': 'Gas in kidney'
    },
    presentation: {
      chiefComplaint: 'Flank pain and fever',
      symptoms: ['Vomiting', 'Confusion'],
      duration: '1 day'
    },
    options: ['Emphysematous Pyelonephritis', 'Renal Abscess', 'Urosepsis', 'Kidney Stone'],
    correctAnswer: 'Emphysematous Pyelonephritis',
    difficulty: 'rare',
    explanation: 'Diabetics with gas-forming renal infection.'
  },
  {
    id: 'case_043',
    patientInfo: {
      age: 21,
      gender: 'Female',
      history: ['Oral contraceptive use']
    },
    vitals: {
      bp: '118/75',
      hr: 92,
      temp: 36.8,
      rr: 18,
      spo2: 98
    },
    presentation: {
      chiefComplaint: 'Vision issues and headache',
      symptoms: ['Blurred vision', 'Pulsatile tinnitus'],
      duration: '3 weeks'
    },
    options: ['Idiopathic Intracranial Hypertension', 'Brain tumor', 'Migraine', 'Meningitis'],
    correctAnswer: 'Idiopathic Intracranial Hypertension',
    difficulty: 'rare',
    explanation: 'Obese women on OCP with headache and visual problems = pseudotumor cerebri.'
  },
  {
    id: 'case_044',
    patientInfo: {
      age: 47,
      gender: 'Male',
      history: ['Recent heavy lifting']
    },
    vitals: {
      bp: '135/80',
      hr: 88,
      temp: 36.9,
      rr: 16,
      spo2: 99
    },
    presentation: {
      chiefComplaint: 'Groin pain and swelling',
      symptoms: ['Bulge increases on coughing', 'Mild pain'],
      duration: '3 weeks'
    },
    options: ['Inguinal Hernia', 'Hydrocele', 'Varicocele', 'Testicular torsion'],
    correctAnswer: 'Inguinal Hernia',
    difficulty: 'common',
    explanation: 'Reducible groin bulge indicates hernia.'
  },
  {
    id: 'case_045',
    patientInfo: {
      age: 74,
      gender: 'Female',
      history: ['Hypertension', 'Osteoporosis']
    },
    vitals: {
      bp: '170/100',
      hr: 90,
      temp: 36.8,
      rr: 20,
      spo2: 97
    },
    presentation: {
      chiefComplaint: 'Sudden back pain',
      symptoms: ['Tearing chest sensation', 'Unequal arm BP'],
      duration: '30 minutes'
    },
    options: ['Aortic Dissection', 'MI', 'Pulmonary Embolism', 'Pneumothorax'],
    correctAnswer: 'Aortic Dissection',
    difficulty: 'rare',
    explanation: 'Tearing pain and BP difference indicates aortic dissection.'
  },
  {
    id: 'case_046',
    patientInfo: {
      age: 39,
      gender: 'Male',
      history: ['Construction worker']
    },
    vitals: {
      bp: '125/78',
      hr: 92,
      temp: 38.1,
      rr: 18,
      spo2: 97
    },
    labs: {
      'WBC': 'High'
    },
    presentation: {
      chiefComplaint: 'Painful swollen knee',
      symptoms: ['Redness', 'Fever', 'Limited motion'],
      duration: '1 day'
    },
    options: ['Septic Arthritis', 'Gout', 'Osteoarthritis', 'Bursitis'],
    correctAnswer: 'Septic Arthritis',
    difficulty: 'rare',
    explanation: 'Hot swollen joint + fever suggests septic arthritis.'
  },
  {
    id: 'case_047',
    patientInfo: {
      age: 26,
      gender: 'Female',
      history: ['Recent childbirth']
    },
    vitals: {
      bp: '145/95',
      hr: 88,
      temp: 36.7,
      rr: 18,
      spo2: 98
    },
    presentation: {
      chiefComplaint: 'Severe headache and visual changes',
      symptoms: ['Seizure', 'Proteinuria'],
      duration: '1 day'
    },
    options: ['Postpartum Eclampsia', 'Migraine', 'Stroke', 'Meningitis'],
    correctAnswer: 'Postpartum Eclampsia',
    difficulty: 'rare',
    explanation: 'Hypertension + seizures postpartum = eclampsia.'
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
